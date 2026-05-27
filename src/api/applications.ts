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

export type ProcessRoommateApplicationRequest = {
  applicationId: number;
  status: Extract<RoommateApplicationStatus, "ACCEPTED" | "REJECTED">;
};

export type ProcessRoommateApplicationResponse = {
  applicantId: number;
  applicationId: number;
  chatRoomId: number;
  currentGroupMemberCount: number;
  groupId: number;
  postId: number;
  processedAt: string;
  status: RoommateApplicationStatus;
};

const APPLICATION_API_PATHS = {
  processRoommateApplication: (applicationId: number) => `/applications/${applicationId}`,
  sendRoommateApplication: (userId: number) => `/users/${userId}/applications`,
} as const;

export const sendRoommateApplication = async (
  userId: number,
): Promise<SendRoommateApplicationResponse> => {
  const { data } = await apiClient.post<ApiResponse<SendRoommateApplicationResponse>>(
    APPLICATION_API_PATHS.sendRoommateApplication(userId),
  );

  return data.data;
};

export const processRoommateApplication = async ({
  applicationId,
  status,
}: ProcessRoommateApplicationRequest): Promise<ProcessRoommateApplicationResponse> => {
  const { data } = await apiClient.patch<ApiResponse<ProcessRoommateApplicationResponse>>(
    APPLICATION_API_PATHS.processRoommateApplication(applicationId),
    { status },
  );

  return data.data;
};
