import React from 'react';
import type { Creator } from '@/types/prompt.ts';

const PrompterBar = ({ creators }: { creators: Creator[] }) => {
  return (
    <aside className="flex flex-col gap-6">
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
              <button
                className={`text-xs px-3 py-1 rounded-full font-semibold 
                  ${c.followed
                    ? 'bg-blue-100 text-blue-600 border border-blue-500'
                    : 'bg-blue-500 text-white'}
                `}
              >
                {c.followed ? '완료 ✔' : '팔로우 +'}
              </button>
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
              <button
                className={`text-xs px-3 py-1 rounded-full font-semibold 
                  ${c.followed
                    ? 'bg-blue-100 text-blue-600 border border-blue-500'
                    : 'bg-blue-500 text-white'}
                `}
              >
                {c.followed ? '완료 ✔' : '팔로우 +'}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default PrompterBar;
