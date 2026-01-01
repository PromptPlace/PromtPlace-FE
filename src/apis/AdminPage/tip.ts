import type {
  RequestPatchTipAdminDto,
  ResponseNoticeAdminDto,
  ResponsePatchTipAdminDto,
  ResponseTipAdminDto,
} from '@/types/AdminPage/tip';
import { axiosInstance } from '../axios';

// 프롬프트 팁 작성 (관리자)
export const postTipAdmin = async (body: FormData): Promise<ResponseTipAdminDto> => {
  const { data } = await axiosInstance.post('/api/tips', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

// 프롬프트 팁 수정 (관리자)
export const patchTipAdmin = async ({
  tip_id,
  body,
}: {
  tip_id: number;
  body: RequestPatchTipAdminDto;
}): Promise<ResponsePatchTipAdminDto> => {
  const { data } = await axiosInstance.patch(`/api/tips/${tip_id}`, body);

  return data;
};

// 공지사항 작성 (관리자)
export const postNoticeAdmin = async (body: FormData): Promise<ResponseNoticeAdminDto> => {
  const { data } = await axiosInstance.post('/api/announcements', body);

  return data;
};

// 공지사항 수정 (관리자)
export const patchNoticeAdmin = async ({
  announcement_id,
  body,
}: {
  announcement_id: number;
  body: RequestPatchTipAdminDto;
}) => {
  const { data } = await axiosInstance.patch(`/api/announcements/${announcement_id}`, body);

  return data;
};
