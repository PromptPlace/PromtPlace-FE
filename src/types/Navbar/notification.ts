import type { CommonResponse } from '../common';

type Notificaion = {
  notification_id: number;
  content: string;
  created_at: string;
  link_url: string;
};

export type ResponseNotificationDto = CommonResponse<{
  has_more: boolean;
  notifications: Notificaion[];
}>;
