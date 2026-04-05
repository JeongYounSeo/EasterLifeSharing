const express = require("express");
const cors = require("cors");
const http = require("http");
const { WebSocketServer } = require("ws");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("클라이언트 연결됨");

  ws.send(
    JSON.stringify({
      type: "connected",
      message: "WebSocket connected",
    })
  );

  ws.on("close", () => {
    console.log("클라이언트 연결 종료");
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

// 서버 상태 확인
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Socket server is running.",
  });
});

// 다른 서버가 이 주소로 요청하면 전체 broadcast
app.post("/broadcast", (req, res) => {
  const payload = req.body;

  broadcast(payload);

  res.json({
    ok: true,
    message: "Broadcast sent.",
  });
});

server.listen(PORT, () => {
  console.log(`Socket server is running on http://localhost:${PORT}`);
});