import type { PromptDetailDto } from '@/types/PromptDetailPage/PromptDetailDto';
import { useEffect } from 'react';

interface InitArgs {
  mode: 'create' | 'edit';
  detailData: PromptDetailDto | undefined;
  setTitle: (v: string) => void;
  setContent: (v: string) => void;
  setPreviewText: (v: string) => void;
  setDescriptionText: (v: string) => void;
  setHowToUseText: (v: string) => void;
  setSelectedModels: (v: string[]) => void;
  setCategories: (v: string[]) => void;
  setModelver: (v: string) => void;
  setExistingImages?: (v: string[]) => void;
}

export default function usePromptInitialize({
  mode,
  detailData,
  setTitle,
  setContent,
  setPreviewText,
  setDescriptionText,
  setHowToUseText,
  setSelectedModels,
  setCategories,
  setModelver,
  setExistingImages,
}: InitArgs) {
  useEffect(() => {
    if (mode !== 'edit' || !detailData) return;

    setTitle(detailData.title);
    setContent(detailData.prompt);
    setPreviewText(detailData.prompt_result);
    setDescriptionText(detailData.description);
    setHowToUseText(detailData.usage_guide);
    setSelectedModels(detailData.models.map((m) => m.name));
    setCategories(detailData.categories.map((c) => c.category.name));
    setModelver(detailData.model_version ?? '');

    if (setExistingImages) {
      setExistingImages(detailData.images.map((i) => i.image_url));
    }
  }, [
    mode,
    detailData,
    setTitle,
    setContent,
    setPreviewText,
    setDescriptionText,
    setHowToUseText,
    setSelectedModels,
    setCategories,
    setModelver,
    setExistingImages,
  ]);
}
