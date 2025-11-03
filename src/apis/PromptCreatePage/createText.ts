import { axiosInstance } from '@/apis/axios';
import type { UploadPromptRequest, UploadPromptResponse } from '@/types/PromptCreatePage/createText';

export const postPrompt = async (data: UploadPromptRequest): Promise<UploadPromptResponse> => {
  const base = import.meta.env.VITE_SERVER_API_URL;
  const response = await axiosInstance.post(`${base}/api/prompts`, data);
  return response.data;
};
