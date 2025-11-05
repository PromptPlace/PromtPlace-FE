import { useAuth } from '@/context/AuthContext';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import useGetPrompts from '@/hooks/queries/ProfilePage/useGetPrompts';
import { useNavigate, useParams } from 'react-router-dom';

import TwinkleIcon from '@assets/profile/icon-twinkle.svg?react';
import ArrowIcon from '@assets/icon-arrow-right-black.svg?react';
import PromptGrid from '@/components/PromptGrid';
import { CATEGORY_MAP } from '@/types/ProfilePage/categoryMap';
import type { Prompt } from '@/types/ProfilePage/profile';
import { categoryData } from '@/pages/MainPage/components/categoryData';
import PromptMobileCard from '@/pages/HomePage/components/PromptMobileCard';

const PromptList = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const myId = user.user_id;
  const isMyProfile = id ? Number(id) === myId : false;
  const member_id = isMyProfile ? myId : Number(id);

  const navigate = useNavigate();

  // 회원 정보 불러오기
  const { data: userData } = useGetMember({ member_id });

  // 작성한 프롬프트 목록
  const { data: promptsData } = useGetPrompts({ member_id });

  const allPrompts = promptsData?.pages.flatMap((prompt) => prompt.data) ?? []; // 전체 데이터

  const groupedPrompts = allPrompts.reduce(
    (acc, item) => {
      const subNames = item.categories?.map((category) => category.category.name) ?? [];

      const mainNames = Array.from(new Set(subNames.map((name) => CATEGORY_MAP[name] ?? '')));

      mainNames.forEach((main) => {
        if (!acc[main]) acc[main] = [];
        acc[main].push(item);
      });

      return acc;
    },
    {} as Record<string, Prompt[]>,
  ); // 카테고리별 프롬프트

  const promptCount = promptsData ? promptsData?.pages?.reduce((acc, page) => acc + (page?.data?.length ?? 0), 0) : 0;

  return (
    <div className="mt-[56px]">
      <div className="flex gap-[20px] items-start">
        <p className="custom-h2 max-phone:text-[20px]">{userData?.data.nickname}님이 작성한 프롬프트</p>
        <div className="custom-h5 text-gray500 rounded-[50px] border border-[0.8px] border-gray400 bg-white py-[5px] px-[10px]">
          {promptCount}
        </div>
      </div>

      <div className="mt-[40px] max-phone:hidden">
        {Object.entries(groupedPrompts).map(([category, prompts], idx) => (
          <div className="flex flex-col mb-[20px]" key={idx}>
            <div
              className="flex gap-[13px] items-center cursor-pointer"
              onClick={() => {
                const matched = categoryData.find((c) => c.name === category);
                if (matched) {
                  navigate(`/prompt?categoryId=${matched.id}&categoryName=${encodeURIComponent(category)}`);
                }
              }}>
              <p>{category}</p>
              <ArrowIcon />
            </div>

            {/* @ts-expect-error 타입 통일 예정 */}
            <PromptGrid prompts={prompts} />
          </div>
        ))}
      </div>

      <div className="phone:hidden mt-[40px] max-phone:mt-[20px] pb-[24px]">
        <div className="flex flex-col gap-[8px]">
          {Object.entries(groupedPrompts)?.map(([category, prompts], idx) => (
            <div className="flex flex-col mb-[20px]" key={idx}>
              <div
                className="flex gap-[13px] items-center cursor-pointer"
                onClick={() => {
                  const matched = categoryData.find((c) => c.name === category);
                  if (matched) {
                    navigate(`/prompt?categoryId=${matched.id}&categoryName=${encodeURIComponent(category)}`);
                  }
                }}>
                <p>{category}</p>
                <ArrowIcon />
              </div>

              <div className="mt-[16px] flex flex-col gap-[8px]">
                {prompts?.map((prompt) => (
                  // @ts-expect-error 타입 통일 예정
                  <PromptMobileCard key={prompt.prompt_id} prompt={prompt} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {promptCount === 0 && (
        <div className="mt-[80px] flex flex-col justify-center items-center gap-[20px] max-phone:mt-[64px]">
          <TwinkleIcon />
          <div className="custom-h3 text-gray500 flex flex-col gap-[8px] items-center">
            <p className="max-phone:text-[14px]">아직 올린 프롬프트가 없어요!</p>
            <p className="max-phone:text-[10px]">다음에 확인해주세요.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptList;
