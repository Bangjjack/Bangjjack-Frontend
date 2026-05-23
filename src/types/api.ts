/** API 공통 응답 래퍼 */
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type { ApiResponse };
