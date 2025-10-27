import React from 'react';
import iconEye from '@/assets/icon-eye.svg';
import iconDownload from '@/assets/icon-download-gray.svg';
import Rating from './Rating';
import Likes from '@/pages/MainPage/components/likes';

const PromptCard = (
  promptId: number,
  promptImage: string,
  promptDescription: string,
  promptModels: string[],
  promptWriter: string,
  promptCreatedAt: string,
  promptTitle: string,
  promptViews: number,
  promptDownloads: number,
  promptPrice: number,
  promptContent: string,
  promptRating: number,
  promptReview: string,
) => {
  return (
    <div className="w-[294px] h-[533px] rounded-lg bg-white">
      <div className="relative self-stretch w-full h-[263px] bg-secondary">
        {promptImage ? (
          <img src={promptImage} alt="프롬프트 이미지" className="w-full h-full object-cover rounded-t-lg" />
        ) : (
          <p className="absolute w-[246.25px] h-[215px] left-6 top-6 flex items-center justify-center text-sm text-gray-600 whitespace-pre-line truncate">
            {promptDescription}
          </p>
        )}
        {/* 모델 칩 컨테이너 */}
        <div className="absolute bottom-4 left-4 w-[calc(100%-32px)] flex flex-wrap gap-2 z-10">
          {promptModels.map((model, index) => (
            <div key={index} className="px-2 py-0.5 bg-overlay/40 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-medium leading-4">{model}</span>
            </div>
          ))}
        </div>

        <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center cursor-pointer">
          <Likes
            prompt={
              {
                id: promptId,
                user_id: promptWriter,
                title: promptTitle,
                prompt: promptDescription,
                prompt_result: promptContent,
                image: promptImage,
                models: promptModels,
                created_at: promptCreatedAt,
                views: promptViews,
                downloads: promptDownloads,
                price: promptPrice,
                rating: promptRating,
                review: promptReview,
              } as any
            }
          />
        </div>
      </div>
      <div className="w-full h-[270px] px-6 py-5 inline-flex flex-col justify-start gap-3">
        <div className="text-xs font-light leading-4 inline-flex justify-between items-start self-stretch">
          <div>{promptWriter}</div>
          <div>{promptCreatedAt}</div>
        </div>

        <div className="font-medium">{promptTitle}</div>

        <div className="flex items-center justify-start gap-[12px] text-gray-400 font-xs leading-4">
          <div className="flex items-center justify-start gap-[6px]">
            <img src={iconEye} alt="views" className="w-4 h-4" /> {promptViews}
          </div>

          <div className="flex items-center justify-start gap-[6px]">
            <img src={iconDownload} alt="downloads" className="w-4 h-4" /> {promptDownloads}
          </div>
        </div>

        <div className="text-lg leading-6">{promptPrice == 0 ? '무료' : `${promptPrice}원`}</div>
        <div className="text-xs font-light h-[51px] truncate">{promptContent}</div>
        <div className="self-start">
          <Rating star={promptRating} />
        </div>
        <div className="text-xs font-light text-gray-400 w-full truncate">{promptReview}</div>
      </div>
    </div>
  );
};

export default PromptCard;
