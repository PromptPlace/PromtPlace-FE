import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { postPrompt } from '../../../apis/PromptCreatePage/createText';
import type { UploadPromptRequest, UploadPromptResponse } from '@/types/PromptCreatePage/createText';

type HttpError = AxiosError<{ message?: string; code?: string }>;

export default function useCreatePromptText() {
  return useMutation<UploadPromptResponse, HttpError, UploadPromptRequest>({
    mutationFn: postPrompt,
  });
}
