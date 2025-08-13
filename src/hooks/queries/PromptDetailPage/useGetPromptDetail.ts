import { useQuery } from '@tanstack/react-query';
import { getPromptDetail } from '@/apis/PromptDetailPage/prompt';
import type { PromptDetailDto } from '@/types/PromptDetailPage/PromptDetailDto';

export const promptKeys = {
  all: ['prompt'] as const,
  detail: (id: number) => [...promptKeys.all, 'detail', id] as const,
};

type Options = { enabled?: boolean };

export default function useGetPromptDetail(id: number, options?: Options) {
  return useQuery<PromptDetailDto>({
    queryKey: promptKeys.detail(id),
    queryFn: () => getPromptDetail(id),
    enabled: options?.enabled ?? (Number.isFinite(id) && id > 0),
    staleTime: 60_000,
  });
}
