import type { RequestMemberDto } from '@/types/ProfilePage/profile';
import type {
  RequestPatchSNSDto,
  RequestPostSNS,
  ResponseDeleteSNS,
  ResponsePatchSNSDto,
  ResponseSNSDto,
} from '@/types/ProfilePage/sns';
import { axiosInstance } from '../axios';

// 회원 SNS 목록
export const getSNS = async ({ member_id }: RequestMemberDto): Promise<ResponseSNSDto> => {
  const { data } = await axiosInstance.get(`/api/members/${member_id}/sns`);

  return data;
};

// 회원 SNS 수정
export const patchSNS = async ({
  sns_id,
  url,
  description,
  user_sns_id,
}: { sns_id: number } & RequestPatchSNSDto): Promise<ResponsePatchSNSDto> => {
  const { data } = await axiosInstance.patch(`/api/members/sns/${sns_id}`, {
    url,
    description,
    user_sns_id,
  });

  return data;
};

// 회원 SNS 삭제
export const deleteSNS = async ({ sns_id }: { sns_id: number }): Promise<ResponseDeleteSNS> => {
  const { data } = await axiosInstance.delete(`/api/members/sns/${sns_id}`);

  return data;
};

// 회원 SNS 작성
export const postSNS = async ({ url, description }: RequestPostSNS): Promise<RequestPostSNS> => {
  const { data } = await axiosInstance.post('/api/members/sns', {
    url,
    description,
  });

  return data;
};
