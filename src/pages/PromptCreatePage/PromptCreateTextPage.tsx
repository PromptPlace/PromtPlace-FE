import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import useCreatePromptText from '@/hooks/mutations/PromptCreatePage/useCreateText';
import useGetPromptDetail from '@/hooks/queries/PromptDetailPage/useGetPromptDetail';
import useEditPrompt from '@/hooks/mutations/PromptCreatePage/useEditPrompt';
import usePromptInitialize from '@/hooks/PromptCreatePage/usePromptInitialize';

import { validateTextPrompt } from '@/utils/PromptCreatePage/promptValidation';
import { submitTextPrompt } from '@/utils/PromptCreatePage/submitTextPrompt';

import TextModal from '@/components/Modal/TextModal';
import PromptHeader from './components/PromptHeader';
import PromptEditor from './components/PromptEditor';
import PromptInfoSection from './components/PromptInfoSection';
import TextPreviewSection from './components/TextPreviewSection';
import PromptUploadButton from './components/PromptUploadButton';
import PromptDescriptionSection from './components/PromptDescriptionSection';

import type { FilterModalType } from '@/types/PromptCreatePage/filterModal';

interface PromptCreateTextPageProps {
  mode?: 'create' | 'edit';
  promptId?: number;
}

const PromptCreateTextPage = ({ mode = 'create', promptId }: PromptCreateTextPageProps) => {
  const navigate = useNavigate();

  const params = useParams();
  const idFormUrl = params.id ? Number(params.id) : undefined;
  const actualPromptId = mode === 'edit' ? idFormUrl : promptId;

  const [title, setTitle] = useState<string>(''); // 프롬프트 제목
  const [content, setContent] = useState<string>(''); // 프롬프트 작성

  const [uploadModal, setuploadModal] = useState<boolean>(false); // 세부 설정 모달

  const [alertModal, setAlertModal] = useState<boolean>(false); // 알림 모달
  const [modalText, setModalText] = useState<string>(''); // 알림 모달 텍스트

  // 모달에서 작성되는 state
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [modelver, setModelver] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  // 가격 설정
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

  const [previewText, setPreviewText] = useState<string>(''); // 결과 미리보기
  const [descriptionText, setDescriptionText] = useState<string>(''); //한줄 소개
  const [howToUseText, setHowToUseText] = useState<string>(''); // 상세 설명

  //모달
  const [modalInitialTab, setModalInitialTab] = useState<FilterModalType>('model');

  const [isUploaded, setIsUploaded] = useState<boolean>(false); //업로드 되었는지 여부

  //API 연동 관련
  const { mutateAsync: createPrompt } = useCreatePromptText();
  const { data: detailData } = useGetPromptDetail(actualPromptId!, {
    enabled: mode === 'edit' && !!actualPromptId,
  });
  const { mutate: editPrompt } = useEditPrompt(actualPromptId!);

  // 유효성 검증 함수
  const [validationError, setValidationError] = useState<string | null>(null);

  const requestBody = {
    title,
    prompt: content,
    prompt_result: previewText,
    has_image: false,
    description: descriptionText,
    usage_guide: howToUseText,
    is_free: true,
    price: 0,
    model_version: modelver,
    categories,
    models: selectedModels,
  };

  // 업로드 버튼 클릭
  const handleUploadClick = async () => {
    //이미 업로드 된 것인지 검사
    if (isUploaded) return;

    //유효성 검증
    const error = validateTextPrompt({
      title,
      content,
      selectedModels,
      categories,
      previewText,
      descriptionText,
      howToUseText,
    });

    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);

    await submitTextPrompt({
      mode,
      actualPromptId,
      requestBody,
      createPrompt,
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
  });

  return (
    <>
      <div>
        <div className="flex justify-center lg:px-[102px] max-lg:flex-col max-lg:px-[40px]">
          <div className="w-full lg:h-full">
            <PromptHeader
              title="텍스트 결과 프롬프트 업로드"
              description="프롬프트와 프롬프트 정보를 입력하고 ‘업로드하기’를 눌러주세요 "
            />

            {/**메인 작성 파트 */}
            <div className="lg:mt-[20px] mb-[40px] flex lg:justify-between lg:gap-[20px] max-lg:mt-[20px] max-lg:flex-col-reverse">
              {/* 프롬프트 작성 */}
              <PromptEditor value={content} onChange={setContent} />

              {/**우측 본문 */}
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
                  isPaid={isPaid}
                  setIsPaid={setIsPaid}
                  price={price}
                  setPrice={setPrice}
                  uploadModal={uploadModal}
                  setuploadModal={setuploadModal}
                  modalInitialTab={modalInitialTab}
                  setModalInitialTab={setModalInitialTab}
                />

                <TextPreviewSection value={previewText} onChange={setPreviewText} />

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

export default PromptCreateTextPage;
