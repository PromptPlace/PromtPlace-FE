import type {
  RequestChatDto,
  ResponseChatDto,
  ResponseChatRoomsDetailDto,
  ResponsePostChatRoomsDto,
} from '@/types/ChatPage/chat';
import { axiosInstance } from '../axios';
import type { PaginationDto } from '@/types/ChatPage/pagination';

// 채팅방 목록 조회
export const getChatRooms = async ({ filter, search, cursor, limit }: RequestChatDto): Promise<ResponseChatDto> => {
  const { data } = await axiosInstance.get('/api/chat/rooms', {
    params: { filter, search, cursor, limit },
  });

  return data;
};

// 채팅방 생성/반환
export const postChatRooms = async (partner_id: number): Promise<ResponsePostChatRoomsDto> => {
  const { data } = await axiosInstance.post('/api/chat/rooms', { partner_id });

  return data;
};

// 채팅방 상세 조회
export const getChatRoomsDetail = async (
  roomId: number,
  { cursor, limit }: PaginationDto,
): Promise<ResponseChatRoomsDetailDto> => {
  const { data } = await axiosInstance(`/api/chat/rooms/${roomId}`, {
    params: { cursor, limit },
  });

  return data;
};
