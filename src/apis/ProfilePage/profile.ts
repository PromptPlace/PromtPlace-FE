import type {
  RequestEditMemberDto,
  RequestIntroDto,
  RequestMemberDto,
  ResponseEditMemberDto,
  ResponseFollowDto,
  ResponseMemberDto,
  ResponseIntroDto,
  ResponsePromptsDto,
  RequestPromptsDto,
  ResponseDeletePromptDto,
  RequestDeletePromptDto,
  ResponsePostFollowDto,
  ResponseDeleteFollow,
  RequestPostImg,
  ResponsePostImg,
  RequestNotificationsDto,
  ResponseNotificationsDto,
} from '@/types/ProfilePage/profile';
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

// 회원 정보 수정
export const patchEditMember = async ({
  name,
  nickname,
  email,
}: RequestEditMemberDto): Promise<ResponseEditMemberDto> => {
  const { data } = await axiosInstance.patch('/api/members', {
    name,
    nickname,
    email,
  });

  return data;
};

// 회원 한줄 소개 작성
export const postIntro = async ({ intro }: RequestIntroDto): Promise<ResponseIntroDto> => {
  const { data } = await axiosInstance.post('/api/members/intros', {
    intro,
  });

  return data;
};

// 작성한 프롬프트 목록
export const getPrompts = async (
  { member_id }: RequestMemberDto,
  { cursor, limit }: RequestPromptsDto = {},
): Promise<ResponsePromptsDto> => {
  const { data } = await axiosInstance.get(`/api/members/${member_id}/prompts`, {
    params: { cursor, limit },
  });

  return data;
};

// 프롬프트 삭제
export const deletePrompt = async ({ prompt_id }: RequestDeletePromptDto): Promise<ResponseDeletePromptDto> => {
  const { data } = await axiosInstance.delete(`/api/prompts/${prompt_id}`);

  return data;
};

// 회원 팔로우
export const postFollow = async ({ member_id }: RequestMemberDto): Promise<ResponsePostFollowDto> => {
  const { data } = await axiosInstance.post(`/api/members/follows/${member_id}`);

  return data;
};

// 회원 언팔로우
export const deleteFollow = async ({ member_id }: RequestMemberDto): Promise<ResponseDeleteFollow> => {
  const { data } = await axiosInstance.delete(`/api/members/follows/${member_id}`);

  return data;
};

// 회원 프로필 이미지 등록
export const postImg = async ({ profile_image }: RequestPostImg): Promise<ResponsePostImg> => {
  const formData = new FormData();
  formData.append('profile_image', profile_image);

  const { data } = await axiosInstance.post('/api/members/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

// 프롬프터 알림 등록 & 취소
export const postNotifications = async ({
  prompter_id,
}: RequestNotificationsDto): Promise<ResponseNotificationsDto> => {
  const { data } = await axiosInstance.post(`/api/notifications/${prompter_id}`);

  return data;
};
