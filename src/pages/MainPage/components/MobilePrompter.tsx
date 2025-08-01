// components/MobilePrompter.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '@/assets/icon-profile-gray.svg';
import FollowButton from '@/components/Button/FollowButton';

type Props = {
  id: number;
  name: string;
  authorimage?: string | null;
};

const MobilePrompter = ({ id, name, authorimage }: Props) => {
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div className="w-full h-12 py-1.5 flex justify-between items-center bg-[#F5F5F5]">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/profile/${id}`)}>
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
      <FollowButton
        follow={isFollowed}
        onClick={() => {
          setIsFollowed((prev) => !prev);
          // 팔로우 기능 서버 연동
        }}
        size="sm"
        type="button"
      />
    </div>
  );
};

export default MobilePrompter;
