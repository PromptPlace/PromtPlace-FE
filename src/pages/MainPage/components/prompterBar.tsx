import React from 'react';
import type { Creator } from '@/types/prompt.ts';
import FollowButton from '@/components/Button/FollowButton';

const PrompterBar = ({ creators }: { creators: Creator[] }) => {
  return (
    <aside className="flex flex-col gap-6 mt-[17px] w-[313px]">
      {/* 🔥 이달의 인기 프롬프터 */}
      <section className="w-[313px] rounded-2xl p-4 shadow-sm bg-white">
        <h4 className="border-b pb-2 font-semibold text-[16px] flex items-center gap-1">
          이달의 인기 프롬프터 <span>🔥</span>
        </h4>
        <ul className="mt-4 space-y-4">
          {creators.slice(0, 4).map((c) => (
            <li key={c.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="size-8 rounded-full object-cover"
                />
                <div className="text-sm">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-gray-500">팔로워 {c.followers}명</p>
                </div>
              </div>
              <FollowButton 
                follow={c.followed}
                onClick={() => {
                  // 버튼 클릭 시 팔로우/언팔로우 로직 처리
                }}
              >
                {c.followed ? '완료 ✔' : '팔로우 +'}
              </FollowButton>
            </li>
          ))}
        </ul>
      </section>

      {/* ⭐ 신규 인기 프롬프터 */}
      <section className="w-[313px] rounded-2xl p-4 shadow-sm bg-white">
        <h4 className="border-b pb-2 font-semibold text-[16px] flex items-center gap-1">
          신규 인기 프롬프터 <span>⭐</span>
        </h4>
        <ul className="mt-4 space-y-4">
          {creators.slice(4, 6).map((c) => (
            <li key={c.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="size-8 rounded-full object-cover"
                />
                <div className="text-sm">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-gray-500">팔로워 {c.followers}명</p>
                </div>
              </div>
              <FollowButton 
                follow={c.followed}
                onClick={() => {
                  // 버튼 클릭 시 팔로우/언팔로우 로직 처리
                }}
              >
                {c.followed ? '완료 ✔' : '팔로우 +'}
              </FollowButton>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-[313px] rounded-2xl p-4 shadow-sm bg-white">
        <h4 className="border-b pb-2 font-semibold text-[16px] flex items-center gap-1">
          프롬프트 작성 가이드라인
        </h4>
        <div>
          <button>
            보러가기
          </button>
        </div>
      </section>

    </aside>
  );
};

export default PrompterBar;
