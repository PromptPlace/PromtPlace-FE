import type { Prompt } from '@/types/MainPage/prompt';
import { useState } from 'react';

export function useModelFilter() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleModelChange = (models: string[]) => {
    setSelectedModels(models);
  };

  const filterByModels = (prompts: Prompt[]) => {
    if (selectedModels.length === 0) return prompts;
    return prompts.filter((prompt) =>
      prompt.models.some((modelObj: { model: { name: string } }) => selectedModels.includes(modelObj.model.name)),
    );
  };

  return {
    selectedModels,
    handleModelChange,
    filterByModels,
  };
}
