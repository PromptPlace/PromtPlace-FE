// components/MobilePrompter.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '@/assets/icon-profile-gray.svg';
import FollowButton from '@/components/Button/FollowButton';
import { useAuth } from '@/context/AuthContext';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import type { Prompter } from '@/types/MainPage/prompter';
import usePatchFollow from '@/hooks/mutations/ProfilePage/usePatchFollow';
import useDeleteFollow from '@/hooks/mutations/ProfilePage/useDeleteFollow';
import type { PromptWriter } from '@/types/MainPage/prompt';

interface MobilePrompterProps {
  user: PromptWriter;
}

const MobilePrompter = ({ user }: MobilePrompterProps) => {
  if (!user)
    return null; // user가 없으면 렌더링하지 않음
  else {
    const { accessToken } = useAuth();
    const [loginModalShow, setLoginModalShow] = useState(false);
    const navigate = useNavigate();

    // 전체 팔로워 조회 후 팔로워 목록 조회
    // const { data: followerData } = useGetFollower({ });
    // 전체 유저 조회 후 팔로우 여부 판단 로직에 의해 useState 초기값 설정...?
    const [isFollowed, setIsFollowed] = useState(false);

    const { mutate: mutateFollow } = usePatchFollow({ member_id: user.user_id });
    const { mutate: mutateUnFollow } = useDeleteFollow({ member_id: user.user_id });

    const handleFollow = () => {
      if (isFollowed) {
        mutateUnFollow({ member_id: user.user_id });
      } else {
        mutateFollow({ member_id: user.user_id });
      }
      setIsFollowed((prev) => !prev);
    };

    return (
      <div className="w-full h-12 py-1.5 flex justify-between items-center bg-[#F5F5F5]">
        {loginModalShow && (
          <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
        )}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/profile/${user.user_id}`)}>
          <div className="w-[36px] h-[36px] rounded-full bg-gray-200 flex justify-center items-center">
            <img
              src={user.profile_img_url ? user.profile_img_url : userImage}
              alt="authorImage"
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="max-w-44 text-black text-xs font-medium uppercase leading-relaxed tracking-wide truncate">
            {user.nickname}
          </div>
        </div>
        <FollowButton
          follow={isFollowed}
          onClick={() => {
            if (!accessToken) {
              alert('로그인이 필요합니다.');
              setLoginModalShow(true);
            } else {
              handleFollow();
            }
          }}
          size="sm"
          type="button"
        />
      </div>
    );
  }
};

export default MobilePrompter;
