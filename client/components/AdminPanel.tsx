"use client";

import { useEffect, useRef, useState } from "react";

type DonationLog = {
  id: number;
  amount: number;
  note: string;
  createdAt: string;
};

type AdminPanelProps = {
  onAddDonation: (amount: number, note: string) => Promise<void> | void;
  recentLogs: DonationLog[];
};

function formatSignedWon(value: number) {
  const absValue = Math.abs(value).toLocaleString("ko-KR");
  return value > 0 ? `+ ${absValue}원` : `- ${absValue}원`;
}

export default function AdminPanel({
  onAddDonation,
  recentLogs,
}: AdminPanelProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">(
    ""
  );

  const amountInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    amountInputRef.current?.focus();
  }, []);

  const resetFeedback = () => {
    setFeedbackMessage("");
    setFeedbackType("");
  };
  
  const handleQuickAdd = (amount: number) => {
    onAddDonation(amount, "현장 후원");
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    resetFeedback();

    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount === 0) {
      setFeedbackType("error");
      setFeedbackMessage("금액은 0이 아닌 숫자로 입력해주세요.");
      amountInputRef.current?.focus();
      return;
    }

    try {
      setIsSubmitting(true);

      await onAddDonation(parsedAmount, note.trim() || "익명 후원");

      setAmount("");
      setNote("");
      setFeedbackType("success");
      setFeedbackMessage("후원 금액이 정상적으로 반영되었습니다.");

      amountInputRef.current?.focus();
    } catch (error) {
      console.error(error);
      setFeedbackType("error");
      setFeedbackMessage("후원 반영 중 문제가 발생했습니다.");
      amountInputRef.current?.focus();
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        resetFeedback();
      }, 2500);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleSubmit();
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf2] px-6 py-10">
      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-gray-600">빠른 추가</p>

        <div className="grid grid-cols-3 gap-3">
          {[5000, 10000, 20000, 30000, 50000].map((amount) => (
            <button
              key={amount}
              onClick={() => handleQuickAdd(amount)}
              className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.97]"
            >
              +{amount.toLocaleString()}원
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold text-orange-600">
            Admin Panel
          </p>
            <h1 className="text-4xl font-bold tracking-tight">관리자 페이지</h1>
          <p className="mt-3 text-base text-gray-600">
            후원 금액을 반영하고 최근 입력 내역을 확인할 수 있습니다.
          </p>
        </header>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">후원 금액 입력</h2>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
              Enter로 제출 가능
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                금액
              </label>
              <input
                ref={amountInputRef}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="예: 10000 또는 -90000"
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400 disabled:bg-gray-100"
              />
              <p className="mt-2 text-sm text-gray-500">
                보정이 필요할 경우 음수 금액도 입력할 수 있습니다.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                메모
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="예: 청년부 후원 / 입력 보정"
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400 disabled:bg-gray-100"
              />
            </div>

            {feedbackMessage && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                  feedbackType === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {feedbackMessage}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
            >
              {isSubmitting ? "반영 중..." : "금액 반영"}
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">최근 입력 내역</h3>
            <span className="text-sm text-gray-500">
              최근 {recentLogs.length}건
            </span>
          </div>

          {recentLogs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-8 text-center text-gray-500">
              아직 반영된 내역이 없습니다.
            </div>
          ) : (
            <div className="space-y-3">
              {recentLogs.map((log, index) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <span className="rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">
                          최신
                        </span>
                      )}
                      <p className="truncate font-semibold">{log.note}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{log.createdAt}</p>
                  </div>

                  <p
                    className={`ml-4 whitespace-nowrap text-lg font-bold ${
                      log.amount > 0 ? "text-orange-600" : "text-blue-600"
                    }`}
                  >
                    {formatSignedWon(log.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}