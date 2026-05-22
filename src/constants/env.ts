export const WS_BASE_URL = ((import.meta.env.VITE_WS_BASE_URL as string | undefined) ?? "").trim();
export const MASTER_ACCESS_TOKEN = (
  (import.meta.env.VITE_MASTER_ACCESS_TOKEN as string | undefined) ?? ""
).trim();

const validateApiBaseUrl = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

  if (!apiBaseUrl) {
    throw new Error("VITE_API_BASE_URL 환경 변수가 설정되지 않았습니다.");
  }

  return apiBaseUrl;
};

export const API_BASE_URL = validateApiBaseUrl();
const VITE_GOOGLE_LOGIN_URL = import.meta.env.VITE_GOOGLE_LOGIN_URL as string | undefined;
export const GOOGLE_LOGIN_URL =
  VITE_GOOGLE_LOGIN_URL?.trim() || `${API_BASE_URL.replace(/\/$/, "")}/oauth2/authorization/google`;
