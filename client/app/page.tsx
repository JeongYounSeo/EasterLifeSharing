"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DonationBoard from "@/components/DonationBoard";
import { fetchSummary } from "@/lib/api";
import { createDonationSocket } from "@/lib/socket";

type DonationLog = {
  id: number;
  amount: number;
  note: string;
  createdAt: string;
};

type DonationSocketMessage = {
  type: string;
  payload?: {
    newLog: DonationLog;
    totalAmount: number;
    goalAmount: number;
    progressPercent: number;
    recentLogs: DonationLog[];
  };
};

export default function HomePage() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(10000000);
  const [recentLogs, setRecentLogs] = useState<DonationLog[]>([]);
  const [lastAddedAmount, setLastAddedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await fetchSummary();
        setTotalAmount(data.totalAmount);
        setGoalAmount(data.goalAmount);
        setRecentLogs(data.recentLogs ?? []);
      } catch (error) {
        console.error("메인 페이지 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  useEffect(() => {
    const socket = createDonationSocket();

    socket.onopen = () => {
      console.log("메인 페이지 소켓 연결 완료");
    };

    socket.onmessage = (event) => {
      try {
        const data: DonationSocketMessage = JSON.parse(event.data);

        if (data.type === "donation_added" && data.payload) {
          setTotalAmount(data.payload.totalAmount);
          setGoalAmount(data.payload.goalAmount);
          setRecentLogs(data.payload.recentLogs);
          setLastAddedAmount(data.payload.newLog.amount);

          setTimeout(() => {
            setLastAddedAmount(null);
          }, 2000);
        }
      } catch (error) {
        console.error("소켓 메시지 처리 실패:", error);
      }
    };

    socket.onclose = () => {
      console.log("메인 페이지 소켓 연결 종료");
    };

    return () => {
      socket.close();
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffaf2] px-6 py-10">
        <div className="mx-auto max-w-4xl text-lg font-semibold">
          불러오는 중...
        </div>
      </main>
    );
  }

  return (
    <div>
      <div className="fixed right-6 top-6 z-50">
        <Link
          href="/admin"
          className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow"
        >
          관리자 페이지
        </Link>
      </div>

      <DonationBoard
        totalAmount={totalAmount}
        goalAmount={goalAmount}
        recentLogs={recentLogs}
        lastAddedAmount={lastAddedAmount}
      />
    </div>
  );
}