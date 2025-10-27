import type { ResponseNotificationDto } from '@/types/Navbar/notification';
import { axiosInstance } from '../axios';

// 회원 알림 목록 조회
export const getNotification = async (cursor?: number): Promise<ResponseNotificationDto> => {
  const { data } = await axiosInstance.get('/api/notifications/me', {
    params: cursor ? { cursor } : {},
  });

  return data;
};
