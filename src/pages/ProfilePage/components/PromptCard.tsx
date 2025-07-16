import HeartEmpty from '@assets/icon-heart-none-small.svg';
import HeartBlue from '@assets/icon-heart-blue-small.svg';
import { useState } from 'react';

interface PrompCardProps {
  title: string;
  model: string;
  tags: { tag_id: number; name: string }[];
}

const PromptCard = ({ title, model, tags }: PrompCardProps) => {
  const [isLike, setIsLike] = useState(false);

  return (
    <div className="bg-white border-b border-b-white-stroke py-[10px] flex justify-between">
      <div className="text-text-on-white text-[22px] font-bold leading-[28px] py-[20px] px-[80px]">{title}</div>
      <div className="text-text-on-background text-[20px] font-medium leading-[25px] py-[20px] px-[10px]">{model}</div>
      <div className="flex gap-[1px] py-[20px] px-[10px]">
        {tags.map((tag) => (
          <div id={String(tag.tag_id)} className="text-text-on-background text-[20px] font-medium leading-[25px]">
            #{tag.name}
          </div>
        ))}
      </div>

      <div onClick={() => setIsLike((prev) => !prev)} className="py-[25px] px-[45px] cursor-pointer w-[115px] h-[72px]">
        <img src={isLike ? HeartBlue : HeartEmpty} alt="좋아요" />
      </div>
    </div>
  );
};

export default PromptCard;
