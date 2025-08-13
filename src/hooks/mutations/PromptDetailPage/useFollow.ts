import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { followMember } from '@/apis/PromptDetailPage/follows';

type HttpError = AxiosError<{ message?: string }>;

export default function useFollow() {
  return useMutation<void, HttpError, number>({
    mutationFn: async (memberId) => {
      await followMember(memberId);
    },
    retry: (count, err) => (err.response?.status ?? 0) !== 401 && count < 1,
  });
}
