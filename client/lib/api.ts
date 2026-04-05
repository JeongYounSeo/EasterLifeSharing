const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL 환경변수가 설정되지 않았습니다.");
}

export async function fetchSummary() {
  const response = await fetch(`${API_BASE_URL}/summary`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("summary 데이터를 불러오지 못했습니다.");
  }

  return response.json();
}

export async function createDonationLog(amount: number, note: string) {
  const response = await fetch(`${API_BASE_URL}/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, note }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "후원 로그 추가에 실패했습니다.");
  }

  return response.json();
}