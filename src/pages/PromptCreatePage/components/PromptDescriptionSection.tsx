interface PromptDescriptionSectionProps {
  description: string;
  setDescription: (value: string) => void;
  usageGuide: string;
  setUsageGuide: (value: string) => void;
}

const PromptDescriptionSection = ({
  description,
  setDescription,
  usageGuide,
  setUsageGuide,
}: PromptDescriptionSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* 한줄 소개 */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-medium">한줄 소개</p>
          <p className="text-[12px] font-light text-gray700">프롬프트에 대한 한줄 소개를 작성해주세요.</p>
        </div>

        <div className="w-full py-[12px] px-[16px] bg-gray50 rounded-[8px]">
          <input
            className="w-full text-[14px] font-light bg-gray50 rounded-[8px] placeholder:text-gray-400 outline-none"
            placeholder="예) SNS 광고에 활용 가능한 카피 문구 생성 프롬프트입니다!"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={100}
          />
        </div>
      </div>

      {/* 상세 설명 */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-medium">상세 설명</p>
          <p className="text-[12px] font-light text-gray700">
            프롬프트에 대한 상세 설명, 활용법 등을 자유롭게 작성해주세요.
          </p>
        </div>

        <div className="h-[262px] w-full py-[12px] px-[16px] bg-gray50 rounded-[8px]">
          <textarea
            className="w-full h-[240px] text-[14px] font-light placeholder:text-gray-400 resize-none outline-none"
            placeholder={`예) [ ]부분은 직접 채워서 사용하세요
톤앤매너를 바꿔가며 카피 스타일 다양화 (예: "유머러스하게", "프리미엄스럽게")
글자 수 제한을 없애면 블로그/랜딩페이지용 문구에도 확장 가능`}
            value={usageGuide}
            onChange={(e) => setUsageGuide(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptDescriptionSection;
