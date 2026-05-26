import type { ApiResponse } from "@/api/types";
import { apiClient } from "@/lib/api";

export type RoommateApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type SendRoommateApplicationResponse = {
  applicantId: number;
  applicationId: number;
  chatRoomId: number;
  createdAt: string;
  isNewChatRoom: boolean;
  postId: number;
  status: RoommateApplicationStatus;
};

const APPLICATION_API_PATHS = {
  sendRoommateApplication: (userId: number) => `/users/${userId}/applications`,
} as const;

export const sendRoommateApplication = async (
  userId: number,
): Promise<SendRoommateApplicationResponse> => {
  console.log("[applications] sendRoommateApplication request", { userId });
  const { data } = await apiClient.post<ApiResponse<SendRoommateApplicationResponse>>(
    APPLICATION_API_PATHS.sendRoommateApplication(userId),
  );
  console.log("[applications] sendRoommateApplication response", data);

  return data.data;
};
