import ModelChip from '@/components/ModelChip';
import Likes from '@/pages/MainPage/components/likes';
import type { Prompt } from '@/types/MainPage/prompt';
import { useNavigate } from 'react-router-dom';

import EyeIcon from '@/assets/icon-eye.svg?react';
import DownloadIcon from '@/assets/icon-download-gray.svg?react';
import StarIcon from '@assets/icon-star-fill.svg?react';

interface PromptMobileCardProps {
  prompt: Prompt;
}

const PromptMobileCard = ({ prompt }: PromptMobileCardProps) => {
  const navigate = useNavigate();

  const MAX_MODEL_CHIPS = 1;
  const visibleModelCount = MAX_MODEL_CHIPS;
  const visibleModels = prompt.models.slice(0, visibleModelCount);
  const hiddenModelCount = prompt.models.length - visibleModels.length;

  return (
    <div
      onClick={() => navigate(`/prompt/${prompt.prompt_id}`)}
      className="group bg-white rounded-2xl flex gap-3 h-[142px] overflow-hidden p-3 hover:cursor-pointer shadow-card">
      <div className="size-[118px] relative bg-secondary text-text-on-white custom-caption2 rounded-lg overflow-hidden flex-shrink-0">
        {prompt.images?.[0]?.image_url ? (
          <img
            src={prompt.images[0].image_url}
            alt="프롬프트 이미지"
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full py-2 pl-2 pr-8">
            <p className="line-clamp-5">{prompt.prompt_result}</p>
          </div>
        )}

        {/* 모델 칩 컨테이너 */}
        <div className="absolute left-2 bottom-2 flex flex-wrap gap-1 z-10">
          {visibleModels.map((model, index) => (
            <ModelChip key={index} label={model?.model?.name ?? ''} hasImage={Boolean(prompt.images?.length)} />
          ))}
          {hiddenModelCount > 0 && (
            <ModelChip key="overflow" label={`+${hiddenModelCount}`} hasImage={Boolean(prompt.images?.length)} />
          )}
        </div>

        {/* 좋아요 버튼 */}
        <div className="absolute top-[8px] right-[8px] size-[20px]">
          <Likes prompt_id={prompt.prompt_id} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between custom-body3 text-text-muted">
          <div>{prompt?.user?.nickname}</div>
          <div>{new Date(prompt.created_at).toLocaleDateString('ko-KR')}</div>
        </div>

        <div className="custom-button1 text-text-on-white line-clamp-1">{prompt?.title}</div>
        <div className="custom-body3 text-text-on-white line-clamp-1">{prompt?.description}</div>

        <div className="custom-button1">{prompt.is_free ? '무료' : `${prompt.price.toLocaleString()}원`}</div>

        <div className="flex justify-between items-center">
          {/* 별점 */}
          <div className="gap-1 flex items-center">
            <StarIcon className="size-4" />
            <p className="custom-body3">{prompt.review_rating_avg.toFixed(1)}</p>
            <p className="custom-body3 text-text-muted">({prompt.review_count})</p>
          </div>

          {/* 조회수 및 다운로드 수 */}
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-start gap-1 custom-button2 text-text-muted">
              <EyeIcon className="w-4 h-4 text-text-tertiary" /> {prompt.views}
            </div>

            <div className="flex items-center justify-start gap-1 custom-button2 text-text-muted">
              <DownloadIcon className="w-4 h-4 text-text-tertiary" /> {prompt.downloads}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptMobileCard;
