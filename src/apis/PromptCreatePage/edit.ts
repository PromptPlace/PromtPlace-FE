import type { RequestEditPromptDto, ResponseEditPromptDto } from '@/types/PromptCreatePage/edit';
import { axiosInstance } from '../axios';

// 프롬프트 수정
export const patchEditPrompt = async ({ promptId, body }: RequestEditPromptDto): Promise<ResponseEditPromptDto> => {
  const { data } = await axiosInstance.patch(`/api/prompts/${promptId}`, body);

  return data;
};
