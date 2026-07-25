import type { UploadPromptRequest, UploadPromptResponse } from '@/types/PromptCreatePage/createText';
import type { RequestEditPromptDto, ResponseEditPromptDto } from '@/types/PromptCreatePage/edit';
import type { MutateOptions } from '@tanstack/react-query';

interface SubmitPromptParams {
  mode: 'create' | 'edit';
  actualPromptId?: number;

  requestBody: {
    title: string;
    prompt: string;
    prompt_result: string;
    has_image: boolean;
    description: string;
    usage_guide: string;
    is_free: boolean;
    price: number;
    model_version: string;
    categories: string[];
    models: string[];
  };

  createPrompt: (body: UploadPromptRequest) => Promise<UploadPromptResponse>;
  editPrompt: (
    variables: RequestEditPromptDto,
    options?: MutateOptions<ResponseEditPromptDto, Error, RequestEditPromptDto, unknown>,
  ) => void;
  navigate: (path: string) => void;

  setIsUploaded: (v: boolean) => void;
  setModalText: (v: string) => void;
  setAlertModal: (v: boolean) => void;
}

export const submitTextPrompt = async ({
  mode,
  actualPromptId,
  requestBody,
  createPrompt,
  editPrompt,
  navigate,
  setIsUploaded,
  setModalText,
  setAlertModal,
}: SubmitPromptParams) => {
  try {
    if (mode === 'create') {
      // 프롬프트 업로드
      const res = await createPrompt(requestBody);

      console.log('전송 성공!', res);
      const prompt_ID = res.data.prompt_id;

      // 성공
      if (prompt_ID) {
        setIsUploaded(true);
        setModalText('업로드가 완료되었어요!');
        setAlertModal(true);

        setTimeout(() => {
          navigate(`/prompt/${prompt_ID}`);
        }, 1000);
      } else {
        // 실패 처리
        setModalText('업로드가 실패했습니다');
        setAlertModal(true);
      }
    } else {
      // 프롬프트 수정
      editPrompt(
        {
          promptId: actualPromptId!,
          body: requestBody,
        },
        {
          onSuccess: () => {
            navigate(`/prompt/${actualPromptId}`);
          },
        },
      );
    }
  } catch (err) {
    console.error(err);
    setModalText('업로드가 실패했습니다');
    setAlertModal(true);
  }
};
