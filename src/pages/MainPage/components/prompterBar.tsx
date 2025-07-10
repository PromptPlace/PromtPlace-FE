import React from 'react'
import CircleButton from '@components/Button/CircleButton.tsx'

const PrompterBar = ({ creators }: { creators: { id: string; name: string; avatar: string; followed: boolean }[] }) => (
    <aside className="flex flex-col gap-6 bg-white">
        {/* 인기 프롬프터 */}
        <section className="w-[313px] rounded-2xl p-4 shadow-sm bg-white">
            <h4 className="border-b pb-2 font-semibold">이달의 인기 프롬프터</h4>
            <ul className="mt-4 space-y-3 w-[286px]">
                {creators.map((c) => (
                    <li key={c.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 w-[266px]">
                            <img
                                src={c.avatar}
                                alt={c.name}
                                className="size-7 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium">{c.name}</span>
                        </div>
                        <button className="h-6 whitespace-nowrap px-2 text-xs">
                            {c.followed ? '언팔▼' : '팔로우+'}
                        </button>
                    </li>
                ))}
            </ul>
        </section>

        <section className="w-[313px] rounded-2xl bg-white p-4 shadow-sm">
            <h4 className="border-b pb-2 font-semibold">이달의 인기 프롬프터</h4>
            <ul className="mt-4 space-y-3 w-[286px]">
                {creators.map((c) => (
                    <li key={c.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 w-[266px]">
                            <img
                                src={c.avatar}
                                alt={c.name}
                                className="size-7 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium">{c.name}</span>
                        </div>
                        <button className="h-6 whitespace-nowrap px-2 text-xs">
                            {c.followed ? '언팔▼' : '팔로우+'}
                        </button>
                    </li>
                ))}
            </ul>
        </section>

        {/* 기타 섹션 */}
        {[
            '프롬프트 작성 가이드라인',
            '프롬프트 작성 템플릿',
        ].map((title) => (
            <section key={title} className="w-[313px] rounded-2xl bg-white p-4 shadow-sm">
                <h4 className="border-b pb-2 font-semibold">{title}</h4>
                <button className="mt-3">
                    보러가기 →
                </button>
            </section>
        ))}
    </aside>
);

export default PrompterBar
