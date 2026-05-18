export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const GOOGLE_LOGIN_URL =
  (import.meta.env.VITE_GOOGLE_LOGIN_URL as string | undefined) ??
  `${API_BASE_URL.replace(/\/$/, "")}/oauth2/authorization/google`;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL 환경 변수가 설정되지 않았습니다.");
}
