import { useState } from 'react';

import TextModal from '@/components/Modal/TextModal';
import useCreatePromptWithImage from '@/hooks/mutations/PromptCreatePage/useCreateImg';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import useGetPromptDetail from '@/hooks/queries/PromptDetailPage/useGetPromptDetail';
import useEditPrompt from '@/hooks/mutations/PromptCreatePage/useEditPrompt';
import PromptHeader from './components/PromptHeader';
import PromptEditor from './components/PromptEditor';
import PromptInfoSection from './components/PromptInfoSection';
import ImageUploadSection from './components/ImageUploadSection';
import PromptDescriptionSection from './components/PromptDescriptionSection';
import PromptUploadButton from './components/PromptUploadButton';
import usePromptInitialize from '@/hooks/PromptCreatePage/usePromptInitialize';
import { validateImagePrompt } from '@/utils/PromptCreatePage/promptValidation';
import { submitImgPrompt } from '@/utils/PromptCreatePage/submitImgPrompt';

interface PromptCreateImgPageProps {
  mode?: 'create' | 'edit';
  promptId?: number;
}

const PromptCreateImgPage = ({ mode = 'create', promptId }: PromptCreateImgPageProps) => {
  const navigate = useNavigate();

  const params = useParams();
  const idFormUrl = params.id ? Number(params.id) : undefined;
  const actualPromptId = mode === 'edit' ? idFormUrl : promptId;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [uploadModal, setuploadModal] = useState<boolean>(false); // 세부 설정 모달

  const [alertModal, setAlertModal] = useState<boolean>(false); // 알림 모달
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalText, setModalText] = useState<string>(''); // 알림 모달 텍스트

  // 모달에서 작성되는 state
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [modelver, setModelver] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]); // 서버에서 온 이미지

  const [previewText, setPreviewText] = useState<string>('');
  const [descriptionText, setDescriptionText] = useState<string>(''); //한줄 소개
  const [howToUseText, setHowToUseText] = useState<string>('');

  const [isUploaded, setIsUploaded] = useState<boolean>(false); //업로드 되었는지 여부 - 중복 업로드 방지용

  //모달
  const [modalInitialTab, setModalInitialTab] = useState<'model' | 'category'>('model');

  //API 연동 관련
  const { mutateAsync: createPromptWithImage } = useCreatePromptWithImage();
  const { data: detailData } = useGetPromptDetail(actualPromptId!, {
    enabled: mode === 'edit' && !!actualPromptId,
  });
  const { mutate: editPrompt } = useEditPrompt(actualPromptId!);

  //isPending : 현재 로딩 중인지 알려주는 boolean 값

  // 유효성 검증
  const [validationError, setValidationError] = useState<string | null>(null);

  const requestBody = {
    title,
    prompt: content,
    prompt_result: previewText,
    has_image: files.length > 0,
    description: descriptionText,
    usage_guide: howToUseText,
    is_free: true,
    price: 0,
    model_version: modelver,
    categories,
    models: selectedModels,
  };

  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = async () => {
    //0. 이미 업로드 된 것인지 검사
    if (isUploaded) return;

    //1. 유효성 검증
    const error = validateImagePrompt({
      title,
      content,
      selectedModels,
      categories,
      descriptionText,
      howToUseText,
      files,
    });

    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);

    await submitImgPrompt({
      mode,
      actualPromptId,
      promptData: requestBody,
      files,
      createPromptWithImage,
      editPrompt,
      navigate,
      setIsUploaded,
      setModalText,
      setAlertModal,
    });
  };

  usePromptInitialize({
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
  });

  return (
    <>
      <div>
        <div className="flex justify-center lg:px-[102px] max-lg:flex-col max-lg:px-[40px]">
          <div className="w-full lg:h-full">
            <PromptHeader
              title="이미지 결과 프롬프트 업로드"
              description="프롬프트와 프롬프트 정보를 입력하고 ‘업로드하기’를 눌러주세요"
            />

            {/* 메인 작성 파트 */}
            <div className="lg:mt-[20px] mb-[40px] flex lg:justify-between lg:gap-[20px] max-lg:mt-[20px] max-lg:flex-col-reverse">
              {/* 프롬프트 작성 */}
              <PromptEditor value={content} onChange={setContent} />

              {/* 우측 본문 */}
              <div className="max-w-[1245px] w-full bg-white rounded-[16px] p-[24px] gap-4">
                <PromptInfoSection
                  title={title}
                  setTitle={setTitle}
                  categories={categories}
                  setCategories={setCategories}
                  selectedModels={selectedModels}
                  setSelectedModels={setSelectedModels}
                  modelver={modelver}
                  setModelver={setModelver}
                  uploadModal={uploadModal}
                  setuploadModal={setuploadModal}
                  modalInitialTab={modalInitialTab}
                  setModalInitialTab={setModalInitialTab}
                />

                <ImageUploadSection
                  files={files}
                  existingImages={existingImages}
                  setFiles={setFiles}
                  setExistingImages={setExistingImages}
                />

                <PromptDescriptionSection
                  description={descriptionText}
                  setDescription={setDescriptionText}
                  usageGuide={howToUseText}
                  setUsageGuide={setHowToUseText}
                />
              </div>
            </div>

            {validationError && <p className="custom-h5 text-alert max-phone:text-[14px]">{validationError}</p>}

            {/**업로드 버튼 */}
            <div className={clsx('w-full', validationError ? 'mt-[20px]' : 'mt-[82px]')}>
              <PromptUploadButton disabled={isUploaded} onClick={handleUploadClick} mode={mode} />
            </div>
          </div>
        </div>

        {/* TextModal */}
        {alertModal && <TextModal text={modalText} onClick={() => setAlertModal(false)} size="lg" />}
      </div>
    </>
  );
};

export default PromptCreateImgPage;
