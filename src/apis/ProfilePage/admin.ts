import type {
  ResponseDeleteHistoriesAdminDto,
  ResponseDeletePromptAdminDto,
  ResponsePatchBanAdminDto,
} from '@/types/ProfilePage/admin';
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

// 회원 이력 삭제 (관리자)
export const deleteHistoriesAdmin = async ({
  history_id,
}: {
  history_id: number;
}): Promise<ResponseDeleteHistoriesAdminDto> => {
  const { data } = await axiosInstance.delete(`/api/admin/histories/${history_id}`);

  return data;
};

// 계정 정지 (관리자)
export const patchBanAdmin = async (memberId: number): Promise<ResponsePatchBanAdminDto> => {
  const { data } = await axiosInstance.patch(`/admin/${memberId}/ban`);

  return data;
};
