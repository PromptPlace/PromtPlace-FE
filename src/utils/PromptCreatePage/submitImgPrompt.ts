import type { RequestEditPromptDto, ResponseEditPromptDto } from '@/types/PromptCreatePage/edit';
import type { MutateOptions } from '@tanstack/react-query';
import type { UploadPromptRequest } from '@/types/PromptCreatePage/createText';

interface UploadPromptWithImageResult {
  prompt_id: number;
}

interface SubmitImagePromptParams {
  mode: 'create' | 'edit';
  actualPromptId?: number;

  promptData: UploadPromptRequest;
  files: File[];

  createPromptWithImage: (args: {
    promptData: UploadPromptRequest;
    files: File[];
  }) => Promise<UploadPromptWithImageResult>;

  editPrompt: (
    variables: RequestEditPromptDto,
    options?: MutateOptions<ResponseEditPromptDto, Error, RequestEditPromptDto, unknown>,
  ) => void;

  navigate: (path: string) => void;

  setIsUploaded: (v: boolean) => void;
  setModalText: (v: string) => void;
  setAlertModal: (v: boolean) => void;
}

export const submitImgPrompt = async ({
  mode,
  actualPromptId,
  promptData,
  files,
  createPromptWithImage,
  editPrompt,
  navigate,
  setIsUploaded,
  setModalText,
  setAlertModal,
}: SubmitImagePromptParams) => {
  try {
    if (mode === 'create') {
      const result = await createPromptWithImage({
        promptData,
        files,
      });

      const prompt_ID = result.prompt_id;

      if (prompt_ID) {
        setIsUploaded(true);
        setModalText('업로드가 완료되었어요!');
        setAlertModal(true);

        setTimeout(() => {
          navigate(`/prompt/${prompt_ID}`);
        }, 1000);
      } else {
        setModalText('업로드가 실패했습니다.');
        setAlertModal(true);
      }
    } else {
      editPrompt(
        {
          promptId: actualPromptId!,
          body: promptData,
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
    setModalText('업로드가 실패했습니다.');
    setAlertModal(true);
  }
};
