import { useState } from 'react';

export function useModelFilter() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleModelChange = (models: string[]) => {
    setSelectedModels(models);
  };

  const filterByModels = (prompts: any[]) => {
    if (selectedModels.length === 0) return prompts;
    return prompts.filter((prompt) => prompt.models.some((modelObj) => selectedModels.includes(modelObj.model.name)));
  };

  return {
    selectedModels,
    handleModelChange,
    filterByModels,
  };
}
