import PromptCard from '@/components/PromptCard';
import useGetPromptList from '@/hooks/queries/MainPage/useGetPromptList';
import PromptMobileCard from './PromptMobileCard';

const RecommnedPrompts = () => {
  const { data } = useGetPromptList();

  const top8Lists = [2119, 2118, 2120];
  const displayData = data?.data.filter((prompt) => top8Lists.includes(prompt.prompt_id)).slice(0, 8);

  return (
    <div className="mt-[104px] mb-[72px] max-phone:mb-[56px]">
      <div className="px-[102px] max-lg:px-[40px] max-phone:px-[20px]">
        <p className="custom-h2 max-phone:text-[20px]">관리자가 추천하는 프롬프트 TOP8</p>
      </div>

      <div className="max-phone:hidden mt-[40px] max-phone:mt-[20px] overflow-x-auto pl-[102px] pb-[24px] max-lg:pl-[40px] max-phone:px-[20px]">
        <div className="grid grid-cols-4 overflow-x-auto gap-[20px] min-w-[1236px] ">
          {displayData?.map((prompt) => (
            <PromptCard key={prompt.prompt_id} prompt={prompt} />
          ))}
        </div>
      </div>

      <div className="phone:hidden mt-[40px] max-phone:mt-[20px] pl-[102px] pb-[24px] max-lg:pl-[40px] max-phone:px-[20px]">
        <div className="flex flex-col gap-[8px]">
          {displayData?.map((prompt) => (
            <PromptMobileCard key={prompt.prompt_id} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommnedPrompts;
