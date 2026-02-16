import type { CommonResponse } from '../common';

//채팅방 목록 조회
export type RequestChatDto = {
  filter?: 'all' | 'unread' | 'pinned';
  search?: string;
  cursor?: number;
  limit?: number;
};

export type Room = {
  room_id: number;
  partner: {
    user_id: number;
    nickname: string;
    profile_image_url: string;
  };
  last_message: {
    content: string;
    sent_at: string;
    has_attachments: boolean;
  };
  unread_count: number;
  is_pinned: boolean;
};

export type ResponseChatDto = CommonResponse<{
  rooms: Room[];
  page: {
    has_more: boolean;
    total_count: number;
  };
}>;
