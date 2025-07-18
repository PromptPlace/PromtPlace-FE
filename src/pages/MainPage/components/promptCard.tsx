/**
 * Todo(07/18):
 * 1. 프롬프트 카드 찜 기능 구현 -> 서버 연동 필요
 */

import React, { useState } from 'react'
import type { Prompt } from '@/types/prompt.ts'
import iconEye from '@/assets/icon-eye.svg'
import iconDownload from '@/assets/icon-download-gray.svg'
import Rating from '@/components/Rating'
import profileImage from '@/assets/icon-profile-gray.svg'
import likeIcon from '@/assets/icon-heart-blue-small.svg'
import unLikeIcon from '@/assets/icon-heart-none-small.svg'

type props = {
    prompt: Prompt;
}

const promptCard = ({ prompt }: props) => {
    const { authorImg, authorName, model, title, price, rating, views, content, tags, likes, downloadCount } = prompt;
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(prev => !prev);
        // 찜 기능 서버 연동
    }

    return (
        <div className="flex flex-col w-[832px] mb-6">
            {/* 작성자 정보 (카드 바깥쪽) */}
            <div className="flex items-center mb-2 px-2">
                <img
                    src={authorImg ? authorImg : profileImage}
                    alt="authorImage"
                    className="w-[48px] h-[48px] rounded-full mr-3"
                />
                <span className="text-[18px] font-medium">{authorName}</span>
            </div>

            {/* 카드 본문 */}
            <div className="relative w-[780px] bg-white rounded-xl shadow-md p-4 ml-2 ml-auto">
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
                        <div><Rating star={rating} /></div>
                        <div className='flex items-center gap-1'><img src={iconEye} className='w-4 h-4' /> {views}</div>
                        <div className='flex items-center gap-1'><img src={iconDownload} className='w-4 h-4' /> {downloadCount}</div>
                    </div>
                </div>

                <p className="text-sm text-gray-800 whitespace-pre-line">{content}</p>

                <button
                    onClick={handleLike}
                    className='absolute right-4 bottom-4 z-10'>
                        <img src={isLiked ? likeIcon : unLikeIcon} className='w-4 h-4'/>
                </button>
            </div>
        </div>
    );
};

export default promptCard;
