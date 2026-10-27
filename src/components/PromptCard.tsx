import Likes from '@/pages/MainPage/components/likes';
import { useNavigate } from 'react-router-dom';
import type { Prompt } from '@/types/MainPage/prompt';
import ModelChip from './ModelChip';

import EyeIcon from '@/assets/icon-eye.svg?react';
import DownloadIcon from '@/assets/icon-download-gray.svg?react';
import StarIcon from '@assets/icon-star-fill.svg?react';

interface PromptCardProps {
  prompt: Prompt;
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  const navigate = useNavigate();

  const MAX_MODEL_CHIPS = 3;
  const visibleModelCount = MAX_MODEL_CHIPS;
  const visibleModels = prompt.models.slice(0, visibleModelCount);
  const hiddenModelCount = prompt.models.length - visibleModels.length;

  return (
    <div
      className="group w-[294px] h-[495px] rounded-3xl hover:cursor-pointer p-3 bg-white flex flex-col gap-2.5"
      onClick={() => navigate(`/prompt/${prompt.prompt_id}`)}>
      {/* 이미지 */}
      <div className="relative w-full h-[260px] bg-secondary rounded-xl overflow-hidden flex-shrink-0">
        {prompt.images?.[0]?.image_url ? (
          <img
            src={prompt.images[0].image_url}
            alt="프롬프트 이미지"
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full py-4 pl-4 pr-14">
            <p className="text-text-on-white custom-body2 line-clamp-9">{prompt.prompt_result}</p>
          </div>
        )}

        {/* 모델 칩 컨테이너 */}
        <div className="absolute left-4 bottom-4 flex flex-wrap gap-2 z-10">
          {visibleModels.map((model, index) => (
            <ModelChip key={index} label={model?.model?.name ?? ''} hasImage={Boolean(prompt.images?.length)} />
          ))}
          {hiddenModelCount > 0 && (
            <ModelChip key="overflow" label={`+${hiddenModelCount}`} hasImage={Boolean(prompt.images?.length)} />
          )}
        </div>

        {/* 좋아요 버튼 */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 flex items-center justify-center cursor-pointer pointer-events: none">
          <Likes prompt_id={prompt.prompt_id} />
        </div>
      </div>

      <div className="w-full px-2 py-1 inline-flex flex-col justify-start gap-3">
        <div>
          <div className="custom-h5 min-h-[45px] line-clamp-2">{prompt.title}</div>
          <div className="custom-body3 min-h-[34px] line-clamp-2">{prompt.description}</div>
        </div>

        <div className="custom-h4">{prompt.is_free ? '무료' : `${prompt.price.toLocaleString()}원`}</div>

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

        <div className="custom-body3 inline-flex justify-between items-start self-stretch text-text-muted bg-background py-2 px-3 rounded-lg">
          <div>{prompt?.user?.nickname}</div>
          <div>{new Date(prompt.created_at).toLocaleDateString('ko-KR')}</div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
