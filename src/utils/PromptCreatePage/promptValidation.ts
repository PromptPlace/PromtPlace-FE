interface BaseValidation {
  title: string;
  content: string;
  selectedModels: string[];
  categories: string[];
  descriptionText: string;
  howToUseText: string;
  canSetPrice: boolean;
  isPaid: boolean;
  price: number | null;
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

  if (!isValid) {
    return '※ 입력하지 않은 정보가 있어요! 전부 작성 후 업로드하기를 눌러주세요';
  }

  // 승인된 유저 + 유료인 경우에만 가격 검사
  if (data.canSetPrice && data.isPaid) {
    if (data.price === null) {
      return '※ 가격을 입력해주세요.';
    }

    if (data.price < 100) {
      return '※ 가격은 최소 100원부터 설정 가능해요.';
    }

    if (data.price > 10000) {
      return '※ 가격은 최대 10,000원까지 설정 가능해요.';
    }
  }

  return null;
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
