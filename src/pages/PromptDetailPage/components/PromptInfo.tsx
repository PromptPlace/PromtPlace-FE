import sample1 from '../assets/sample1.png';
import sample2 from '../assets/sample2.png';
import { useParams } from 'react-router-dom';
import useGetPromptDetail from '@/hooks/queries/PromptDetailPage/useGetPromptDetail';

interface Props {
  description?: string;
  usageGuide?: string;
}

const PromptInfo = ({ description: descProp, usageGuide: usageProp }: Props) => {
  const { id } = useParams<{ id: string }>();
  const promptId = Number(id);
  const { data, isLoading } = useGetPromptDetail(promptId, { enabled: Number.isFinite(promptId) });

  const description = descProp ?? data?.description ?? '';
  const usageGuide = usageProp ?? data?.usage_guide ?? '';

  const images: string[] = Array.isArray(data?.images) ? data!.images!.slice(0, 2) : [];
  const hasImages = images.length > 0;

  return (
    <div className="w-[711px] max-lg:max-w-[280px] max-lg:max-h-[353px] max-lg:overflow-hidden bg-[#FFFEFB] px-8 max-h-[736px] overflow-y-auto rounded-[16px] max-lg:p-[12px]">
      {/* 결과 미리 보기 */}
      <section className="shrink-0 max-lg:h-[123px]">
        <h4 className="font-semibold text-[24px] pt-[15px] max-lg:text-[12px] max-lg:pt-[0px]">
          프롬프트 결과 미리 보기
        </h4>

        <div className="w-[447px] h-[174px] flex pt-[15px] gap-[10px] overflow-hidden opacity-100 max-lg:gap-[4px] max-lg:pt-[8px] max-lg:w-[256px] max-lg:h-[100px]">
          {hasImages ? (
            images.map((url, i) => (
              <img
                key={url + i}
                src={url}
                alt={`prompt-preview-${i + 1}`}
                className="rounded w-[218.5px] h-[174px] object-cover max-lg:w-1/2 max-lg:h-[100px] max-lg:object-contain"
              />
            ))
          ) : (
            <>
              <img
                src={sample1}
                alt="sample1"
                className="rounded w-[218.5px] h-[174px] object-cover max-lg:w-1/2 max-lg:h-[100px] max-lg:object-contain"
              />
              <img
                src={sample2}
                alt="sample2"
                className="rounded w-[218.5px] h-[174px] object-cover max-lg:w-1/2 max-lg:h-[100px] max-lg:object-contain"
              />
            </>
          )}
        </div>
      </section>

      <div className="h-[1px] bg-[#CCCCCC] w-full my-[20px] max-lg:mt-[12px] max-lg:p-0 max-lg:mb-0" />

      {/* 프롬프트 설명 */}
      <section className="max-lg:h-[61px]">
        <h4 className="font-semibold text-[24px]  max-lg:text-[12px] max-lg:pt-[12px]">프롬프트 설명</h4>
        <div className="font-normal text-[16px] pt-[15px] whitespace-pre-line  max-lg:text-[10px] max-lg:pt-[8px]">
          {isLoading ? '불러오는 중…' : description}
        </div>
      </section>

      <div className="h-[1px] bg-[#CCCCCC] w-full my-[20px]  max-lg:mt-[12px] max-lg:p-0 max-lg:mb-0" />

      {/* 프롬프트 활용법 */}
      <section className="max-lg:h-[133px]">
        <h4 className="font-semibold text-[24px] max-lg:text-[12px] max-lg:pt-[12px]">프롬프트 활용법</h4>
        <div className="font-normal pt-[15px] text-[16px] max-lg:text-[10px] max-lg:pt-[8px] whitespace-pre-line line-clamp-4">
          {isLoading ? '불러오는 중…' : usageGuide}
        </div>
        <p className="text-[16px] font-medium pt-[10px] max-lg:font-normal pb-[20px] text-primary underline max-lg:text-[10px] max-lg:pt-[8px]  max-lg:pb-[8px] cursor-pointer">
          해당 프롬프트를 구매하고 마저 확인하세요
        </p>
      </section>
    </div>
  );
};

export default PromptInfo;
