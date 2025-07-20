import sample1 from '../assets/sample1.png';
import sample2 from '../assets/sample2.png';

interface Props {
  promptResult: string;
  description: string;
  usageGuide: string;
}

const PromptInfo = ({ promptResult, description, usageGuide }: Props) => {
  return (
    <div className="w-[711px] bg-[#FFFEFB] px-8 max-h-[736px] overflow-y-auto rounded-[16px]">
      {/* 결과 미리 보기 */}
      <section className="shrink-0">
        <h4 className="font-semibold text-[24px] pt-[15px]">프롬프트 결과 미리 보기</h4>
        <div className="flex pt-[15px] gap-[10px] opacity-100" style={{ width: '447px', height: '174px' }}>
          <img src={sample1} alt="sample1" className="rounded w-[218.5px] h-[174px] object-cover" />
          <img src={sample2} alt="sample2" className="rounded w-[218.5px] h-[174px] object-cover" />
        </div>
      </section>

      <div className="h-[1px] bg-[#CCCCCC] w-full my-[20px]" />

      {/* 프롬프트 설명 */}
      <section>
        <h4 className="font-semibold text-[24px]">프롬프트 설명</h4>
        <div className="font-normal text-[16px] pt-[15px] whitespace-pre-line">{description}</div>
      </section>

      <div className="h-[1px] bg-[#CCCCCC] w-full my-[20px]" />

      {/* 프롬프트 활용법 */}
      <section>
        <h4 className="font-semibold text-[24px]">프롬프트 활용법</h4>
        <div className="font-normal pt-[15px] text-[16px] whitespace-pre-line">{usageGuide}</div>
        <p className="text-[16px] font-medium pt-[10px] pb-[20px] text-blue-500 underline cursor-pointer">
          해당 프롬프트를 구매하고 마저 확인하세요
        </p>
      </section>
    </div>
  );
};

export default PromptInfo;
