import { getComplaints } from '@/apis/AdminPage/complaint';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { AdminComplaintResponse } from '@/types/AdminPage/complaint';

export const useComplaintsInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['complaints'],
    queryFn: ({ pageParam }) => getComplaints({ cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: AdminComplaintResponse) => {
      if (!lastPage.data.has_more) {
        return undefined;
      }

      const reports = lastPage.data.reports;
      if (reports.length === 0) {
        return undefined;
      }

      const lastReport = reports[reports.length - 1];
      return lastReport.report_id;
    },
  });
};
