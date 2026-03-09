import { useMemo } from 'react';
import type { Prompt } from '@/types/MainPage/prompt';

interface UseFilteredPromptsProps {
  prompts: Prompt[];
  filterFns: Array<(prompts: Prompt[]) => Prompt[]>;
}

export function useFilteredPrompts({ prompts, filterFns }: UseFilteredPromptsProps) {
  return useMemo(() => {
    return filterFns.reduce((acc, fn) => fn(acc), prompts);
  }, [prompts, ...filterFns]);
}
