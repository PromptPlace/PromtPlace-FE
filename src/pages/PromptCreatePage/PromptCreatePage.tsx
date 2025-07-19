import { useEffect, useState } from 'react';
import { Editor } from './components/Editer';

import TextModal from '@/components/Modal/TextModal';

import CloseIcon from '@assets/icon-close.svg';
import { LuChevronRight } from 'react-icons/lu';
import IconButton from '@/components/Button/IconButton';
import { useNavigate } from 'react-router-dom';
import DualModal from '@/components/Modal/DualModal';
import UploadModal from './components/UploadModal';

const PromptCreatePage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [uploadModal, setuploadModal] = useState<boolean>(false); //업로드 세부 설정 모달
  const [canUpload, setCanUpload] = useState<boolean>(false); //업로드 세부 설정 완료 (개발 초기 사용)

  const [alertModal, setAlertModal] = useState<boolean>(false); // 알림 모달
  const [modalText, setModalText] = useState<string>(''); // 알림 모달 텍스트
  const [showDualModal, setShowDualModal] = useState(false); // DualModal 띄움 여부

  const [tip, setTip] = useState(true);

  // 모달에서 작성되는 state
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const [priceType, setPriceType] = useState<'무료' | '유료' | null>(null);
  const [cost, setCost] = useState<number | null>(null);

  const [tags, setTags] = useState<string[]>([]);

  const [withImage, setWithImage] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewText, setPreviewText] = useState<string>('');

  const [discriptionText, setDescriptionText] = useState<string>('');
  const [howToUseText, setHowToUseText] = useState<string>('');

  // useEffect(() => {
  //   console.log('title 변경됨:', title);
  // }, [title]);
  useEffect(() => {
    console.log(files);
  }, [files.length]);

  const navigate = useNavigate();

  const handleTip = () => {
    navigate('/guide/tip');
  };

  const handleOption = () => {
    setuploadModal(true);
  };

  //업로드 조건 확인
  const handleUploadCheck = (canUpload: boolean) => {
    const valid = !!(
      title.trim() !== '' &&
      content.trim() !== '' &&
      selectedModels.length > 0 &&
      priceType &&
      (priceType === '무료' || (priceType === '유료' && cost !== null)) &&
      previewText.trim() !== '' &&
      discriptionText.trim() !== ''
    );

    setCanUpload(valid);

    if (valid) {
      setShowDualModal(true);
    } else {
      setModalText('업로드 세부 설정을 완료해 주세요.');
      setAlertModal(true);
    }
  };

  // DualModal에서 "예" 클릭시
  const handleDualYes = () => {
    setShowDualModal(false);
    setModalText('업로드가 완료되었습니다.');
    setAlertModal(true);
  };

  // DualModal에서 "아니오" 클릭시
  const handleDualNo = () => {
    setShowDualModal(false);
  };

  return (
    <div className="h-[calc(100vh-24px)] flex items-center justify-center bg-[var(--color-background)]">
      <div className="w-full max-w-[1236px] h-[745px] p-6 flex flex-col">
        {/**프롬프트 제목 */}
        <div className="max-w-[1236px] min-h-[120px] rounded-t-[16px] bg-[var(--color-white)] flex justify-center ">
          <div className="w-[1100px] max-h-[60px] mt-[35px] ">
            <Editor placeholder={'프롬프트 제목을 입력하세요'} onChange={setTitle} />
            <div className="border-b-[1px] border-[var(--color-text-on-background)] mt-[17px]"></div>
          </div>
        </div>
        {/**프롬프트 내용 */}
        <div className="max-w-[1236px] min-h-[465px] bg-[var(--color-white)] flex justify-center">
          <div className="w-[1100px] mt-[15px] ">
            <Editor placeholder={'프롬프트를 입력하세요'} onChange={setContent} />
          </div>
        </div>
        {/**하단 */}
        <div className="max-w-[1236px] h-[160px] rounded-b-[16px] bg-[var(--color-white)] flex justify-center">
          <div className="w-[970px] flex justify-between items-center">
            <div className="w-[350px] h-[80px]">
              {tip ? (
                <div
                  className={
                    'relative w-[350px] h-[80px] bg-background z-2 rounded-[8px] flex items-center justify-center'
                  }>
                  <div className="flex justify-center gap-[10px] items-center" onClick={handleTip}>
                    <p className="text-[22px] font-medium text-text-on-background">프롬프트 작성 tip 보러가기</p>
                    <div className=" text-text-on-background">
                      <LuChevronRight size={24} />
                    </div>
                  </div>
                  <button onClick={() => setTip(false)} className="absolute top-[15px] right-[15px] cursor-pointer">
                    <img src={CloseIcon} alt="닫기" className="w-[16px] h-[16px]" />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="w-[455px] h-[70px]">
              <div className="flex justify-between">
                <div className="w-[250px] text-[20px]">
                  <IconButton
                    buttonType="round"
                    style="outline"
                    imgType="settings"
                    text="업로드 세부 설정"
                    onClick={() => {
                      handleOption();
                      setCanUpload(true);
                    }}
                  />
                </div>
                <div className="w-[194px] text-[20px]">
                  <IconButton
                    buttonType="round"
                    style="fill"
                    imgType="upload"
                    text="업로드하기"
                    onClick={() => handleUploadCheck(canUpload)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 업로드 세부 설정 모달 */}
      {uploadModal && (
        <UploadModal
          setuploadModal={setuploadModal}
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
          priceType={priceType}
          setPriceType={setPriceType}
          cost={cost}
          setCost={setCost}
          tags={tags}
          setTags={setTags}
          withImage={withImage}
          setWithImage={setWithImage}
          files={files}
          setFiles={setFiles}
          previewText={previewText}
          setPreviewText={setPreviewText}
          discriptionText={discriptionText}
          setDescriptionText={setDescriptionText}
          howToUseText={howToUseText}
          setHowToUseText={setHowToUseText}
        />
      )}
      {/* DualModal */}
      {showDualModal && <DualModal text="업로드 하시겠습니까?" onClickYes={handleDualYes} onClickNo={handleDualNo} />}
      {/* TextModal */}
      {alertModal && <TextModal text={modalText} onClick={() => setAlertModal(false)} size="lg" />}
    </div>
  );
};

export default PromptCreatePage;
