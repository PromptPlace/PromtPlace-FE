import type { ResponseDeletePromptAdminDto } from '@/types/ProfilePage/admin';
import { axiosInstance } from '../axios';

// 프롬프트 삭제 (관리자)
export const deletePromptAdmin = async ({
  prompt_id,
}: {
  prompt_id: number;
}): Promise<ResponseDeletePromptAdminDto> => {
  const { data } = await axiosInstance.delete(`/api/admin/prompts/${prompt_id}`);

  return data;
};
