export function createDonationSocket() {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

  if (!wsUrl) {
    throw new Error("NEXT_PUBLIC_WS_URL 환경변수가 설정되지 않았습니다.");
  }

  return new WebSocket(wsUrl);
}