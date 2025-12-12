import help from '@assets/promptCreate/icon-help.svg';
import arrowdown from '@assets/promptCreate/icon_arrow.svg';
import UploadIcon from '@assets/icon-upload.svg';

import { useState } from 'react';
import FilterModal from './components/FilterModal';
import TagButton from '@/components/Button/TagButton';

import TextModal from '@/components/Modal/TextModal';

import useCreatePromptText from '@/hooks/mutations/PromptCreatePage/useCreateText';
import { useNavigate } from 'react-router-dom';

const PromptCreateTextPage = () => {
  const navigate = useNavigate();

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

  const [previewText, setPreviewText] = useState<string>('');
  const [discriptionText, setDescriptionText] = useState<string>(''); //한줄 소개
  const [howToUseText, setHowToUseText] = useState<string>('');

  //모달
  const [modalInitialTab, setModalInitialTab] = useState<'model' | 'category'>('model');

  const [isUploaded, setIsUploaded] = useState<boolean>(false); //업로드 되었는지 여부

  //API 연동 관련
  const { mutateAsync: createPrompt } = useCreatePromptText();
  //isPending : 현재 로딩 중인지 알려주는 boolean 값

  // 유효성 검증 함수
  const [validationError, setValidationError] = useState<string>('');

  const validateForm = (): boolean => {
    // 필수 필드 검증 (모델 버전 제외)
    const isAllFieldsFilled =
      title.trim() !== '' &&
      content.trim() !== '' &&
      selectedModels.length > 0 &&
      categories.length > 0 &&
      previewText.trim() !== '' &&
      discriptionText.trim() !== '' &&
      howToUseText.trim() !== '';

    if (!isAllFieldsFilled) {
      setValidationError('※ 입력하지 않은 정보가 있어요! 전부 작성 후 업로드하기를 눌러주세요');
      return false;
    }

    // 모든 검증 통과
    setValidationError('');
    return true;
  };

  // 업로드 버튼 클릭
  const handleUploadClick = async () => {
    //이미 업로드 된 것인지 검사
    if (isUploaded) return;

    //유효성 검증
    if (!validateForm()) {
      return;
    }
    try {
      // 프롬프트 업로드
      const res = await createPrompt({
        title: title,
        prompt: content,
        prompt_result: previewText,
        has_image: false,
        description: discriptionText,
        usage_guide: howToUseText,
        is_free: true,
        price: 0,
        model_version: modelver || '',
        categories: categories,
        models: selectedModels,
      });

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
    } catch (err) {
      console.error(err);
      setModalText('업로드가 실패했습니다');
      setAlertModal(true);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center lg:px-[102px] max-lg:flex-col max-lg:px-[40px]">
          <div className="lg:max-w-[1236px] lg:w-full lg:h-full">
            <div className="mt-[64px]">
              <p className="text-black text-[32px] font-medium tracking-[-0.01em] max-phone:tracking-[-0.05em] leading-[140%]">
                텍스트 결과 프롬프트 업로드
              </p>
            </div>
            <div className="mt-[12px] flex lg:justify-between items-start max-lg:items-end max-lg:flex-col">
              <p className="lg:w-[527px] w-full max-lg:flex-1 max-lg:min-w-0 font-light text-[16px] leading-[140%] tracking-[-0.01em]">
                프롬프트와 프롬프트 정보를 모두 입력하고 ‘업로드하기’를 눌러주세요
              </p>
              <div className="flex phone:flex-col lg:w-[121px] phone:items-end max-lg:shrink-0 phone:justify-end lg:mt-[20px]">
                <span className="lg:w-[121px] lg:h-[24px] flex lg:justify-between items-center mt-[20px] cursor-pointer max-lg:gap-2 max-lg:whitespace-nowrap">
                  <img className="w-[24px] h-[24px]" src={help} alt="작성 꿀팁 보기" />
                  <p className="text-black text-[14px] font-light leading-[16px] border-b border-[#1A202C]">
                    작성 꿀팁 보기
                  </p>
                </span>
              </div>
            </div>

            {/**메인 작성 파트 */}
            <div className="lg:h-[1056px] lg:mt-[20px] lg:mb-[40px] flex lg:justify-between lg:gap-[20px] max-lg:mt-[20px] max-lg:flex-col-reverse">
              {/**좌측 본문 */}
              <div className="lg:max-w-[450px] w-full bg-white rounded-[16px] p-[24px] max-lg:mt-[20px]">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="프롬프트를 작성해주세요."
                  className="w-full h-[1000px] max-lg:h-[285px] flex-1 bg-transparent outline-none resize-none text-[14px] font-light
                    placeholder:text-text-on-background placeholder:text-[14px] placeholder:font-light overflow-y-auto"
                />
              </div>
              {/**우측 본문 */}
              <div className="max-w-[1245px] w-full bg-white rounded-[16px] p-[24px]">
                <div className="h-[80px] w-full mb-[16px]">
                  <p className="text-[16px] font-medium pb-[12px]">프롬프트 제목</p>
                  <div className="w-full py-[12px] px-[16px] h-[46px] bg-gray50 rounded-[8px]">
                    <input
                      name="title"
                      className="w-full text-[14px] font-light placeholder:text-gray400 outline-none"
                      placeholder="예) SNS 광고 카피 문구 생성기"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-[12px]">
                  <p className="text-[16px] font-medium pb-[4px]">기본 정보 입력</p>
                  <p className="text-[12px] font-light pb-[4px] text-gray700">※ 모델 버전이 있는 경우 작성해주세요.</p>
                  <p className="text-[12px] font-light text-gray700">
                    ※ 모델과 카테고리는 최대 5개까지 선택 가능합니다.
                  </p>
                </div>

                <div className="flex justify-start gap-[12px] mb-[12px]">
                  <div
                    className="w-[105px] h-[28px] px-[8px] flex justify-between items-center gap-[16px]
                  cursor-pointer flex-shrink-0 bg-gray50 rounded-[8px]"
                    onClick={() => {
                      setModalInitialTab('category');
                      setuploadModal(true);
                    }}>
                    <p className="text-[14px] font-light">카테고리</p>
                    <img className="w-[16px] h-[16px] flex-shrink-0" src={arrowdown} alt="down-arrow" />
                  </div>

                  {/* 선택된 카테고리 표시 - 강제 줄바꿈 필요시  flex-wrap를 srcoll 대신 사용 */}
                  <div className="flex gap-[8px] items-center overflow-x-scroll pb-[3px]">
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

                <div className="mb-[16px]">
                  <div className="flex justify-start gap-[12px] mb-[12px]">
                    <div
                      className="w-[75px] h-[28px] px-[8px] flex justify-between items-center gap-[16px]
                      cursor-pointer bg-gray50 rounded-[8px]"
                      onClick={() => {
                        setModalInitialTab('model');
                        setuploadModal(true);
                      }}>
                      <p className="text-[14px] font-light">모델</p>
                      <img className="w-[16px] h-[16px] flex-shrink-0" src={arrowdown} alt="down-arrow" />
                    </div>
                    {/* 선택된 모델 표시 */}
                    <div className="flex gap-[8px] items-center overflow-x-scroll pb-[3px]">
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
                      className="w-full text-[14px] font-light outline-none"
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

                <div className="mb-[16px]">
                  <div className="mb-[12px]">
                    <p className="text-[16px] font-medium pb-[4px]">결과 미리보기</p>
                    <p className="text-[12px] font-light text-gray700">
                      프롬프트를 입력한 AI의 답변 일부를 작성해주세요.
                    </p>
                  </div>
                  <div className="h-[185px] w-full py-[12px] px-[16px] bg-gray50 rounded-[8px]">
                    <textarea
                      className="w-full h-[160px] text-[14px] font-light  placeholder:text-gray-400 resize-none outline-none"
                      placeholder={`예) "세상에 없던 초코, 먹어도 부담 없는 마법"\n"다이어터들이 초코 아이스크림 먹는 비법"`}
                      value={previewText}
                      onChange={(e) => setPreviewText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-[16px]">
                  <div className="mb-[12px]">
                    <p className="text-[16px] font-medium pb-[4px]">한줄 소개</p>
                    <p className="text-[12px] font-light text-gray700">프롬프트에 대한 한줄 소개를 작성해주세요.</p>
                  </div>
                  <div className="h-[45px] w-full py-[12px] px-[16px] bg-gray50 rounded-[8px]">
                    <input
                      className="w-full max-lg:h-[22px] text-[14px] font-light bg-gray50 rounded-[8px] placeholder:text-gray-400 resize-none outline-none"
                      placeholder={`예) SNS 광고에 활용 가능한 카피 문구 생성 프롬프트입니다!`}
                      value={discriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-[12px]">
                    <p className="text-[16px] font-medium pb-[4px]">상세 설명</p>
                    <p className="text-[12px] font-light text-gray700">
                      프롬프트에 대한 상세 설명, 활용법 등을 자유롭게 작성해주세요.
                    </p>
                  </div>
                  <div className="h-[262px] w-full py-[12px] px-[16px] bg-gray50 rounded-[8px]">
                    <textarea
                      className="w-full h-[240px] text-[14px] font-light  placeholder:text-gray-400 resize-none outline-none"
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

            <div className="h-[20px] max-lg:h-[30px] max-lg:pt-[15px]">
              {validationError && <p className="text-[16px] font-medium text-alert">{validationError}</p>}
            </div>

            {/**업로드 버튼 */}
            <div className="lg:max-w-[1240px] w-full mt-[40px] max-lg:mt-[30px]">
              <button
                className="w-full h-[65px] flex justify-center items-center gap-[16px] bg-primary rounded-[16px] py-[20px]"
                onClick={handleUploadClick}
                disabled={isUploaded}>
                <img src={UploadIcon} alt="업로드 버튼" className="w-[16px] h-[16px]" />
                <p className="text-[18px] font-medium text-white leading-[140%] tracking-[-0.01px]">업로드 하기</p>
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

export default PromptCreateTextPage;
