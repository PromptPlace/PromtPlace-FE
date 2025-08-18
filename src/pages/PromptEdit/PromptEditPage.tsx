import { axiosInstance } from '@/apis/axios';
import DualModal from '@/components/Modal/DualModal';
import TextModal from '@/components/Modal/TextModal';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor, MobileEditor } from './components/Editer';
import IconButton from '@/components/Button/IconButton';
import MobileUploadModal from './components/MobileUploadModal';
import UploadModal from './components/UploadModal';

const PromptEditPage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [uploadModal, setuploadModal] = useState<boolean>(false); //업로드 세부 설정 모달

  const [alertModal, setAlertModal] = useState<boolean>(false); // 알림 모달
  const [modalText, setModalText] = useState<string>(''); // 알림 모달 텍스트
  const [showDualModal, setShowDualModal] = useState(false); // DualModal 띄움 여부

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

  //prompId
  const { id: promptId } = useParams<{ id: string }>();

  // 초기 내용 가져오기
  useEffect(() => {
    // API 호출해서 data를 받아온 후
    const fetchData = async () => {
      try {
        const base = import.meta.env.VITE_SERVER_API_URL;
        const res = await axiosInstance.get(`${base}/api/prompts/${promptId}/details`);
        console.log(res.data.data);
        const data = res.data.data;

        // 상태 업데이트
        setTitle(data.title);
        setContent(data.prompt);
        setPreviewText(data.prompt_result);
        setDescriptionText(data.description);
        setHowToUseText(data.usage_guide);
        setWithImage(data.has_image);
        // 모델 배열 변환
        const modelNames = data.models?.map((model: { model: { name: string } }) => model.model.name);
        setSelectedModels(modelNames);

        // 가격 타입 설정
        setPriceType(data.is_free ? '무료' : '유료');
        setCost(data.is_free ? 0 : data.price);

        // 태그 배열 변환
        const tagNames = data.tags?.map((tag: { tag: { name: string } }) => tag.tag.name) || [];
        setTags(tagNames);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };

    fetchData();
  }, []);

  const handleOption = () => {
    setuploadModal(true);
  };

  //업로드 조건 확인
  const handleUploadCheck = () => {
    // 가격 범위 확인
    const isValidCost =
      (priceType === '무료' && cost === 0) || (priceType === '유료' && cost !== null && cost >= 100 && cost <= 100000);

    // 태그 개수 확인
    const isValidTags = 0 <= tags.length && tags.length <= 10;

    const valid = !!(
      title.trim() !== '' &&
      content.trim() !== '' &&
      selectedModels.length > 0 &&
      priceType &&
      isValidCost &&
      isValidTags &&
      previewText.trim() !== '' &&
      discriptionText.trim() !== ''
    );

    if (valid) {
      setShowDualModal(true);
    } else {
      if (title.trim() === '') {
        setModalText('프롬프트 제목을 입력해주세요.');
      } else if (content.trim() === '') {
        setModalText('프롬프트 내용을 입력해주세요.');
      } else if (selectedModels.length === 0) {
        setModalText('모델을 설정해주세요.');
      } else if (!isValidCost || !priceType) {
        setModalText('금액을 설정해주세요.');
      } else if (previewText.trim() === '') {
        setModalText('프롬프트 미리보기를 입력해주세요.');
      } else if (discriptionText.trim() === '') {
        setModalText('프롬프트 설명을 입력해주세요.');
      } else if (!isValidTags) {
        setModalText('태그는 0~10개까지 설정 가능합니다.');
      }
      setAlertModal(true);
    }
  };

  // API 연동 - 프롬프트 업로드
  const handleEditPrompt = async () => {
    const base = import.meta.env.VITE_SERVER_API_URL;
    const is_free = priceType === '무료' ? true : false;

    const has_image = withImage;
    try {
      const res = await axiosInstance.patch(`${base}/api/prompts/${promptId}`, {
        title: title,
        prompt: content,
        prompt_result: previewText,
        has_image: has_image,
        description: discriptionText,
        usage_guide: howToUseText,
        price: cost,
        is_free: is_free,
        tags: tags,
        models: selectedModels,
      });
      console.log('전송 성공!', res.data);
    } catch (err) {
      throw err;
    }
  };

  // '업로드 하시겠습니까?' 모달에서 "예" 클릭시
  const handleDualYes = async () => {
    setShowDualModal(false);

    try {
      // 수정사항 업로드
      await handleEditPrompt();
      setModalText('업로드가 완료되었습니다.');
      setAlertModal(true);
      // 2초 후에 이동
      setTimeout(() => {
        window.location.href = '/mypage/prompt';
      }, 2000);
    } catch (err) {
      console.error(err);
      setModalText('업로드가 실패했습니다.');
      setAlertModal(true);
    } finally {
    }
  };

  // '업로드 하시겠습니까?' 모달에서 "아니오" 클릭시
  const handleDualNo = () => {
    setShowDualModal(false);
  };
  return (
    <>
      {/* <div>PromptEditPage : {promptId}번째 게시글 수정중...</div> */}
      <>
        <div className="hidden lg:block">
          <div className="h-[calc(100vh-24px)] flex items-center justify-center bg-[var(--color-background)]">
            <div className="w-full max-w-[1236px] h-[745px] p-6 flex flex-col">
              {/**프롬프트 제목 */}
              <div className="max-w-[1236px] min-h-[120px] rounded-t-[16px] bg-[var(--color-white)] flex justify-center ">
                <div className="w-[1100px] max-h-[60px] mt-[35px] ">
                  <Editor
                    placeholder={'프롬프트 제목을 입력하세요'}
                    onChange={setTitle}
                    value={title}
                    maxHight="max-h-[40px]"
                  />
                  <div className="border-b-[1px] border-[var(--color-text-on-background)] mt-[17px]"></div>
                </div>
              </div>
              {/**프롬프트 내용 */}
              <div className="max-w-[1236px] min-h-[465px] bg-[var(--color-white)] flex justify-center">
                <div className="w-[1100px] mt-[15px] ">
                  <Editor
                    placeholder={'프롬프트를 입력하세요'}
                    onChange={setContent}
                    value={content}
                    maxHight="max-h-[430px]"
                  />
                </div>
              </div>
              {/**하단 */}
              <div className="max-w-[1236px] h-[160px] rounded-b-[16px] bg-[var(--color-white)] flex justify-center">
                <div className="w-[1080px] flex justify-between items-center">
                  <div className="w-[350px] h-[80px]"></div>
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
                          }}
                        />
                      </div>
                      <div className="w-[194px] text-[20px]">
                        <IconButton
                          buttonType="round"
                          style="fill"
                          imgType="upload"
                          text="업로드하기"
                          onClick={() => handleUploadCheck()}
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
            {showDualModal && (
              <DualModal text="업로드 하시겠습니까?" onClickYes={handleDualYes} onClickNo={handleDualNo} />
            )}
            {/* TextModal */}
            {alertModal && <TextModal text={modalText} onClick={() => setAlertModal(false)} size="lg" />}
          </div>
        </div>

        {/*모바일 화면 */}
        <div className="lg:hidden block">
          <div className="relative w-full h-[58px]  flex items-center">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl tracking-wide">
              <p className="text-[16px] text-black font-medium">프롬프트 작성</p>
            </span>
          </div>
          <div className="flex justify-center mx-[20px]">
            <div className="w-full flex flex-col items-center">
              <div className="w-full min-w-[250px] h-full min-h-[340px] flex flex-col justify-center bg-white">
                {/*제목 입력 */}
                <div className="w-full min-w-[280px] h-[63px] flex items-center justify-start border-b-[1px] border-white-stroke">
                  <div className="w-full min-w-[240px] h-[17px] ml-[10px]">
                    <MobileEditor
                      placeholder={'프롬프트 제목을 입력하세요'}
                      onChange={setTitle}
                      value={title}
                      maxHight="max-h-[22px]"
                    />
                  </div>
                </div>
                {/**프롬프트 내용 */}
                <div className="min-w-[280px] min-h-[278px] flex justify-center items-center p-[10px]">
                  <div className="w-full min-w-[260px] h-full min-h-[238px] ">
                    <MobileEditor
                      placeholder={'프롬프트를 입력하세요'}
                      onChange={setContent}
                      value={content}
                      maxHight=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**하단 */}
          <div className="flex justify-center">
            <div className="w-full max-w-[254px] h-[36px] mt-[20px] mb-[35px]">
              <div className="flex justify-between">
                <div className="w-[117px] text-[10px]">
                  <IconButton
                    buttonType="round"
                    style="outline"
                    imgType="settings"
                    text="업로드 세부 설정"
                    onClick={() => {
                      handleOption();
                    }}
                  />
                </div>
                <div className="w-[117px] text-[10px] flex justify-center">
                  <IconButton
                    buttonType="round"
                    style="fill"
                    imgType="upload"
                    text="  업로드하기  "
                    onClick={() => handleUploadCheck()}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 업로드 세부 설정 모달 */}
          {uploadModal && (
            <MobileUploadModal
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
          {showDualModal && (
            <DualModal text="업로드 하시겠습니까?" onClickYes={handleDualYes} onClickNo={handleDualNo} />
          )}
          {/* TextModal */}
          {alertModal && <TextModal text={modalText} onClick={() => setAlertModal(false)} size="lg" />}
        </div>
      </>
    </>
  );
};

export default PromptEditPage;
