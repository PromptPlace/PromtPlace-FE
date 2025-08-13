import { axiosInstance } from '@/apis/axios';
import type { PromptDownloadRaw, PromptDownload } from '@/types/PromptDetailPage/PromptDownloadDto';

export const getPromptDownload = async (promptId: number): Promise<PromptDownload> => {
  const { data } = await axiosInstance.get<PromptDownloadRaw>(`/api/prompts/${promptId}/downloads`);

  const content = data.content ?? data.prompt ?? '';
  return {
    title: data.title,
    content,
    is_free: data.is_free,
    is_paid: data.is_paid,
  };
};
