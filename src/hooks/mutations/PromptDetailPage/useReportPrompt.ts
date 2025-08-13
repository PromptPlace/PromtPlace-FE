import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { axiosInstance } from '@/apis/axios';

export type ReportType = 'FALSE_OR_EXAGGERATED' | 'COPYRIGHT_INFRINGEMENT' | 'INAPPROPRIATE_OR_HARMFUL' | 'ETC';

export type ReportBody = {
  prompt_id: number;
  report_type: ReportType;
  description: string;
};

type HttpError = AxiosError<{ message?: string }>;

export default function useReportPrompt() {
  return useMutation<void, HttpError, ReportBody>({
    mutationFn: async (body) => {
      await axiosInstance.post('/api/reports', body);
    },
    retry: (count, err) => (err.response?.status ?? 0) !== 401 && count < 1,
  });
}
