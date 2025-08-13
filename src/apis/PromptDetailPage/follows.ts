import { axiosInstance } from '@/apis/axios';

type Msg = { message: string };

export const followMember = (memberId: number) => axiosInstance.post<Msg>(`/api/members/follows/${memberId}`);

export const unfollowMember = (memberId: number) => axiosInstance.delete<Msg>(`/api/members/follows/${memberId}`);
