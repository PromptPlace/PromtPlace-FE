import { axiosInstance } from '@/apis/axios';

export interface AdminDeletePromptResponse {
  message: string;
  data: null;
  statusCode: number;
}

export const deleteAdminPrompt = async (promptId: number): Promise<AdminDeletePromptResponse> => {
  const res = await axiosInstance.delete<AdminDeletePromptResponse>(`/api/admin/prompts/${promptId}`);
  return res.data;
};
