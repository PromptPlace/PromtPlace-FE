import type { CommonResponse } from '../common';

// 회원 알림 목록 조회
type Actor = {
  user_id: number;
  nickname: string;
  profile_image: string;
};

type Notificaion = {
  notification_id: number;
  content: string;
  type: string;
  created_at: string;
  link_url: string;
  actor: Actor | null;
};

export type ResponseNotificationDto = CommonResponse<{
  has_more: boolean;
  notifications: Notificaion[];
}>;

// 새 알림 여부 조회
export type ResponseNewNotificationDto = CommonResponse<{
  hasNew: boolean;
}>;
