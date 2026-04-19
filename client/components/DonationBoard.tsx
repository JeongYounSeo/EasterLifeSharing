"use client";
import FloatingHearts from "./FloatingHearts";
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

            <div className="grid  grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1fr]">
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
                        className="h-[400px] w-[400px] object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-8 rounded-[24px] border border-gray-100 bg-white p-6">
                    <p className="text-sm font-medium text-gray-500">후원 계좌</p>
                    <p className="mt-3 text-4xl font-bold tracking-tight">
                      3333-37-0711762
                    </p>
                    <p className="mt-2 text-2xl text-gray-700">카카오뱅크 정윤서</p>
                    <p className="mt-4 text-2xl font-bold text-[#1f1b16]">
                      ! 입금자명 : 이름 + 생년월일
                    </p>
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
                    <h2 className="mt-3 text-4xl font-bold">기도제목</h2>
                  </div>

                  <div className="mt-6 flex-1 rounded-[24px] border border-gray-100 bg-white p-6">
                    <div className="space-y-5 text-lg leading-8 text-gray-700">
                      <div>
                        <p className="font-medium leading-10 text-3xl whitespace-pre text-[#1f1b16]">
                          1. 한경 교회에 일어난 화재가 오히려 하나님의 사랑을
                          <br></br>    깨닫고 문제보다 더 크게 일하시는 주님을
                          <br></br>    바라볼 수 있는 귀한 기회가 되기를
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-3xl leading-10 whitespace-pre text-[#1f1b16]">
                          2. 우리의 것을 기쁨으로 내어드릴 때, 하나님의 사랑이
                          <br></br>    우리 안에 충만하여져서 나누어 줄 때 비로소 
                          <br></br>    채워짐을 경험하는 신비를 누릴 수 있기를
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-3xl leading-10 whitespace-pre text-[#1f1b16]">
                          3. 교회의 회복을 통해 제주도에 복음이 흘러들어가
                          <br></br>    하나님의 나라가 다시 부흥할 수 있기를
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

              <div className="relative flex h-[520px] items-end justify-center overflow-hidden rounded-[28px] bg-[#efe7da]">
                {/* 흐린 기본 이미지 */}
                <img
                  src="/church.png"
                  alt="교회"
                  className="absolute bottom-0 h-full w-full object-contain opacity-20 grayscale"
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
                {/* 하트 이펙트 */}
                <FloatingHearts trigger={lastAddedAmount && lastAddedAmount > 0 ? lastAddedAmount : 0} />

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


      </div>
      {lastAddedAmount !== null && (
        <div className="pointer-events-none fixed left-1/2 top-20 z-[9999] -translate-x-1/2">
          <div
            className={`rounded-2xl px-6 py-4 text-xl font-semibold shadow-lg backdrop-blur-md transition-all duration-500 ${
              lastAddedAmount > 0
                ? "bg-orange-500/90 text-white"
                : "bg-blue-500/90 text-white"
            }`}
          >
            {lastAddedAmount > 0
              ? `+${Math.abs(lastAddedAmount).toLocaleString()}원 후원되었습니다`
              : `-${Math.abs(lastAddedAmount).toLocaleString()}원 보정되었습니다`}
          </div>
        </div>
      )}
    </main>
    
  );
}