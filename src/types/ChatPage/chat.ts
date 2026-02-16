import type { CommonResponse } from '../common';
import type { Page, PaginationDto } from './pagination';

export type Partner = {
  user_id: number;
  nickname: string;
  profile_image_url: string;
  role?: string;
};

export type Attachment = {
  attachment_id: number;
  url: string;
  type: string;
  original_name: string;
  size: number;
  created_at: string;
};

export type Message = {
  message_id: number;
  sender_id: number;
  content: string;
  sent_at: string;
  attachments: Attachment[];
};

//채팅방 목록 조회
export type RequestChatDto = PaginationDto & {
  filter?: 'all' | 'unread' | 'pinned';
  search?: string;
};

export type Room = {
  room_id: number;
  partner: Partner;
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
  page: Page;
}>;

// 채팅방 생성/반환
export type ResponsePostChatRoomsDto = CommonResponse<{
  room_id: number;
  is_new: boolean;
}>;

// 채팅방 상세 조회
export type ResponseChatRoomsDetailDto = CommonResponse<{
  room: {
    room_id: number;
    created_at: string;
    is_pinned: boolean;
  };
  my: {
    user_id: number;
    left_at: string;
  };
  partner: Partner;
  block_status: {
    i_blocked_partner: boolean;
    partner_blocked_me: boolean;
  };
  messages: Message[];
  page: Page;
}>;
