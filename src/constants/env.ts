export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const WS_BASE_URL = ((import.meta.env.VITE_WS_BASE_URL as string | undefined) ?? "").trim();
export const MASTER_ACCESS_TOKEN = (
  (import.meta.env.VITE_MASTER_ACCESS_TOKEN as string | undefined) ?? ""
).trim();

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL 환경 변수가 설정되지 않았습니다.");
}
