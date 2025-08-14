import { useEffect, useRef, useState } from 'react';
import { LuChevronLeft } from 'react-icons/lu';
import ModelDropdown from './ModelDropdown';
import PriceDropdown from './PriceDropdown';
import TagInput from './TagInput';

import IconButton from '@/components/Button/IconButton';

const UploadModal = ({
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
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const inputImgRef = useRef<HTMLInputElement | null>(null);
  //금액 선택 완료 여부
  const isSummary = !!(
    selectedModels.length > 0 &&
    priceType &&
    (priceType === '무료' || (priceType === '유료' && cost !== null))
  );

  // useEffect(() => {
  //   console.log(tags);
  // }, [tags]);

  // 이미지 업로드
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

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-overlay" onClick={() => setuploadModal(false)} />
      <div className="relative w-full max-w-[994px] h-full max-h-[922px] py-[55px] bg-white rounded-[16px] z-10">
        {/* 헤더 */}
        <div>
          <div
            className="flex items-center gap-[10px] w-[220px] h-[50px] p-[10px] ml-[20px]"
            onClick={() => setuploadModal(false)}>
            <LuChevronLeft size={24} />
            <span className="text-[var(--color-text-on-white)] font-bold text-[24px]">업로드 세부 설정</span>
          </div>
        </div>
        {/* 본문 */}
        <div className="flex flex-col w-full max-w-[846px] ml-[82px] mb-[10px] mt-[30px] ">
          <div className="flex items-center gap-4">
            <ModelDropdown
              selectedModels={selectedModels}
              setSelectedModels={setSelectedModels}
              isOpen={showModelDropdown}
              setIsOpen={setShowModelDropdown}
              isSummary={isSummary}
            />
            <PriceDropdown
              priceType={priceType}
              setPriceType={setPriceType}
              cost={cost}
              setCost={setCost}
              isOpen={showPriceDropdown}
              setIsOpen={setShowPriceDropdown}
              onComplete={() => setShowPriceDropdown(false)}
              isSummary={isSummary}
            />
            <TagInput tags={tags} setTags={setTags} />
          </div>
          {/*프롬프트 결과 미리보기*/}
          <div>
            <div className="w-full max-w-[845px] h-full max-h-[200px]">
              <div className="flex items-center gap-2 font-semibold text-[16px]">
                프롬프트 결과 미리 보기 <span className="text-alert">*</span>
              </div>
              <div
                className="mt-[16px] pt-[20px] px-[24px] pb-[11px] bg-gray-100 rounded-lg w-full max-w-[845px] h-[150px] overflow-y-auto"
                style={{
                  boxShadow: 'inset 0px 2px 4px 0px rgba(0,0,0,0.05)',
                }}>
                <textarea
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="미리 공개할 프롬프트 결과 일부를 입력해 주세요"
                  className="w-full h-full max-h-[110px] bg-transparent outline-none resize-none placeholder:text-gray-400 text-[15px] mt-[4px] overflow-scroll"
                />
              </div>
            </div>
          </div>
          {/*프롬프트 설명*/}
          <div className="mt-[28px]">
            <div className="flex items-center gap-2 font-semibold text-[16px]">
              프롬프트 설명 <span className="text-alert">*</span>
            </div>
            <div className="mt-[16px] pt-[24px] px-[24px] pb-[11px] bg-background rounded-[8px] h-[150px]">
              <textarea
                value={discriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                placeholder="프롬프트에 대한 설명을 적어주세요"
                className="w-full h-full bg-transparent outline-none resize-none placeholder:text-text-on-background text-[18px] mt-1"
              />
            </div>
            {/*프롬프트 활용법*/}
            <div className="mt-[28px]">
              <div className="flex items-center gap-2 font-semibold text-[16px]">프롬프트 활용법</div>
              <div className="mt-[16px] pt-[24px] px-[24px] pb-[11px] bg-background rounded-[8px] h-[150px]">
                <textarea
                  value={howToUseText}
                  onChange={(e) => setHowToUseText(e.target.value)}
                  placeholder="프롬프트 활용법을 적어주세요"
                  className="w-full h-full bg-transparent outline-none resize-none placeholder:text-text-on-background text-[18px] mt-1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-15 left-197 bg-white rounded-[50px]">
          <IconButton
            buttonType="round"
            style="outline"
            imgType="settings"
            text="설정 완료"
            onClick={() => setuploadModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
