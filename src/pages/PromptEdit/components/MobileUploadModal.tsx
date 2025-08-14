import { useEffect, useRef, useState } from 'react';
import xbtn from '@assets/icon-delete-Xbutton.svg';

import { motion } from 'motion/react';

const TAB_GROUP = [
  { label: '모델', showDot: true },
  { label: '가격', showDot: true },
  { label: '태그', showDot: false },
  { label: '미리보기', showDot: true },
  { label: '설명', showDot: true },
  { label: '활용법', showDot: false },
];
const MODEL_LIST = ['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Midjourney', '기타'];

const MobileUploadModal = ({
  setuploadModal,
  selectedModels,
  setSelectedModels,
  priceType,
  setPriceType,
  cost,
  setCost,
  tags,
  setTags,
  withImage,
  setWithImage,
  files,
  setFiles,
  previewText,
  setPreviewText,
  discriptionText,
  setDescriptionText,
  howToUseText,
  setHowToUseText,
}: {
  setuploadModal: (value: boolean) => void;
  selectedModels: string[];
  setSelectedModels: (models: string[]) => void;
  priceType: '무료' | '유료' | null;
  setPriceType: (type: '무료' | '유료') => void;
  cost: number | null;
  setCost: (cost: number | null) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  withImage: boolean;
  setWithImage: (value: boolean) => void;
  files: File[];
  setFiles: (files: File[] | ((prev: File[]) => File[])) => void;
  previewText: string;
  setPreviewText: (previewText: string) => void;
  discriptionText: string;
  setDescriptionText: (discriptionText: string) => void;
  howToUseText: string;
  setHowToUseText: (howToUseText: string) => void;
}) => {
  //탭 선택용
  const [selectedTab, setSelectedTab] = useState<string>('모델');
  // 탭 구분
  const topTabs = TAB_GROUP.slice(0, 3);
  const bottomTabs = TAB_GROUP.slice(3, 6);

  useEffect(() => {
    console.log('selectedModels : ', selectedModels);
  }, [selectedModels]);

  // 모델 다중 선택 토글
  const handleModelToggle = (model: string) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter((m) => m !== model));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  /** 가격 탭 관련 */
  const [costInput, setCostInput] = useState(cost !== null ? cost.toString() : ''); // 가격 입력
  const costInputRef = useRef<HTMLInputElement | null>(null);
  // 가격 타입(무료/유료) 단일 선택
  const handlePriceType = (type: '무료' | '유료') => {
    setPriceType(type);
    if (type === '무료') {
      setCost(0);
    }
  };

  // 유효성 검사 함수
  const isValidPrice = (value: string) => {
    const num = Number(value);
    return !isNaN(num) && (num === 0 || (num >= 100 && num <= 100000));
  };

  // 콤마 포맷 함수
  const formatNumber = (num: number) => num.toLocaleString('ko-KR');

  // cost 바뀔 때 input도 동기화
  useEffect(() => {
    setCostInput(cost !== null ? cost.toString() : '');
  }, [cost]);

  // 유료일 때만 금액 입력 (숫자만)
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw.length > 7) raw = raw.slice(0, 7);
    setCostInput(raw);

    if (isValidPrice(raw)) {
      setCost(Number(raw));
    } else {
      setCost(null); // 비유효시 cost 값도 null로 만듦
    }
  };

  /**태그 관련 */
  const [taginput, setTagInput] = useState<string>(''); // 가격 입력
  const inputTagRef = useRef<HTMLInputElement>(null);
  // 태그 문자열을 배열로 변환
  function splitTags(input: string) {
    return input
      .split('#')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }
  // 태그 추가
  const handleComplete = () => {
    const value = taginput.trim();
    if (value) {
      const newTags = splitTags(value);
      const mergedTags = Array.from(new Set([...tags, ...newTags])).slice(0, 10);
      setTags(mergedTags);
    }
    setTagInput('');
    inputTagRef.current?.focus();
  };

  // 태그 삭제
  const handleDeleteTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  return (
    <>
      {/* 오버레이 */}
      <motion.div
        className="lg:hidden fixed z-1 inset-0 bg-overlay max-w-[425px] w-full m-auto"
        onClick={() => setuploadModal(false)}
      />

      {/* 하단 모달 */}
      <div className="lg:hidden fixed left-0 right-0 bottom-0 z-200 max-w-[425px] w-full mx-auto">
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 50 }}
          dragElastic={false}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300,
          }}
          onDragEnd={(_, info) => {
            // 드래그로 210px 이상 내려가면 모달 닫기
            if (info.point.y > window.innerHeight - 280) {
              setuploadModal(false);
            }
          }}
          className="w-full min-w-[320px] h-[410px] bg-white rounded-t-[25px] shadow-lg">
          {/* 드래그 핸들 */}
          <div className="w-full flex justify-center pt-3 pb-2">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex-col justify-center items-center">
            <div className="">
              {/* 위쪽 탭 */}
              <div className="w-full max-w-[205px] mt-[20px] ml-[20px] mb-[5.5px] gap-[8px] flex items-center justify-between">
                {topTabs.map((tab) => (
                  <button
                    key={tab.label}
                    className={`
                relative flex w-[63px] h-[27px] items-center justify-center rounded-[50px] text-[12px] font-medium
                ${selectedTab === tab.label ? `text-primary bg-secondary` : 'text-text-on-background'}
              `}
                    onClick={() => setSelectedTab(tab.label)}
                    type="button">
                    <p> {tab.label}</p>
                    {tab.showDot && <span className="absolute -top-1 right-2 text-alert text-base">•</span>}
                  </button>
                ))}
              </div>
            </div>
            {/* 탭 밑 라인 */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-[275px] border-b border-[#E3E6ED]" />
            </div>
            {/* 아래쪽 탭 */}
            <div className="">
              <div className="w-full max-w-[265px] mt-[6.5px] ml-[20px] gap-[8px] flex items-center justify-start">
                {bottomTabs.map((tab) => (
                  <button
                    key={tab.label}
                    className={`relative flex 
                ${tab.label === '설명' ? 'w-[59px] pr-[4px]' : tab.label === '활용법' ? 'w-[74px]' : 'w-[85px]'}
                 h-[27px] items-center justify-center rounded-[50px] text-[12px] font-medium
                ${selectedTab === tab.label ? `text-primary bg-secondary` : 'text-text-on-background'}
              `}
                    onClick={() => setSelectedTab(tab.label)}
                    type="button">
                    <p> {tab.label}</p>
                    {tab.showDot && (
                      <span
                        className={`${tab.label === '설명' ? 'absolute -top-1 right-2.5 text-alert text-base' : 'absolute -top-1 right-2 text-alert text-base'}`}>
                        •
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-[20px] mt-[20px] ">
            {/* 모델 탭 */}
            {selectedTab === '모델' && (
              <div className="h-[134px] grid grid-cols-2 gap-x-[20px] gap-y-[16px]">
                {MODEL_LIST.map((model) => {
                  const selected = selectedModels.includes(model);
                  return (
                    <button
                      key={model}
                      className={`
                      w-[130px] h-[34px] rounded-[4px] border-[0.5px] flex items-center justify-center text-[14px] font-normal
                      ${selected ? `text-primary border-primary bg-secondary` : 'text-white-stroke border-white-stroke bg-white'}
                      transition
                    `}
                      onClick={() => handleModelToggle(model)}
                      type="button">
                      {model}
                    </button>
                  );
                })}
              </div>
            )}
            {/* 가격 탭 */}
            {selectedTab === '가격' && (
              <>
                <div className="flex justify-center items-center gap-[20px]">
                  <button
                    className={`
                    flex w-[130px] h-[34px] rounded-[4px] border-[0.5px] text-[14px] font-normal items-center justify-center
                    ${
                      priceType === '무료'
                        ? `text-primary-hover border-primary-hover bg-secondary`
                        : 'text-white-stroke border-white-stroke bg-white'
                    }
                  `}
                    onClick={() => handlePriceType('무료')}
                    type="button">
                    무료
                  </button>

                  <button
                    className={`
                    flex w-[130px] h-[34px] rounded-[4px] border-[0.5px] text-[14px] font-normal items-center justify-center
                    ${
                      priceType === '유료'
                        ? `text-primary-hover border-primary-hover bg-secondary`
                        : 'text-white-stroke border-white-stroke bg-white'
                    }
                  `}
                    onClick={() => handlePriceType('유료')}
                    type="button">
                    유료
                  </button>
                </div>
                {priceType === '유료' && (
                  <div className="flex flex-col gap-1 mt-[20px]">
                    <label className="text-[10px] text-primary font-medium mb-[8px]">가격 입력하기</label>
                    <input
                      ref={costInputRef}
                      type="text"
                      value={costInput ? `${formatNumber(Number(costInput))}원` : ''}
                      onChange={handleCostChange}
                      className={`w-[280px] h-[34px] px-3 rounded-[4px] text-[10px] border-[0.5px] border-primary`}
                      placeholder="가격을 입력해주세요"
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                )}
              </>
            )}

            {/* 태그 탭 */}
            {selectedTab === '태그' && (
              <>
                <div className="w-full max-w-[280px] mx-auto mt-[20px]">
                  <p className="text-primary text-[10px] font-medium mb-[20px]">태그 입력하기</p>

                  <div className="flex items-center border-[0.5px] border-primary rounded-[4px] px-[14px] py-[10px] mb-[20px]">
                    <input
                      ref={inputTagRef}
                      value={taginput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleComplete();
                      }}
                      className="flex-1 ml-[2px] bg-transparent border-none outline-none text-[10px]"
                      placeholder="태그를 입력해 주세요(최대 10개)"
                    />
                    <button
                      onClick={handleComplete}
                      className="px-[8px] py-[4px] rounded-[6px]
                   bg-primary text-white text-[12px] font-medium">
                      완료
                    </button>
                  </div>

                  <p className="text-primary text-[10px] font-medium">입력한 태그</p>

                  <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide mt-[8px]">
                    {tags.length === 0 ? (
                      <span></span>
                    ) : (
                      tags.map((tag, idx) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-[50px] border border-text-on-background bg-white pl-[10px] py-[4.5px] 
                      text-[10px] font-normal text-text-on-background mr-[8px]"
                          style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.12)' }}>
                          #{tag}
                          <button
                            type="button"
                            className="mx-[5px] text-text-on-background "
                            onClick={() => handleDeleteTag(idx)}>
                            <img className="w-[11px] h-[11px] object-cover" src={xbtn} alt="delete btn" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 미리보기 탭 */}
          {selectedTab === '미리보기' && (
            <>
              <div className="mx-[20px] my-[20px]">
                <p className="text-primary text-[10px] font-medium pl-[2px]">프롬프트 결과 미리 보기</p>
                <div className="mt-[8px] px-[6px] py-[6px] bg-background rounded-[2px] h-[140px]">
                  <textarea
                    value={previewText}
                    onChange={(e) => setPreviewText(e.target.value)}
                    placeholder="AI의 답변 일부를 작성해주세요"
                    className="w-full h-full bg-transparent outline-none resize-none placeholder:text-text-on-background text-[10px]"
                  />
                </div>
              </div>
            </>
          )}

          {/* 설명 탭 */}
          {selectedTab === '설명' && (
            <>
              <div className="mx-[20px] my-[20px]">
                <p className="text-primary text-[10px] font-medium pl-[2px]">프롬프트 설명 작성</p>
                <div className="mt-[8px] px-[6px] py-[6px] bg-background rounded-[2px] h-[140px]">
                  <textarea
                    value={discriptionText}
                    onChange={(e) => setDescriptionText(e.target.value)}
                    placeholder="프롬프트에 대한 설명을 적어주세요"
                    className="w-full h-full bg-transparent outline-none resize-none placeholder:text-text-on-background text-[10px]"
                  />
                </div>
              </div>
            </>
          )}

          {/* 활용법 탭 */}
          {selectedTab === '활용법' && (
            <>
              <div className="mx-[20px] my-[20px]">
                <p className="text-primary text-[10px] font-medium pl-[2px]">프롬프트 활용법</p>
                <div className="mt-[8px] px-[6px] py-[6px] bg-background rounded-[2px] h-[140px]">
                  <textarea
                    value={howToUseText}
                    onChange={(e) => setHowToUseText(e.target.value)}
                    placeholder="프롬프트 활용법을 적어주세요"
                    className="w-full h-full bg-transparent outline-none resize-none placeholder:text-text-on-background text-[10px]"
                  />
                </div>
              </div>
            </>
          )}

          {/* 하단 버튼 */}
          <div className="fixed inset-x-0 bottom-0 flex justify-center pb-5 z-102">
            <button
              className="w-[280px] h-[40px] rounded-[4px] bg-primary text-white text-[16px] font-medium"
              type="button"
              disabled={!isValidPrice(costInput)}
              onClick={() => {
                if (isValidPrice(costInput)) {
                  setuploadModal(false);
                }
              }}>
              설정 완료하기
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MobileUploadModal;
