import type {
  RequestMsgAdminDto,
  ResponseAccountAdminDto,
  ResponseDeleteHistoriesAdminDto,
  ResponseDeletePromptAdminDto,
  ResponseMsgAdminDto,
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
export const patchBanAdmin = async (memberId: number): Promise<ResponseAccountAdminDto> => {
  const { data } = await axiosInstance.patch(`/admin/${memberId}/ban`);

  return data;
};

// 계정 삭제 (관리자)
export const deleteAdmin = async (memberId: number): Promise<ResponseAccountAdminDto> => {
  const { data } = await axiosInstance.delete(`/admin/${memberId}/delete`);

  return data;
};

// 메시지 전송 (관리자)
export const postMsgAdmin = async (body: RequestMsgAdminDto): Promise<ResponseMsgAdminDto> => {
  const { data } = await axiosInstance.post('/api/messages', body);

  return data;
};
