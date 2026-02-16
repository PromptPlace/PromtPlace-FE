import type { RequestChatDto, ResponseChatDto } from '@/types/ChatPage/chat';
import { axiosInstance } from '../axios';

// 채팅방 목록 조회
export const getChatRooms = async ({ filter, search, cursor, limit }: RequestChatDto): Promise<ResponseChatDto> => {
  const { data } = await axiosInstance.get('/api/chat/rooms', {
    params: { filter, search, cursor, limit },
  });

  return data;
};
