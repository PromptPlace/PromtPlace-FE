// components/MobilePrompter.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '@/assets/icon-profile-gray.svg';
import FollowButton from '@/components/Button/FollowButton';
import { useAuth } from '@/context/AuthContext';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';

type Props = {
  id: number;
  name: string;
  authorimage?: string | null;
};

const MobilePrompter = ({ id, name, authorimage }: Props) => {
  const { accessToken } = useAuth();
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div className="w-full h-12 py-1.5 flex justify-between items-center bg-[#F5F5F5]">
      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/profile/${id}`)}>
        <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center">
          <img
            src={authorimage ? authorimage : profileImage}
            alt="authorImage"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="max-w-44 text-black text-xs font-medium uppercase leading-relaxed tracking-wide truncate">
          {name}
        </div>
      </div>
      <FollowButton
        follow={isFollowed}
        onClick={() => {
          if (!accessToken) {
            alert('로그인이 필요합니다.');
            setLoginModalShow(true);
          } else {
            setIsFollowed((prev) => !prev);
          }
        }}
        size="sm"
        type="button"
      />
    </div>
  );
};

export default MobilePrompter;
