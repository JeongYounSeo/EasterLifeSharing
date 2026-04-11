"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminPanel from "@/components/AdminPanel";
import DonationBoard from "@/components/DonationBoard";
import { createDonationLog, fetchSummary } from "@/lib/api";

type DonationLog = {
  id: number;
  amount: number;
  note: string;
  createdAt: string;
};

export default function AdminPage() {
  const [logs, setLogs] = useState<DonationLog[]>([]);
  const [goalAmount, setGoalAmount] = useState(500000);
  const [totalAmount, setTotalAmount] = useState(0);
  const [lastAddedAmount, setLastAddedAmount] = useState<number | null>(null);

  const loadSummary = async () => {
    try {
      const data = await fetchSummary();
      setTotalAmount(data.totalAmount);
      setGoalAmount(data.goalAmount);
      setLogs(data.recentLogs ?? []);
    } catch (error) {
      console.error("요약 데이터 로딩 실패:", error);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const handleAddDonation = async (amount: number, note: string) => {
    try {
      const result = await createDonationLog(amount, note);

      setTotalAmount(result.totalAmount);
      setGoalAmount(result.goalAmount);
      setLastAddedAmount(amount);

      await loadSummary();

      setTimeout(() => {
        setLastAddedAmount(null);
      }, 2000);
    } catch (error) {
      console.error("후원 추가 실패:", error);
      throw error;
    }
  };

  return (
    <div className="bg-[#fffaf2]">
      <div className="fixed right-6 top-6 z-50 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow"
        >
          메인 페이지
        </Link>
      </div>

      <div className="grid min-h-screen lg:grid-cols-[420px_1fr]">
      {/* 왼쪽: 관리자 조작 */}
        <div className="border-r border-orange-100 bg-[#fffaf2]">
          <AdminPanel onAddDonation={handleAddDonation} recentLogs={logs} />
        </div>

        {/* 오른쪽: 후원 페이지 그대로 */}
        <div className="bg-[#f8f3ea]">
          <DonationBoard
            totalAmount={totalAmount}
            goalAmount={goalAmount}
            recentLogs={logs}
            lastAddedAmount={lastAddedAmount}
          />
        </div>
      </div>
    </div>
  );
}