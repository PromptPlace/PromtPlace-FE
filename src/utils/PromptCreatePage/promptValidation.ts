interface BaseValidation {
  title: string;
  content: string;
  selectedModels: string[];
  categories: string[];
  descriptionText: string;
  howToUseText: string;
}

export const validateTextPrompt = (data: BaseValidation & { previewText: string }): string | null => {
  const isValid =
    data.title.trim() &&
    data.content.trim() &&
    data.selectedModels.length > 0 &&
    data.categories.length > 0 &&
    data.previewText.trim() &&
    data.descriptionText.trim() &&
    data.howToUseText.trim();

  return isValid ? null : '※ 입력하지 않은 정보가 있어요! 전부 작성 후 업로드하기를 눌러주세요';
};

export const validateImagePrompt = (data: BaseValidation & { files: File[] }): string | null => {
  const baseError = validateTextPrompt({
    ...data,
    previewText: 'image',
  });

  if (baseError) return baseError;
  if (data.files.length === 0) return '※ 결과 미리보기(이미지)를 입력해주세요';
  if (data.files.length > 3) return '※ 이미지는 최대 3개까지 업로드 가능해요';

  return null;
};
