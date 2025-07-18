import React, { useState } from 'react';
import type { Creator } from '@/types/prompt.ts';
import FollowButton from '@/components/Button/FollowButton';
import profileImage from '@/assets/icon-profile-gray.svg';

const PrompterBar = ({ creators }: { creators: Creator[] }) => {
  const [ isFollowed, setIsFollowed ] = useState<Record<number, boolean>>(
    () => creators.reduce((acc, creator) => {
      acc[creator.id] = creator.followed;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const handleFollow = (id:number) => {
    setIsFollowed(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
    // 팔로우 기능 서버 연동
  }

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
                  src={c.avatar ? c.avatar : profileImage}
                  alt={c.name}
                  className="size-8 rounded-full object-cover"
                />
                <div className="text-sm">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-gray-500">팔로워 {c.followers}명</p>
                </div>
              </div>
              <FollowButton 
                follow={isFollowed[c.id]}
                onClick={() => {
                  handleFollow(c.id);
                }}
              >
                {isFollowed[c.id] ? '완료 ✔' : '팔로우 +'}
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
                  src={c.avatar ? c.avatar : profileImage}
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
                  handleFollow();
                }}
              >
                {isFollowed ? '완료 ✔' : '팔로우 +'}
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
