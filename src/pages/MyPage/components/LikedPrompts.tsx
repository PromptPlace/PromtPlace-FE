import PromptCard from '@/components/PromptCard';
import { useGetLikedPrompts } from '@/hooks/queries/MyPage/useGetPrompts';
import PromptMobileCard from '@/pages/HomePage/components/PromptMobileCard';

const LikedPrompts = () => {
  const { data: likedPromptsData } = useGetLikedPrompts();

  return (
    <div className="flex flex-col gap-[40px]">
      <p className="custom-h2 max-phone:text-[20px]">찜한 프롬프트</p>

      <div className="max-phone:hidden mt-[40px] max-phone:mt-[20px] overflow-x-auto pb-[24px]">
        <div className="grid grid-cols-4 overflow-x-auto gap-[20px] min-w-[1236px] ">
          {/* @ts-expect-error: prompt가 없을 수도 있어서 발생하는 타입 오류 */}
          {likedPromptsData?.data.data?.map((prompt) => (
            <PromptCard key={prompt.prompt_id} prompt={prompt} />
          ))}
        </div>
      </div>

      <div className="phone:hidden mt-[40px] max-phone:mt-[20px] pl-[102px] pb-[24px] max-lg:pl-[40px] max-phone:px-[20px]">
        <div className="flex flex-col gap-[8px]">
          {/* @ts-expect-error: prompt가 없을 수도 있어서 발생하는 타입 오류 */}
          {likedPromptsData?.data.data?.map((prompt) => (
            <PromptMobileCard key={prompt.prompt_id} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikedPrompts;
