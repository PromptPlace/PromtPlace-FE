// MobilePrompter.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '@/assets/icon-profile-gray.svg';
import FollowButton from '@/components/Button/FollowButton';
import { useAuth } from '@/context/AuthContext';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import useOptimisticFollow from '@/hooks/mutations/MainPage/useOptimisticFollow';
import useGetFollowing from '@/hooks/queries/ProfilePage/useGetFollowing';
import type { PromptWriter } from '@/types/MainPage/prompt';

interface MobilePrompterProps {
  prompter: PromptWriter;
}

const MobilePrompter = ({ prompter }: MobilePrompterProps) => {
  const { accessToken, user } = useAuth();
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate();

  const { follow, unfollow } = useOptimisticFollow();
  const { data: myFollowingData } = useGetFollowing({ member_id: user.user_id });

  const isFollow = myFollowingData?.data.some((f) => f.following_id === prompter.user_id);

  const handleFollow = () => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      setLoginModalShow(true);
      return;
    }

    if (isFollow) {
      unfollow(prompter.user_id);
    } else {
      follow(prompter.user_id);
    }
  };

  return (
    <div className="w-full h-12 py-1.5 flex justify-between items-center bg-[#F5F5F5]">
      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/profile/${prompter.user_id}`)}>
        <div className="w-[36px] h-[36px] rounded-full bg-gray-200 flex justify-center items-center">
          <img src={prompter.profile_img_url ?? userImage} alt="authorImage" className="w-full h-full rounded-full" />
        </div>
        <div className="max-w-44 text-black text-Black text-xs font-medium font-['Spoqa_Han_Sans_Neo'] uppercase leading-relaxed tracking-wide truncate ">
          {prompter.nickname}
        </div>
      </div>
      <FollowButton follow={isFollow} onClick={handleFollow} size="sm" type="button" />
    </div>
  );
};

export default MobilePrompter;
