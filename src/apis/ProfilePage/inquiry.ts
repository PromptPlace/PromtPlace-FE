import type {
  RequestGetDetailInquiriesDto,
  RequestGetInquiriesDto,
  RequestInquiriesDto,
  RequestReplyInquiriesDto,
  ResponseGetInquiriesDto,
  ResponseInquiriesDto,
  ResponseReadInquiriesDto,
  ResponseReplyInquiriesDto,
} from '@/types/ProfilePage/inquiry';
import { axiosInstance } from '../axios';

// 문의하기
export const postInquiries = async ({
  receiver_id,
  type,
  title,
  content,
}: RequestInquiriesDto): Promise<ResponseInquiriesDto> => {
  const { data } = await axiosInstance.post('/api/inquiries', { receiver_id, type, title, content });

  return data;
};

// 받은 문의 목록
export const getInquiries = async ({ type }: RequestGetInquiriesDto): Promise<ResponseGetInquiriesDto> => {
  const { data } = await axiosInstance.get('/api/inquiries/received', {
    params: { type },
  });
  return data;
};

// 문의 상세 정보
export const getDetailInquiries = async ({
  inquiry_id,
}: RequestGetDetailInquiriesDto): Promise<ResponseGetInquiriesDto> => {
  const { data } = await axiosInstance.get(`/api/inquiries/${inquiry_id}`);

  return data;
};

// 문의 답변하기
export const postReplyInquiries = async ({
  inquiry_id,
  content,
}: RequestGetDetailInquiriesDto & RequestReplyInquiriesDto): Promise<ResponseReplyInquiriesDto> => {
  const { data } = await axiosInstance.post(`/api/inquiries/${inquiry_id}/replies`, {
    content,
  });

  return data;
};

// 문의 읽음 처리
export const patchReadInquiries = async ({
  inquiry_id,
}: RequestGetDetailInquiriesDto): Promise<ResponseReadInquiriesDto> => {
  const { data } = await axiosInstance.patch(`/api/inquiries/${inquiry_id}/read`);

  return data;
};
