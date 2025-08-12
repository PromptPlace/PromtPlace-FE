import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import { axiosInstance } from '../axios';
import type {
  RequestDeleteHistoryDto,
  RequestEditHistoryDto,
  RequestHistoryDto,
  ResponseDeleteHistoryDto,
  ResponseEditHistoryDto,
  ResponseHistoryDto,
  ResponseMemberHistoryDto,
} from '@/types/ProfilePage/history';

// 회원 이력 조회
export const getHistory = async ({ member_id }: RequestMemberDto): Promise<ResponseMemberHistoryDto> => {
  const { data } = await axiosInstance.get(`/api/members/${member_id}/histories`);

  return data;
};

// 회원 이력 작성
export const postHistory = async ({ history }: RequestHistoryDto): Promise<ResponseHistoryDto> => {
  const { data } = await axiosInstance.post('/api/members/histories', { history });

  return data;
};

// 회원 이력 수정
export const patchEditHistory = async ({
  history_id,
  history,
}: RequestEditHistoryDto): Promise<ResponseEditHistoryDto> => {
  const { data } = await axiosInstance.patch(`/api/members/histories/${history_id}`, { history_id, history });
  console.log(data);

  return data;
};

// 회원 이력 삭제
export const deleteHistory = async ({ history_id }: RequestDeleteHistoryDto): Promise<ResponseDeleteHistoryDto> => {
  const { data } = await axiosInstance.delete(`/api/members/histories/${history_id}`);

  return data;
};
