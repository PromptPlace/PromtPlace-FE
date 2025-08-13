import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { unfollowMember } from '@/apis/PromptDetailPage/follows';

type HttpError = AxiosError<{ message?: string }>;

export default function useUnfollow() {
  return useMutation<void, HttpError, number>({
    mutationFn: async (memberId) => {
      await unfollowMember(memberId);
    },
    retry: (count, err) => (err.response?.status ?? 0) !== 401 && count < 1,
  });
}
