import Rating from '@/components/Rating';
import Likes from '@/pages/MainPage/components/likes';
import type { Prompt } from '@/types/MainPage/prompt';
import { useNavigate } from 'react-router-dom';

interface PromptMobileCardProps {
  prompt: Prompt;
}

const PromptMobileCard = ({ prompt }: PromptMobileCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[8px] flex h-[109px] overflow-hidden">
      <div className="w-[109px] relative bg-secondary text-text-on-white text-[6px] font-light leading-[9.6px] tracking-[0.12px]">
        {prompt.images?.[0]?.image_url ? (
          <img src={prompt.images[0].image_url} alt="프롬프트 이미지" className="object-cover w-full h-full" />
        ) : (
          <p className="text-text-on-white text-[6px] font-light leading-[9.6px] tracking-[0.12px] absolute top-[8px] px-[10px] pb-[8px] line-clamp-9 w-full">
            {prompt.prompt_result}
          </p>
        )}

        {/* 좋아요 버튼 */}
        <div className="absolute top-[8px] right-[8px]">
          <Likes prompt_id={prompt.prompt_id} />
        </div>
      </div>

      <div
        onClick={() => navigate(`/prompt/${prompt.prompt_id}`)}
        className="px-[12px] py-[16px] flex flex-col gap-[8px] justify-between flex-1">
        <div className="flex flex-col gap-[4px] text-text-on-white text-[10px]  leading-[14px] tracking-[-0.1px]">
          <div className="font-light">{prompt?.user?.nickname}</div>
          <div className="font-bold">{prompt?.title}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-[12px] font-bold leading-[16.8px] tracking-[-0.12px]">
            {prompt.is_free ? '무료' : `${prompt.price.toLocaleString()}원`}
          </div>

          <div className="self-start">
            <Rating star={prompt.review_rating_avg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptMobileCard;
