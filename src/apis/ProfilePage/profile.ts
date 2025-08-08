import type { RequestMemberDto, ResponseFollowDto, ResponseMemberDto } from '@/types/ProfilePage/profile';
import { axiosInstance } from '../axios';

// 특정 회원 정보 불러오기
export const getMember = async ({ member_id }: RequestMemberDto): Promise<ResponseMemberDto> => {
  const { data } = await axiosInstance.get(`/api/members/${member_id}`);

  return data;
};

// 회원 팔로워 목록
export const getFollower = async ({ member_id }: RequestMemberDto): Promise<ResponseFollowDto> => {
  const { data } = await axiosInstance.get(`/api/members/followers/${member_id}`);

  return data;
};

// 회원 팔로잉 목록
export const getFollowing = async ({ member_id }: RequestMemberDto): Promise<ResponseFollowDto> => {
  const { data } = await axiosInstance.get(`/api/members/following/${member_id}`);

  return data;
};
