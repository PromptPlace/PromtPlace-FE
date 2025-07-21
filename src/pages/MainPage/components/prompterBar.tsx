import React, { useState } from 'react';
import type { Creator } from '@/types/prompt.ts';
import FollowButton from '@/components/Button/FollowButton';
import profileImage from '@/assets/icon-profile-gray.svg';
import allowRight from '@/assets/icon-arrow-right.svg';

const PrompterBar = ({ creators }: { creators: Creator[] }) => {
  const [isFollowed, setIsFollowed] = useState<Record<number, boolean>>(
    () => creators.reduce((acc, creator) => {
      acc[creator.id] = creator.followed;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const handleFollow = (id: number) => {
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
        <div className="pb-2 font-bold text-xl flex items-center gap-1">
          이달의 인기 프롬프터 <span>🔥</span>
        </div>
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

      {/* ⭐ 신규 인기 프롬프터 */}
      <section className="w-[313px] rounded-2xl p-4 shadow-sm bg-white">
        <h4 className="pb-2 font-bold text-lg flex items-center gap-1">
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
                follow={isFollowed[c.id]}
                onClick={() => {
                  handleFollow(c.id);
                }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="w-80 p-[20px] rounded-2xl inline-flex flex-col justify-center shadow-sm bg-white gap-2.5">
        <h4 className="pb-2 font-bold text-xl flex items-center gap-1">
          프롬프트 작성 가이드라인
        </h4>
        <button className='w-[136px] h-[46px] bg-white rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-primary inline-flex justify-center items-center gap-3.5'>
          <span className='text-primary'>보러가기</span>
          <div><img src={allowRight} /></div>
        </button>
      </section>

      <section className="w-80 p-5 rounded-2xl inline-flex flex-col justify-center shadow-sm bg-white gap-2.5">
        <h4 className="pb-2 font-bold text-xl flex items-center gap-1">
          프롬프트 작성 꿀팁
        </h4>
        <button className='w-[136px] h-[46px] bg-white rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-primary inline-flex justify-center items-center gap-3.5'>
          <span className='text-primary'>보러가기</span>
          <div><img src={allowRight} /></div>
        </button>
      </section>

    </aside>
  );
};

export default PrompterBar;
