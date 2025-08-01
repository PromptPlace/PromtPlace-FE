import React, { useState } from 'react';
import type { Creator } from '@/types/prompt.ts';
import FollowButton from '@/components/Button/FollowButton';
import profileImage from '@/assets/icon-profile-gray.svg';

const SearchPrompter = ({ creators }: { creators: Creator[] }) => {
  const [isFollowed, setIsFollowed] = useState<Record<number, boolean>>(() =>
    creators.reduce(
      (acc, creator) => {
        acc[creator.id] = creator.followed;
        return acc;
      },
      {} as Record<number, boolean>,
    ),
  );

  const handleFollow = (id: number) => {
    setIsFollowed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    // 팔로우 기능 서버 연동
  };

  return (
    <aside className="flex flex-col gap-6 mt-[17px] w-[313px]">
      {/* 키워드 관련 프롬프터 */}
      <section className="w-[313px] rounded-2xl p-4 shadow-sm bg-white">
        <div className="pb-2 font-bold text-xl flex items-center gap-1">키워드 관련 프롬프터</div>
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
              />
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default SearchPrompter;
