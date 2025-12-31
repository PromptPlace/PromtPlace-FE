import type { RequestPatchTipAdminDto, ResponsePatchTipAdminDto, ResponseTipAdminDto } from '@/types/AdminPage/tip';
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
