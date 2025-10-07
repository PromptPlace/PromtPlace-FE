import { getComplaintDetail } from '@/apis/AdminPage/complaint';
import { useQuery } from '@tanstack/react-query';
import type { AdminComplaintDetailResponse } from '@/types/AdminPage/complaint';

export const useGetComplaintDetail = (report_id: number) => {
  return useQuery<AdminComplaintDetailResponse>({
    queryKey: ['complaintDetail', report_id],
    queryFn: () => getComplaintDetail(report_id),
  });
};

export default useGetComplaintDetail;