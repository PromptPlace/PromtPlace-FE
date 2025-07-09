import sample1 from '../assets/sample1.png';
import sample2 from '../assets/sample2.png';

interface Props {
  promptResult: string;
  description: string;
  usageGuide: string;
}

const PromptInfo = ({ promptResult, description, usageGuide }: Props) => {
  return (
    <div className="space-y-6 w-[711px]">
      {/* 결과 미리 보기 */}
      <section className="h-[264px]">
        <h4 className="font-semibold text-lg mb-2">프롬프트 결과 미리 보기</h4>
        <div className="flex gap-[10px] opacity-100" style={{ width: '447px', height: '174px' }}>
          <img src={sample1} alt="sample1" className="rounded w-[218.5px] h-[174px] object-cover" />
          <img src={sample2} alt="sample2" className="rounded w-[218.5px] h-[174px] object-cover" />
        </div>
      </section>

      <div className="h-[1px] bg-[#CCCCCC] w-full" />

      {/* 프롬프트 설명 */}
      <section className="h-[130px] overflow-hidden">
        <h4 className="font-semibold text-lg mb-2">프롬프트 설명</h4>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">{description}</pre>
      </section>

      <div className="h-[1px] bg-[#CCCCCC] w-full" />

      {/* 프롬프트 활용법 */}
      <section className="h-[210px] overflow-hidden">
        <h4 className="font-semibold text-lg mb-2">프롬프트 활용법</h4>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">{usageGuide}</pre>
      </section>

      <p className="text-sm text-blue-500 underline cursor-pointer">해당 프롬프트를 구매하고 마저 확인하세요</p>

      <div className="h-[1px] bg-[#CCCCCC] w-full" />
    </div>
  );
};

export default PromptInfo;
