import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { uploadImages, postPromptWithImage, mapImagesToPrompt } from '@/apis/PromptCreatePage/createImg';
import type {
  UploadPromptWithImageRequest,
  UploadPromptWithImageResponse,
  ImageKeyInfo,
} from '@/types/PromptCreatePage/createImg';

type HttpError = AxiosError<{ message?: string; code?: string }>;

interface UploadPromptWithImageParams {
  promptData: UploadPromptWithImageRequest;
  files: File[];
}

interface UploadPromptWithImageResult {
  prompt_id: number;
}

export default function useCreatePromptWithImage() {
  return useMutation<UploadPromptWithImageResult, HttpError, UploadPromptWithImageParams>({
    mutationFn: async ({ promptData, files }) => {
      let imageKeys: ImageKeyInfo[] = [];

      // 1. 이미지가 있다면 먼저 업로드
      if (files.length > 0) {
        imageKeys = await uploadImages(files);
      }

      // 2. 프롬프트 업로드
      const response = await postPromptWithImage(promptData);
      const prompt_id = response.data.prompt_id;

      // 3. 이미지와 프롬프트 매핑
      if (imageKeys.length > 0) {
        await mapImagesToPrompt(prompt_id, imageKeys);
      }

      return { prompt_id };
    },
  });
}
