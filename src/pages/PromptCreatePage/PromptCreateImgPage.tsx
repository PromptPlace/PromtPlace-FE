import help from '@assets/promptCreate/icon-help.svg';
import arrowdown from '@assets/promptCreate/icon_arrow.svg';
import UploadIcon from '@assets/icon-upload.svg';

import imgUpload from '@assets/promptCreate/image-upload-img.svg';
import imgDelete from '@assets/promptCreate/icon-delete-Xbutton-red.svg';

import { useState, useRef, useEffect } from 'react';
import FilterModal from './components/FilterModal';
import TagButton from '@/components/Button/TagButton';

import TextModal from '@/components/Modal/TextModal';
import useCreatePromptWithImage from '@/hooks/mutations/PromptCreatePage/useCreateImg';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import useGetPromptDetail from '@/hooks/queries/PromptDetailPage/useGetPromptDetail';
import useEditPrompt from '@/hooks/mutations/PromptCreatePage/useEditPrompt';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [previewText, setPreviewText] = useState<string>('');
  const [discriptionText, setDescriptionText] = useState<string>(''); //한줄 소개
  const [howToUseText, setHowToUseText] = useState<string>('');

  const [isUploaded, setIsUploaded] = useState<boolean>(false); //업로드 되었는지 여부 - 중복 업로드 방지용

  // 이미지 업로드

  const inputImgRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prev) =>
      [...prev, ...newFiles].filter(
        (file, idx, arr) => arr.findIndex((f) => f.name === file.name && f.size === file.size) === idx,
      ),
    );
    if (inputImgRef.current) inputImgRef.current.value = '';
  };

  // 이미지 삭제
  const handleRemove = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

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

  // 유효성 검증 함수
  const validateForm = (): boolean => {
    // 필수 필드 검증
    const isAllFieldsFilled =
      title.trim() !== '' &&
      content.trim() !== '' &&
      selectedModels.length > 0 &&
      categories.length > 0 &&
      discriptionText.trim() !== '' &&
      howToUseText.trim() !== '';

    // 이미지 개수 검증 (0~3개)
    const isValidImg = files.length >= 0 && files.length <= 3;

    // 미리보기: 이미지 필수
    const hasPreview = files.length > 0;

    if (!isAllFieldsFilled) {
      setValidationError('※ 입력하지 않은 정보가 있어요! 전부 작성 후 업로드하기를 눌러주세요');
      return false;
    }

    if (!isValidImg) {
      setValidationError('※ 이미지는 최대 3개까지 업로드 가능해요');
      return false;
    }

    if (!hasPreview) {
      setValidationError('※ 결과 미리보기(이미지)를 입력해주세요');
      return false;
    }

    // 모든 검증 통과
    setValidationError(null);
    return true;
  };

  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = async () => {
    //0. 이미 업로드 된 것인지 검사
    if (isUploaded) return;

    // 1. 유효성 검증
    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'create') {
        // 2. 프롬프트와 이미지 업로드
        const result = await createPromptWithImage({
          promptData: {
            title: title,
            prompt: content,
            prompt_result: previewText,
            has_image: files.length > 0, // 이미지가 있으면 true
            description: discriptionText,
            usage_guide: howToUseText,
            is_free: true, // 무료 고정
            price: 0, // 무료 고정
            model_version: modelver || '',
            categories: categories,
            models: selectedModels,
          },
          files: files,
        });

        console.log('전송 성공!', result);
        const prompt_ID = result.prompt_id;

        // 3. 성공 처리
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
            body: {
              title: title,
              prompt: content,
              prompt_result: previewText,
              has_image: files.length > 0,
              description: discriptionText,
              usage_guide: howToUseText,
              is_free: true,
              price: 0,
              model_version: modelver || '',
              categories: categories,
              models: selectedModels,
            },
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

  useEffect(() => {
    if (mode === 'edit' && detailData) {
      setTitle(detailData.title);
      setContent(detailData.prompt);
      setPreviewText(detailData.prompt_result);
      setDescriptionText(detailData.description);
      setHowToUseText(detailData.usage_guide);
      setSelectedModels(detailData.models.map((m) => m.name));
      setCategories(detailData.categories.map((c) => c.category.name));
      setModelver(detailData.model_version ?? '');
      setExistingImages(detailData.images.map((i) => i.image_url));
    }
  }, [mode, detailData]);

  return (
    <>
      <div>
        <div className="flex justify-center px-[102px] max-lg:px-[40px] max-phone:px-[20px]">
          <div className="w-full h-full">
            <div className="mt-[64px] flex flex-col gap-[12px]">
              <p className="text-black custom-h1 max-phone:text-[24px]">이미지 결과 프롬프트 업로드</p>
              <p className="custom-h3 text-gray950 max-phone:text-[14px]">
                프롬프트와 프롬프트 정보를 입력하고 ‘업로드하기’를 눌러주세요{' '}
              </p>
            </div>

            <div className="flex items-center justify-end gap-[8px] cursor-pointer mt-[20px]">
              <img
                className="w-[24px] h-[24px] max-phone:w-[16px] max-phone:h-[16px]"
                src={help}
                alt="작성 꿀팁 보기"
              />
              <p className="text-black text-[14px] font-light leading-[16px] border-b max-phone:text-[12px]">
                작성 꿀팁 보기
              </p>
            </div>

            {/**메인 작성 파트 */}
            <div className="mt-[20px] mb-[40px] flex justify-between gap-[20px] max-lg:flex-col-reverse">
              {/**좌측 본문 */}
              <div className="lg:max-w-[450px] w-full bg-white rounded-[16px] p-[24px] max-lg:w-full">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="프롬프트를 작성해주세요."
                  className="w-full h-[1000px] flex-1 bg-transparent outline-none resize-none text-[14px] font-light
                    placeholder:text-text-on-background placeholder:text-[14px] placeholder:font-light overflow-y-auto max-lg:h-[284px]"
                />
              </div>

              {/**우측 본문 */}
              <div className="max-w-[1245px] w-full bg-white rounded-[16px] p-[24px] flex flex-col gap-[16px]">
                <div className="w-full flex flex-col gap-[12px]">
                  <p className="custom-h5 max-phone:text-[14px]">프롬프트 제목</p>
                  <div className="w-full py-[12px] px-[16px] h-[46px]  bg-gray50 rounded-[8px]">
                    <input
                      name="title"
                      className="w-full text-[14px] font-light placeholder:text-gray400 outline-none max-phone:placeholder:text-[12px] max-phone:text-[12px]"
                      placeholder="예) SNS 광고 카피 문구 생성기"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={50}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col gap-[4px]">
                    <p className="custom-h5 max-phone:text-[14px]">기본 정보 입력</p>
                    <p className="text-[12px] font-light text-gray700 max-phone:text-[10px]">
                      ※ 모델 버전이 있는 경우 작성해주세요.
                    </p>
                    <p className="text-[12px] font-light text-gray700 max-phone:text-[10px]">
                      ※ 모델과 카테고리는 최대 5개까지 선택 가능합니다.
                    </p>
                  </div>

                  <div className="flex justify-start gap-[12px]">
                    <div
                      className="w-[102px] max-phone:w-[87px] h-[30px] px-[8px] flex justify-between items-center phone:gap-[16px]
                  cursor-pointer flex-shrink-0 bg-gray50 rounded-[8px]"
                      onClick={() => {
                        setModalInitialTab('category');
                        setuploadModal(true);
                      }}>
                      <p className="text-[14px] font-light max-phone:text-[12px]">카테고리</p>
                      <img className="w-[16px] h-[16px] flex-shrink-0" src={arrowdown} alt="down-arrow" />
                    </div>
                    {/* 선택된 카테고리 표시 - 강제 줄바꿈 필요시  flex-wrap를 srcoll 대신 사용 */}
                    <div className="flex gap-[8px] items-center overflow-x-auto">
                      {categories.map((category) => {
                        // DB 값 → 라벨 매핑 (FilterModal과 동일)
                        const categoryLabels: Record<string, string> = {
                          '보고서 / 레포트': '보고서•레포트',
                          '사업계획서 / 기획안': '사업계획서•기획안',
                          '논문 / 학술자료': '논문•학술자료',
                          '자기소개서 / 이력서': '자기소개서•이력서',
                          '광고 / 카피라이팅': '광고•카피라이팅',
                          '시 / 소설': '시•소설',
                          '숏폼 스크립트': '숏폼 스크립트',
                          '광고 영상 콘셉트': '광고 영상 콘셉트',
                          '애니메이션 장면': '애니메이션 장면',
                          스토리보드: '스토리보드',
                          '마케팅 캠페인 기획': '마케팅 캠페인 기획',
                          'SNS 콘텐츠 아이디어': 'SNS 콘텐츠 아이디어',
                          '시장조사/분석': '시장조사•분석',
                          '이메일/세일즈 카피': '이메일•세일즈 카피',
                          '여행 / 일정': '여행•일정',
                          '요리 / 레시피': '요리•레시피',
                          '게임 / 시나리오': '게임•시나리오',
                          '취미 / 심리테스트': '퀴즈•심리테스트',
                          상담: '상담',
                          아이데이션: '아이데이션',
                          브레인스토밍: '브레인스토밍',
                          '비즈니스 아이디어': '비즈니스 아이디어',
                          배경음악: '배경음악',
                          '사운드 이펙트': '사운드 이펙트',
                          '작곡/편곡 보조': '작곡•편곡 보조',
                          '나레이션/보이스': '나레이션•보이스',
                          일러스트: '일러스트',
                          로고: '로고',
                          '포스터 / 배너': '포스터•배너',
                          '캐릭터 디자인': '캐릭터 디자인',
                          '사진 리터칭': '사진 리터칭',
                          '코드 자동화': '코드 자동화',
                          '디버깅/리팩토링': '디버깅•리팩토링',
                          'API 설계': 'API 설계',
                          'SQL 쿼리': 'SQL 쿼리',
                          '테스트 케이스': '테스트 케이스',
                          '학습 / 과제 요약': '학습•과제 요약',
                          '문제 풀이': '문제 풀이',
                          '개념 설명': '개념 설명',
                          '외국어 학습': '외국어 학습',
                        };

                        const label = categoryLabels[category] || category;

                        return (
                          <TagButton
                            key={category}
                            hasDelete={true}
                            hasActive={false}
                            text={label}
                            onClick={() => {
                              setCategories(categories.filter((c) => c !== category));
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-[8px] flex flex-col gap-[12px]">
                    <div className="flex justify-start gap-[12px]">
                      <div
                        className="w-[75px] max-phone:w-[64px] h-[30px] px-[8px] flex justify-between items-center phone:gap-[16px]
                      cursor-pointer bg-gray50 rounded-[8px]"
                        onClick={() => {
                          setModalInitialTab('model');
                          setuploadModal(true);
                        }}>
                        <p className="text-[14px] font-light max-phone:text-[12px]">모델</p>
                        <img className="w-[16px] h-[16px] flex-shrink-0" src={arrowdown} alt="down-arrow" />
                      </div>
                      {/* 선택된 모델 표시 */}
                      <div className="flex gap-[8px] items-center overflow-x-auto">
                        {selectedModels.map((model) => (
                          <TagButton
                            key={model}
                            hasDelete={true}
                            hasActive={false}
                            text={model}
                            onClick={() => {
                              setSelectedModels(selectedModels.filter((m) => m !== model));
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="w-full h-[46px] py-[8px] px-[16px] bg-gray50 rounded-[8px] items-center">
                      <input
                        value={modelver}
                        onChange={(e) => setModelver(e.target.value)}
                        maxLength={30} //글자 제한
                        className="w-full text-[14px] font-light outline-none max-phone:placeholder:text-[12px] max-phone:text-[12px]"
                        placeholder="예) ChatGPT 5, Gemini 2.5 pro"
                      />
                    </div>
                  </div>

                  <FilterModal
                    isOpen={uploadModal}
                    onClose={() => setuploadModal(false)}
                    selectedModels={selectedModels}
                    setSelectedModels={setSelectedModels}
                    categories={categories}
                    setCategories={setCategories}
                    initialTab={modalInitialTab}
                  />
                </div>

                <div className="flex flex-col gap-[26px]">
                  <div className="flex flex-col gap-[4px]">
                    <p className="custom-h5 pb-[4px] max-phone:text-[14px]">결과 미리보기</p>
                    <p className="text-[12px] font-light text-gray700 max-phone:text-[10px]">
                      프롬프트를 입력한 AI의 이미지를 업로드 해주세요.(최대 3개)
                    </p>
                  </div>

                  <div className="flex items-start gap-[20px] max-lg:flex-col">
                    {/* 왼쪽: 업로드 버튼 */}
                    <div className="w-[195px] flex flex-col justify-center items-center gap-[16px] p-4 border-[1px] border-dashed border-primary bg-secondary rounded-[16px] max-lg:w-full">
                      <img src={imgUpload} alt="업로드" className="w-12 h-12" />

                      <p className="text-[12px] text-gray-700 text-center max-phone:text-[10px]">
                        이미지를 업로드해주세요
                        <br />
                        (최대 3개)
                      </p>
                      <button
                        type="button"
                        onClick={() => inputImgRef.current?.click()}
                        disabled={files.length >= 3} // 여기에 disabled 추가!
                        className="px-4 py-2 text-[12px] border border-primary rounded-[8px] bg-white disabled:border-gray-400 disabled:text-gray-400 disabled:bg-gray-300 disabled:cursor-not-allowed mt-[-4px] max-phone:text-[10px] max-phone:py-[6px]">
                        이미지 업로드
                      </button>
                      <input
                        ref={inputImgRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={files.length >= 3}
                      />
                    </div>

                    {/* 오른쪽: 업로드된 이미지 목록 */}
                    <div className="flex-1 flex flex-col gap-[12px] max-lg:w-full">
                      {existingImages.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-[16px]">
                          <div className="flex items-center gap-[8px] flex-1 min-w-0">
                            {/* 썸네일 이미지 */}
                            <div className="w-[30px] h-[30px] rounded-[16px] overflow-hidden bg-gray-100 shrink-0">
                              <img src={file} alt={file} className="w-full h-full object-cover" />
                            </div>

                            {/* 파일명 */}
                            <p className="text-sm text-gray-700 whitespace-normal break-all max-phone:text-[10px]">
                              {file}
                            </p>
                          </div>

                          {/* 삭제 버튼 */}
                          <img
                            src={imgDelete}
                            alt="삭제 버튼"
                            onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                            className="text-alert"
                          />
                        </div>
                      ))}

                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-[16px]">
                          <div className="flex items-center gap-[8px] flex-1 min-w-0">
                            {/* 썸네일 이미지 */}
                            <div className="w-[30px] h-[30px] rounded-[16px] overflow-hidden bg-gray-100 shrink-0">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* 파일명 */}
                            <p className="text-sm text-gray-700 whitespace-normal break-all max-phone:text-[10px]">
                              {file.name}
                            </p>
                          </div>

                          {/* 삭제 버튼 */}
                          <img
                            src={imgDelete}
                            alt="삭제 버튼"
                            onClick={() => handleRemove(idx)}
                            className="text-alert"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col gap-[4px]">
                    <p className="custom-h5 max-phone:text-[14px]">한줄 소개</p>
                    <p className="text-[12px] font-light text-gray700 max-phone:text-[10px]">
                      프롬프트에 대한 한줄 소개를 작성해주세요.
                    </p>
                  </div>

                  <div className="min-h-[45px] h-full w-full py-[12px] px-[16px] bg-gray50 rounded-[8px]">
                    <textarea
                      className="resize-none w-full min-h-[22px] h-full text-[14px] font-light placeholder:text-gray-400 outline-none max-phone:placeholder:text-[12px] max-phone:text-[12px]"
                      placeholder={`예) SNS 광고에 활용 가능한 카피 문구 생성 프롬프트입니다!`}
                      value={discriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col gap-[4px">
                    <p className="custom-h5 max-phone:text-[14px]">상세 설명</p>
                    <p className="text-[12px] font-light text-gray700 max-phone:text-[10px]">
                      프롬프트에 대한 상세 설명, 활용법 등을 자유롭게 작성해주세요.
                    </p>
                  </div>
                  <div className="h-[262px] max-lg:h-[134px] w-full py-[12px] px-[16px]  bg-gray50 rounded-[8px]">
                    <textarea
                      className="w-full lg:h-[240px] max-lg:h-full text-[14px] font-light placeholder:text-gray-400 resize-none outline-none max-phone:placeholder:text-[12px] max-phone:text-[12px]"
                      placeholder={`예) [ ]부분은 직접 채워서 사용하세요
톤앤매너를 바꿔가며 카피 스타일 다양화 (예: “유머러스하게”, “프리미엄스럽게”)
글자 수 제한을 없애면 블로그/랜딩페이지용 문구에도 확장 가능`}
                      value={howToUseText}
                      onChange={(e) => setHowToUseText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {validationError && <p className="custom-h5 text-alert max-phone:text-[14px]">{validationError}</p>}

            {/**업로드 버튼 */}
            <div className={clsx('w-full', validationError ? 'mt-[20px]' : 'mt-[82px]')}>
              <button
                className="w-full h-[65px] flex justify-center items-center gap-[16px] bg-primary rounded-[12px] py-[20px]"
                onClick={handleUploadClick}
                disabled={isUploaded}>
                <img src={UploadIcon} alt="업로드 버튼" className="w-[16px] h-[16px]" />
                <p className="custom-h4 text-white max-phone:text-[16px]">업로드 하기</p>
              </button>
            </div>
          </div>
        </div>
        {/* TextModal */}
        {alertModal && <TextModal text={'업로드가 완료되었어요!'} onClick={() => setAlertModal(false)} size="lg" />}
      </div>
    </>
  );
};

export default PromptCreateImgPage;
