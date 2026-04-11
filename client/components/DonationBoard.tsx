"use client";

import AnimatedNumber from "./AnimatedNumber";

type DonationLog = {
  id: number;
  amount: number;
  note: string;
  createdAt: string;
};

type DonationBoardProps = {
  totalAmount: number;
  goalAmount: number;
  recentLogs: DonationLog[];
  lastAddedAmount: number | null;
};

function formatWon(value: number) {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

export default function DonationBoard({
  totalAmount,
  goalAmount,
  recentLogs,
  lastAddedAmount,
}: DonationBoardProps) {
  const progress = Math.min((totalAmount / goalAmount) * 100, 100);

  return (
    <main className="min-h-screen bg-[#f8f3ea] px-6 py-8 text-[#1f1b16]">
      <div className="mx-auto max-w-[2000px]">
        <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          {/* 왼쪽 큰 패널 */}
          <section className="rounded-[32px] bg-white/90 p-5 shadow-sm">
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-[0.2em] text-orange-600">
                Easter Life Sharing
              </p>
              <h1 className="mt-3 text-5xl font-bold tracking-tight">
                부활절생명나눔
              </h1>
            </div>

            <div className="grid h-[calc(100%-80px)] grid-cols-1 gap-6 lg:grid-cols-[0.6fr_1fr]">
              {/* 왼쪽 내부 패널: QR + 계좌 */}
              <div className="rounded-[28px] bg-[#fcfaf7] p-6">
                <div className="flex h-full flex-col gap-5">
                  <div>
                    <h2 className="text-3xl font-bold">후원 안내</h2>
                  </div>

                  <div className="mt-2 flex  justify-center">
                    <div className="rounded-[28px] border border-orange-100 bg-[#fffaf2] p-4 shadow-sm">
                      <img
                        src="/qr.jpg"
                        alt="후원 QR 코드"
                        className="h-[300px] w-[300px] object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-8 rounded-[24px] border border-gray-100 bg-white p-6">
                    <p className="text-sm font-medium text-gray-500">후원 계좌</p>
                    <p className="mt-3 text-3xl font-bold tracking-tight">
                      3333370711762
                    </p>
                    <p className="mt-2 text-xl text-gray-700">카카오뱅크 정윤서</p>
                    <p className="mt-4 text-xl font-bold text-[#1f1b16]">
                      ! 입금자명 : 이름 + 생년월일
                    </p>

                    <div className="mt-5 rounded-2xl bg-orange-50 px-4 py-3 text-sm leading-6 text-orange-700">
                      송금 후 후원금은 관리자 확인 후 반영됩니다.
                    </div>
                  </div>
                </div>
              </div>

              {/* 오른쪽 내부 패널: 기도제목 */}
              <div className="rounded-[28px] bg-[#fcfaf7] p-6">
                <div className="flex h-full flex-col">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.2em] text-orange-600">
                      PRAYER
                    </p>
                    <h2 className="mt-3 text-3xl font-bold">기도제목</h2>
                  </div>

                  <div className="mt-6 flex-1 rounded-[24px] border border-gray-100 bg-white p-6">
                    <div className="space-y-5 text-lg leading-8 text-gray-700">
                      <div>
                        <p className="font-medium text-3xl text-[#1f1b16]">
                          1. 계속 인원이 늘어나고 있는 마구비케 교회에 부흥을 
                          <br></br>더 허락하여 주시고 많아지는 주님의 제자를 먹이는 
                          <br></br>오병이어의 기적이 일어나기를

                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-3xl  text-[#1f1b16]">
                          2. 그 땅의 복음이 어른들에게만 전해지는 것이 아니라
                          <br></br>아이들에게 이어져 다음 세대에도 복음이 끊어지지 않고 피어날 수 있기를
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-3xl text-[#1f1b16]">
                          3. 모든 준비 과정에 은혜와 질서가 있도록
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 오른쪽 패널: 교회 + 후원액 + 달성률 */}
          <section className="relative overflow-hidden rounded-[32px] bg-white/90 p-8 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-orange-600">
                  VISION
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight">
                  우리가 후원할수록 교회가 세워집니다
                </h2>
              </div>

              {/*<div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                <AnimatedNumber
                  value={progress}
                  format="percent"
                  decimals={1}
                  duration={900}
                />{" "}
                달성
              </div>*/}
            </div>

            <div className="mt-8 rounded-[28px] bg-[#f6efe4] p-6">
              <div className="mb-6 grid grid-cols-1 gap-4">
                {/*<div>
                  <p className="text-sm font-medium text-gray-500">목표 금액</p>
                  <p className="mt-2 text-3xl font-bold">{formatWon(goalAmount)}</p>
                </div>*/}

                <div>
                  <p className="text-sm font-medium text-gray-500">현재 후원액</p>
                  <p className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">
                    <AnimatedNumber value={totalAmount} format="won" duration={900} />
                  </p>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">달성률</span>
                    <span className="text-3xl font-bold text-orange-600">
                      <AnimatedNumber
                        value={progress}
                        format="percent"
                        decimals={1}
                        duration={900}
                      />
                    </span>
                  </div>

                  <div className="h-6 w-full overflow-hidden rounded-full bg-orange-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {lastAddedAmount !== null && (
                <div
                  className={`mb-6 rounded-[24px] border px-5 py-4 shadow-sm ${
                    lastAddedAmount > 0
                      ? "border-orange-200 bg-orange-50"
                      : "border-blue-200 bg-blue-50"
                  }`}
                >
                  <p
                    className={`text-lg font-semibold ${
                      lastAddedAmount > 0 ? "text-orange-700" : "text-blue-700"
                    }`}
                  >
                    {lastAddedAmount > 0
                      ? `방금 ${formatWon(lastAddedAmount)} 반영되었습니다.`
                      : `방금 ${formatWon(Math.abs(lastAddedAmount))} 보정되었습니다.`}
                  </p>
                </div>
              )}

              <div className="relative flex h-[520px] items-end justify-center overflow-hidden rounded-[28px] bg-[#efe7da]">
                {/* 흐린 기본 이미지 */}
                <img
                  src="/church.png"
                  alt="교회"
                  className="absolute top-4 h-full w-full object-contain opacity-20 grayscale"
                />

                {/* 진행률만큼 차오르는 컬러 이미지 */}
                <div
                  className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-700"
                  style={{ height: `${progress}%` }}
                >
                  <img
                    src="/church.png"
                    alt="교회 진행 이미지"
                    className="absolute bottom-0 left-0 h-[520px] w-full object-contain"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-100/20 via-transparent to-transparent" />

                {/*<div className="absolute bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-[24px] bg-white/90 px-5 py-4 text-center shadow-sm backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-gray-700">
                    함께 세워가는 교회
                  </p>
                </div>*/}
              </div>
            </div>
          </section>
        </div>

        {/* 하단 최근 반영 내역 */}
        {/*<section className="mt-6 rounded-[32px] bg-white/85 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold">최근 반영 내역</h3>
            <span className="text-sm text-gray-500">최근 6건</span>
          </div>

          {recentLogs.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-gray-200 px-4 py-10 text-center text-gray-500">
              아직 반영된 내역이 없습니다.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recentLogs.slice(0, 6).map((log) => (
                <div
                  key={log.id}
                  className="rounded-[24px] border border-gray-100 bg-[#fcfaf7] px-5 py-5"
                >
                  <p className="text-lg font-semibold">{log.note}</p>
                  <p className="mt-2 text-sm text-gray-500">{log.createdAt}</p>
                  <p
                    className={`mt-4 text-2xl font-bold ${
                      log.amount > 0 ? "text-orange-600" : "text-blue-600"
                    }`}
                  >
                    {log.amount > 0 ? "+" : "-"}{" "}
                    {Math.abs(log.amount).toLocaleString("ko-KR")}원
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>*/}
      </div>
    </main>
  );
}