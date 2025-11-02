import type { ResponseNewNotificationDto, ResponseNotificationDto } from '@/types/Navbar/notification';
import { axiosInstance } from '../axios';

// 회원 알림 목록 조회
export const getNotification = async (cursor?: number): Promise<ResponseNotificationDto> => {
  const { data } = await axiosInstance.get('/api/notifications/me', {
    params: cursor ? { cursor } : {},
  });

  return data;
};

// 새 알림 여부 조회
export const getNewNotification = async (): Promise<ResponseNewNotificationDto> => {
  const { data } = await axiosInstance.get('/api/notifications/status/has-new');

  return data;
};
