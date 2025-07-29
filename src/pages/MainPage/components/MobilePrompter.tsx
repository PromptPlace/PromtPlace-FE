// components/MobilePrompter.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '@/assets/icon-profile-gray.svg';

type Props = {
  id: number;
  name: string;
  authorimage?: string;

};

const MobilePrompter = ({ id, name, authorimage }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-12 py-1.5 flex justify-between items-center">
      <div className="flex items-center gap-2" onClick={() => navigate(`/profile/${id}`)}>
        {/* 아바타 자리 (임시 원형) */}
        <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center">
          <img
            src={authorimage ? authorimage : profileImage}
            alt="authorImage"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="max-w-44 text-black text-xs font-medium font-['Spoqa_Han_Sans_Neo'] uppercase leading-relaxed tracking-wide truncate">
          {name}
        </div>
      </div>
      <button className="px-2 py-1 bg-white rounded-full outline outline-1 outline-primary text-primary text-[8px] font-bold font-['Spoqa_Han_Sans_Neo']">
        팔로우 +
      </button>
    </div>
  );
};

export default MobilePrompter;
