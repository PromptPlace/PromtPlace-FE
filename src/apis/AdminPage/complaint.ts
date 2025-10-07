import type { AdminComplaintResponse } from '@/types/AdminPage/complaint';
import { axiosInstance } from '@/apis/axios';

//추후 변경된 페이지 기반 api로 새로운 api호출 함수 작성 필요
export const getComplaints = async ({ cursor, limit = 8 }: { cursor?: number; limit?: number }) => {
  const response = await axiosInstance.get<AdminComplaintResponse>('/api/admin/reports', {
    params: {
      limit,
      cursor,
    },
  });
  return response.data;
};
