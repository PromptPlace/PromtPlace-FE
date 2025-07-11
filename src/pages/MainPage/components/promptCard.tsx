import React from 'react'
import type { Prompt } from '@/types/prompt.ts'

type props = {
    prompt: Prompt;
}

const promptCard = ({ prompt }: props) => {
    const { authorImg, authorName, model, title, price, rating, views, content, tags, likes, downloadCount } = prompt;
    return (
        <div className="flex flex-col w-[832px] mb-6">
            {/* 작성자 정보 (카드 바깥쪽) */}
            <div className="flex items-center mb-2 px-2">
                <img
                    src={authorImg}
                    alt="authorImage"
                    className="w-[48px] h-[48px] rounded-full mr-3"
                />
                <span className="text-[18px] font-medium">{authorName}</span>
            </div>

            {/* 카드 본문 */}
            <div className="w-[780px] bg-white rounded-xl shadow-md p-4 ml-2 ml-auto">
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {model}
                    </span>
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                
                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">{title}</span>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{price}원</span>
                        <span>⭐ {rating.toFixed(1)}</span>
                        <span>👁 {views}</span>
                        <span>⬇ {downloadCount}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-800 whitespace-pre-line">{content}</p>
            </div>
        </div>
    );
};

export default promptCard;
