import type {
  RequestChatDto,
  RequestPresignUrlDto,
  ResponseChatDto,
  ResponseChatRoomsDetailDto,
  ResponsePatchPinChatDto,
  ResponsePostChatRoomsDto,
  ResponsePresignUrlDto,
} from '@/types/ChatPage/chat';
import { axiosInstance } from '../axios';
import type { PaginationDto } from '@/types/ChatPage/pagination';
import type { CommonResponse } from '@/types/common';

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

// 파일 업로드용 presign url 발급
export const postPresignUrl = async (body: RequestPresignUrlDto): Promise<ResponsePresignUrlDto> => {
  const { data } = await axiosInstance.post('/api/chat/presigned-url', body);

  return data;
};

// 채팅방 나가기
export const patchLeaveChat = async (roomId: number): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.patch(`/api/chat/rooms/${roomId}/leave`);

  return data;
};

// 상대방 차단
export const postBlockChat = async (blocked_user_id: number): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.post('/api/chat/block', blocked_user_id);

  return data;
};

// 채팅방 고정 토글
export const patchPinChat = async (roomId: number): Promise<ResponsePatchPinChatDto> => {
  const { data } = await axiosInstance.patch(`/api/chat/rooms/${roomId}/pin`);

  return data;
};
