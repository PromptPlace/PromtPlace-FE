import { useState } from 'react';
import PromptCard from '@/components/PromptCard';
import useGetPromptList from '@/hooks/queries/MainPage/useGetPromptList';
import PromptMobileCard from './PromptMobileCard';

import ArrowIcon from '@/assets/icon-arrow-down.svg?react';

const RecommnedPrompts = () => {
  const { data } = useGetPromptList();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const top8Lists = [2381, 2273, 2383, 2380, 2357, 2272, 2384, 2295];
  const displayData = data?.data.filter((prompt) => top8Lists.includes(prompt.prompt_id)).slice(0, 8);
  const mobileDisplayData = isMobileExpanded ? displayData : displayData?.slice(0, 4);

  return (
    <div className="mt-[104px] mb-[72px] max-phone:mb-[56px]">
      <div className="w-full px-[102px] max-lg:px-[40px] max-phone:px-[20px]">
        <div className="mx-auto w-full max-w-[1236px]">
          <p className="custom-h2 max-phone:text-[20px]">관리자가 추천하는 프롬프트 TOP 8</p>

          <div className="max-phone:hidden mt-[40px] -ml-[102px] w-[calc(100%+204px)] overflow-x-auto pb-[24px] pl-[102px] pr-[102px] max-lg:-ml-[40px] max-lg:w-[calc(100%+80px)] max-lg:pl-[40px] max-lg:pr-[40px]">
            <div className="grid w-[1236px] shrink-0 grid-cols-4 gap-[20px]">
              {displayData?.map((prompt) => (
                <PromptCard key={prompt.prompt_id} prompt={prompt} />
              ))}
            </div>
          </div>

          <div className="phone:hidden mt-[40px] max-phone:mt-[20px] pb-[24px]">
            <div className="flex flex-col gap-[8px]">
              {mobileDisplayData?.map((prompt) => (
                <PromptMobileCard key={prompt.prompt_id} prompt={prompt} />
              ))}
            </div>
            {(displayData?.length ?? 0) > 4 && (
              <button
                type="button"
                onClick={() => setIsMobileExpanded((expanded) => !expanded)}
                className="mt-4 w-full rounded-md border border-white-stroke py-3 custom-button1 text-text-on-white">
                {isMobileExpanded ? '접기' : '더보기'}
                <ArrowIcon
                  className={`ml-2 inline-block text-text-on-white transition-transform duration-300 ${
                    isMobileExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommnedPrompts;
