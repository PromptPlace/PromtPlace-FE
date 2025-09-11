import { useEffect, useState } from 'react';
import { Editor, MobileEditor } from './components/Editer';

import TextModal from '@/components/Modal/TextModal';

import CloseIcon from '@assets/icon-close.svg';
import { LuChevronRight } from 'react-icons/lu';
import IconButton from '@/components/Button/IconButton';
import { useNavigate } from 'react-router-dom';
import DualModal from '@/components/Modal/DualModal';
import UploadModal from './components/UploadModal';
import MobileUploadModal from './components/MobileUploadModal';
import { axiosInstance } from '@/apis/axios';
import axios from 'axios';

const PromptCreatePage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [uploadModal, setuploadModal] = useState<boolean>(false); //업로드 세부 설정 모달

  const [alertModal, setAlertModal] = useState<boolean>(false); // 알림 모달
  const [modalText, setModalText] = useState<string>(''); // 알림 모달 텍스트
  const [showDualModal, setShowDualModal] = useState(false); // DualModal 띄움 여부

  const [tip, setTip] = useState(true);

  const [loading, setLoading] = useState(false);
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
  const handleUploadCheck = () => {
    // 가격 범위 확인
    const isValidCost =
      (priceType === '무료' && cost === 0) || (priceType === '유료' && cost !== null && cost >= 100 && cost <= 100000);

    // 태그 개수 확인
    const isValidTags = 0 <= tags.length && tags.length <= 10;
    //이미지 개수 확인
    const isValidImg = files.length === 0 || files.length <= 3;

    // 미리보기는 이미지나, 텍스트만 허용
    const hasPreview = previewText.trim() !== '' || files.length > 0;

    const valid = !!(
      title.trim() !== '' &&
      content.trim() !== '' &&
      selectedModels.length > 0 &&
      priceType &&
      isValidCost &&
      isValidTags &&
      hasPreview &&
      isValidImg &&
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
        setModalText('가격을 설정해주세요.');
      } else if (previewText.trim() === '' && files.length === 0) {
        setModalText('프롬프트 미리보기를 입력해주세요.');
      } else if (discriptionText.trim() === '') {
        setModalText('프롬프트 설명을 입력해주세요.');
      } else if (!isValidTags) {
        setModalText('태그는 0~10개까지 설정 가능합니다.');
      } else if (!isValidImg) {
        setModalText('이미지는 0~3개까지 설정 가능합니다.');
      }
      setAlertModal(true);
    }
  };

  // 이미지 업로드 과정
  // 이미지 url(1) 생성 및 key(2) 발급 -> 생성된 url(1)로 실제 이미지 전송
  const handleUploadImg = async () => {
    const imageKeys: Array<{ key: string; order_index: number }> = []; // 업로드된 이미지 키들을 저장할 배열

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const contentType = file.type; // "image/png", "image/jpeg" 등
      let imgType: string = '';

      if (contentType === 'image/png') {
        imgType = 'png';
      } else if (contentType === 'image/jpeg' || contentType === 'image/jpg') {
        imgType = 'jpg'; // jpeg/jpg 통합
      } else {
        throw new Error(`지원하지 않는 이미지 타입: ${contentType}`);
      }

      // 파일의 실제 이름을 사용
      const fileName = file.name;

      try {
        //Img URL 발급 + KEY 생성
        const base = import.meta.env.VITE_SERVER_API_URL;
        const first_step = await axiosInstance.post(`${base}/api/prompts/presign-url`, {
          key: fileName,
          contentType: contentType,
        });
        // url, key 발급
        let img_url = first_step.data.url;
        let img_key = first_step.data.key;

        // 실제 파일 전송
        const second_step = await axios.put(img_url, file, {
          headers: { 'Content-Type': contentType },
        });

        // 성공적으로 업로드된 이미지 정보 저장
        imageKeys.push({
          key: img_key,
          order_index: i,
        });
      } catch (err) {
        throw err;
      }
    }

    return imageKeys; // 업로드된 이미지 키들 반환
  };

  // API 연동 - 프롬프트 업로드
  const handleUploadPrompt = async () => {
    const base = import.meta.env.VITE_SERVER_API_URL;
    const is_free = priceType === '무료' ? true : false;

    //사용자가 이미지 첨부로 선택 했어도 이미지 list가 비어있으면 false로 전송
    const has_image = files.length === 0 ? false : true;

    try {
      const res = await axiosInstance.post(`${base}/api/prompts`, {
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
      const prompt_ID = res.data.data.prompt_id;

      return prompt_ID; //이미지-프롬프트 매핑에서 사용
    } catch (err) {
      throw err;
    }
  };

  // 이미지와 프롬프트 매핑
  const handleMapImgToPrompt = async (prompt_ID: number, imageKeys: Array<{ key: string; order_index: number }>) => {
    for (const imageInfo of imageKeys) {
      try {
        // 전송한 파일(img_key)와 프롬프트를 매핑
        // index는 프롬프트의 i 번째 사진임을 의미
        const mapping_step = await axiosInstance.post(`https://promptplace.kro.kr/api/prompts/${prompt_ID}/images`, {
          image_url: `https://promptplace-s3.s3.ap-northeast-2.amazonaws.com/${imageInfo.key}`,
          order_index: imageInfo.order_index,
        });
      } catch (err) {
        throw err;
      }
    }
  };

  // '업로드 하시겠습니까?' 모달에서 "예" 클릭시
  const handleDualYes = async () => {
    setShowDualModal(false);
    setLoading(true);

    try {
      let imageKeys: Array<{ key: string; order_index: number }> = [];

      // 1. 이미지가 있다면 먼저 업로드
      if (files.length > 0) {
        imageKeys = await handleUploadImg();
      }

      // 2. 프롬프트 업로드
      const prompt_ID = await handleUploadPrompt();

      // 3. 이미지와 프롬프트 매핑
      if (imageKeys.length > 0) {
        await handleMapImgToPrompt(prompt_ID, imageKeys);
      }

      setModalText('업로드가 완료되었습니다.');
      setTimeout(() => {
        navigate(`/prompt/${prompt_ID}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      setModalText('업로드가 실패했습니다.');
    } finally {
      setLoading(false);
      setAlertModal(true);
    }
  };

  // '업로드 하시겠습니까?' 모달에서 "아니오" 클릭시
  const handleDualNo = () => {
    setShowDualModal(false);
  };

  return (
    <>
      <div className="hidden lg:block">
        <div className="h-[calc(100vh-24px)] flex items-center justify-center bg-[var(--color-background)] ">
          <div className="w-full max-w-[1236px] h-[745px] p-6 flex flex-col">
            {/**프롬프트 제목 */}
            <div className="max-w-[1236px] min-h-[120px] rounded-t-[16px] bg-[var(--color-white)] flex justify-center ">
              <div className="w-[1100px] max-h-[60px] mt-[35px] ">
                <Editor placeholder={'프롬프트 제목을 입력하세요'} onChange={setTitle} maxHight="max-h-[40px]" />
                <div className="border-b-[1px] border-[var(--color-text-on-background)] mt-[17px]"></div>
              </div>
            </div>
            {/**프롬프트 내용 */}
            <div className="max-w-[1236px] min-h-[465px] bg-[var(--color-white)] flex justify-center">
              <div className="w-[1100px] mt-[15px] ">
                <Editor placeholder={'프롬프트를 입력하세요'} onChange={setContent} maxHight="max-h-[430px]" />
              </div>
            </div>
            {/**하단 */}
            <div className="max-w-[1236px] h-[160px] rounded-b-[16px] bg-[var(--color-white)] flex justify-center">
              <div className="w-[1080px] flex justify-between items-center">
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
                <div className="w-full min-w-[240px] h-[20px] mx-[10px]">
                  <MobileEditor
                    placeholder={'프롬프트 제목을 입력하세요'}
                    onChange={setTitle}
                    maxHight="max-h-[22px]"
                  />
                </div>
              </div>
              {/**프롬프트 내용 */}
              <div className="min-w-[280px] min-h-[278px] flex justify-center items-center p-[10px]">
                <div className="w-full min-w-[260px] h-full min-h-[238px] ">
                  <MobileEditor placeholder={'프롬프트를 입력하세요'} onChange={setContent} maxHight="" />
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
        {showDualModal && <DualModal text="업로드 하시겠습니까?" onClickYes={handleDualYes} onClickNo={handleDualNo} />}
        {/* TextModal */}
        {alertModal && <TextModal text={modalText} onClick={() => setAlertModal(false)} size="lg" />}
      </div>
    </>
  );
};

export default PromptCreatePage;
