import React from 'react'
import type { Prompt } from '@/types/prompt.ts'

type props = {
    prompt: Prompt;
}

const promptCard = ({ prompt }: props) => {
    const { authorImg, authorName, title, price, rating, views, content, tags, likes, downloadCount } = prompt;
    return (
        <div className='flex flex-col w-[832px]'>
            <div className='flex items-center mb-2'>
                <img src={authorImg} alt="authorImage" className='w-8 h-8 rounded-full mr-2'/>
                <span className='font-medium text-sm'>{authorName}</span>
            </div>

            <div className='bg-FFFEFB rounded-xl shadow-md p-4 mb-6 w-[780px]'>
                <h3 className='text-lg font-bold mb-1'>{title}</h3>

                <div className='flex flex-wrap gap-2 mb-2'>
                {tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
                </div>

                <p className='text-sm text-gray-700 mb-2'>{content}</p>

                <div className='flex items-center justify-between text-sm text-gray-600'>
                    <span className='font-bold text-black'>{price}원</span>
                    <span className='font-bold text-black'>{rating}</span>
                    <span className='font-bold text-black'>{views} views</span>
                    <span className='font-bold text-black'>{likes} likes</span>
                    <span className='font-bold text-black'>{downloadCount} downloads</span>
                </div>
            </div>
        </div>
    );
};

export default promptCard;
