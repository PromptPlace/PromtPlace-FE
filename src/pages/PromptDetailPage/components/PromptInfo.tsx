import sample1 from '../assets/sample1.png';
import sample2 from '../assets/sample2.png';

interface Props {
  promptResult: string;
  description: string;
  usageGuide: string;
}

const PromptInfo = ({ promptResult, description, usageGuide }: Props) => {
  return (
<<<<<<< HEAD
    <div className="w-[711px]  bg-[#FFFEFB] px-8">
      {/* 결과 미리 보기 */}
      <section className="h-[264px]">
        <h4 className="font-semibold text-[24px] pt-[15px]">프롬프트 결과 미리 보기</h4>
        <div className="flex pt-[15px] gap-[10px] opacity-100" style={{ width: '447px', height: '174px' }}>
=======
    <div className="space-y-6 w-[711px]">
      {/* 결과 미리 보기 */}
      <section className="h-[264px]">
        <h4 className="font-semibold text-lg mb-2">프롬프트 결과 미리 보기</h4>
        <div className="flex gap-[10px] opacity-100" style={{ width: '447px', height: '174px' }}>
>>>>>>> d54627e (✨ Feat: 상세보기 1차 왼쪽 UI (#10))
          <img src={sample1} alt="sample1" className="rounded w-[218.5px] h-[174px] object-cover" />
          <img src={sample2} alt="sample2" className="rounded w-[218.5px] h-[174px] object-cover" />
        </div>
      </section>

      <div className="h-[1px] bg-[#CCCCCC] w-full" />

      {/* 프롬프트 설명 */}
      <section className="h-[130px] overflow-hidden">
<<<<<<< HEAD
        <h4 className="font-semibold pt-[15px] text-[24px]">프롬프트 설명</h4>
        <div className="font-normal text-[16px] pt-[15px] whitespace-pre-line">{description}</div>
=======
        <h4 className="font-semibold text-lg mb-2">프롬프트 설명</h4>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">{description}</pre>
>>>>>>> d54627e (✨ Feat: 상세보기 1차 왼쪽 UI (#10))
      </section>

      <div className="h-[1px] bg-[#CCCCCC] w-full" />

      {/* 프롬프트 활용법 */}
      <section className="h-[210px] overflow-hidden">
<<<<<<< HEAD
        <h4 className="font-semibold text-[24px] pt-[15px]">프롬프트 활용법</h4>
        <div className="font-normal pt-[15px] text-[16px] whitespace-pre-line">{usageGuide}</div>

        <p className="text-[16px] font-medium  pt-[10px] pb-[10px] text-blue-500 underline cursor-pointer">
          해당 프롬프트를 구매하고 마저 확인하세요
        </p>
      </section>
=======
        <h4 className="font-semibold text-lg mb-2">프롬프트 활용법</h4>
        <pre className="whitespace-pre-wrap text-sm text-gray-700">{usageGuide}</pre>
      </section>

      <p className="text-sm text-blue-500 underline cursor-pointer">해당 프롬프트를 구매하고 마저 확인하세요</p>

      <div className="h-[1px] bg-[#CCCCCC] w-full" />
>>>>>>> d54627e (✨ Feat: 상세보기 1차 왼쪽 UI (#10))
    </div>
  );
};

export default PromptInfo;
