import { useAuth } from '@/context/AuthContext';
import React from 'react';
import CategorySection from './components/CategorySection';
import PromptCard from '../../components/PromptCard';

const Prompt = {
  promptId: 1,
  promptImage: null,
  promptDescription:
    '그냥 팥빙수가 아닌, 추억이 담긴 그때의 팥빙수를 드시고 싶으시군요! 그렇다면 이렇게 재료를 준비해서 만들어 보세요! 🍨 클래식 팥빙수 (1인분 / 약 500kcal)  재료  우유얼음 250g (우유 200ml + 연유 20g 얼려 갈기, 약 150kcal)  통조림 단팥 120g (약 220kcal)  인절미 40g (약 100kcal)  아몬드슬라이스 10g (약 60kcal)  연유 15g (약 70kcal)  조리 단계  우유얼음 준비  우유+연유를 얼려둔 얼음을 블렌더에 넣고 눈꽃처럼 갈아줍니다.  1차 층 쌓기  그릇에 얼음 절반 → 단팥 절반 올리기.  2차 층 쌓기  남은 얼음 → 단팥 나머지 올리기.  토핑 올리기  인절',
  promptModels: ['ChatGPT', 'Gemini', 'ChatGPT', 'CHatGPT', 'ChatGPT'],
  promptWriter: '홍길동',
  promptCreatedAt: '2025.11.06',
  promptTitle: '글쓰기 문서 관련 프롬프트',
  promptViews: 2109,
  promptDownloads: 120,
  promptPrice: 0,
  promptContent: '수채화, 수묵화 느낌이 나는 ~~',
  promptRating: 4.0,
  promptReview: '가격도 저렴하고 퀄리티 좋아요. 잘 쓰고 있습니다~~',
};

const NewMainPage = () => {
  return (
    <div className="px-[102px]">
      <div className="py-[40px]">
        <p className="text-3xl text-gray-950 leading-10">프롬프트 보기</p>
        <p className="mt-[12px] text-gray-950 text-base font-light ">
          다양한 ‘프롬프트’가 있는 ‘플레이스’에서 나를 위한 프롬프트를 찾아보세요!
        </p>
      </div>

      <div className="px-[25px] py-[40px]">
        <CategorySection />
      </div>

      <div className="py-[59px]">소분류</div>

      <div>필터</div>

      <div>
        프롬프트 모아보기
        {PromptCard(
          Prompt.promptId,
          Prompt.promptImage,
          Prompt.promptDescription,
          Prompt.promptModels,
          Prompt.promptWriter,
          Prompt.promptCreatedAt,
          Prompt.promptTitle,
          Prompt.promptViews,
          Prompt.promptDownloads,
          Prompt.promptPrice,
          Prompt.promptContent,
          Prompt.promptRating,
          Prompt.promptReview,
        )}
      </div>
    </div>
  );
};

export default NewMainPage;
