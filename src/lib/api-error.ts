import { isAxiosError } from "axios";

import type { ApiResponse } from "@/api";

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (!isAxiosError<ApiResponse<null>>(error)) {
    return fallbackMessage;
  }

  return error.response?.data.message ?? fallbackMessage;
}
