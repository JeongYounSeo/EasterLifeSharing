const express = require("express");
const cors = require("cors");
const http = require("http");
const { WebSocketServer } = require("ws");
const supabase = require("./supabase");

const app = express();

const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";
const GOAL_AMOUNT = 10000000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://easterlifesharing.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("웹소켓 클라이언트 연결됨");

  ws.send(
    JSON.stringify({
      type: "connected",
      message: "WebSocket connected",
    })
  );

  ws.on("close", () => {
    console.log("웹소켓 클라이언트 연결 종료");
  });
});

function broadcast(data) {
  const message = JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}

async function getRecentLogs(limit = 10) {
  const { data, error } = await supabase
    .from("donation_logs")
    .select("id, amount, note, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data || []).map((log) => ({
    id: log.id,
    amount: log.amount,
    note: log.note || "익명 후원",
    createdAt: new Date(log.created_at).toLocaleString("ko-KR", {
      hour12: false,
    }),
  }));
}

async function getTotalAmount() {
  const { data, error } = await supabase
    .from("donation_logs")
    .select("amount");

  if (error) {
    throw error;
  }

  return (data || []).reduce((sum, row) => sum + row.amount, 0);
}

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Donation backend is running.",
  });
});

app.get("/summary", async (req, res) => {
  try {
    const totalAmount = await getTotalAmount();
    const recentLogs = await getRecentLogs(10);
    const progressPercent = Math.min((totalAmount / GOAL_AMOUNT) * 100, 100);

    res.json({
      totalAmount,
      goalAmount: GOAL_AMOUNT,
      progressPercent,
      recentLogs,
    });
  } catch (error) {
    console.error("summary 조회 실패:", error);
    res.status(500).json({
      ok: false,
      message: "summary 조회에 실패했습니다.",
    });
  }
});

app.get("/logs", async (req, res) => {
  try {
    const logs = await getRecentLogs(50);
    res.json({ logs });
  } catch (error) {
    console.error("logs 조회 실패:", error);
    res.status(500).json({
      ok: false,
      message: "logs 조회에 실패했습니다.",
    });
  }
});

app.post("/logs", async (req, res) => {
  const { amount, note } = req.body;
  const parsedAmount = Number(amount);

  if (!parsedAmount || parsedAmount === 0) {
    return res.status(400).json({
      ok: false,
      message: "amount는 0이 아닌 숫자여야 합니다.",
    });
  }

  try {
    const insertPayload = {
      amount: parsedAmount,
      note: typeof note === "string" && note.trim() ? note.trim() : "익명 후원",
    };

    const { error: insertError } = await supabase
      .from("donation_logs")
      .insert(insertPayload);

    if (insertError) {
      throw insertError;
    }

    const totalAmount = await getTotalAmount();
    const recentLogs = await getRecentLogs(10);
    const progressPercent = Math.min((totalAmount / GOAL_AMOUNT) * 100, 100);

    const newLog = recentLogs[0] ?? null;

    broadcast({
      type: "donation_added",
      payload: {
        newLog,
        totalAmount,
        goalAmount: GOAL_AMOUNT,
        progressPercent,
        recentLogs,
      },
    });

    res.status(201).json({
      ok: true,
      message: "후원 로그가 추가되었습니다.",
      newLog,
      totalAmount,
      goalAmount: GOAL_AMOUNT,
      progressPercent,
    });
  } catch (error) {
    console.error("logs 추가 실패:", error);
    res.status(500).json({
      ok: false,
      message: "후원 로그 추가에 실패했습니다.",
      detail: error.message,
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Backend server is running on http://${HOST}:${PORT}`);
});