import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '@/assets/icon-profile-gray.svg';
import FollowButton from '@/components/Button/FollowButton';
import { useAuth } from '@/context/AuthContext';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import useOptimisticFollow from '@/hooks/mutations/MainPage/useOptimisticFollow';
import useGetFollowing from '@/hooks/queries/ProfilePage/useGetFollowing';
import type { PromptWriter } from '@/types/MainPage/prompt';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';

interface MobilePrompterProps {
  prompter: PromptWriter;
}

const MobilePrompter = ({ prompter }: MobilePrompterProps) => {
  const { accessToken, user } = useAuth();
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate();
  const { data } = useGetMember({ member_id: prompter.user_id });

  const { follow, unfollow } = useOptimisticFollow();
  const { data: myFollowingData } = useGetFollowing({ member_id: user.user_id });

  const isFollow = Boolean(myFollowingData?.data.some((f) => f.following_id === prompter.user_id));

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

  // 실제 데이터에서 profileImage로 들어오는 경우 처리
  const prompterData = prompter as typeof prompter & { profileImage?: { url: string } };
  const profileImageUrl = prompterData.profileImage?.url || prompter.profileImage?.url || userImage;

  return (
    <div className="w-full h-12 py-1.5 flex justify-between items-center bg-[#F5F5F5]">
      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/profile/${prompter.user_id}`)}>
        <div className="w-[36px] h-[36px] rounded-full bg-gray-200 flex justify-center items-center">
          <img
            src={profileImageUrl}
            alt="authorImage"
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              console.log('이미지 로드 실패:', profileImageUrl);
              e.currentTarget.src = userImage;
            }}
            onLoad={() => {
              console.log('이미지 로드 성공:', profileImageUrl);
            }}
          />
        </div>
        <div className="max-w-44 text-black text-Black text-xs font-medium font-['Spoqa_Han_Sans_Neo'] leading-relaxed tracking-wide truncate ">
          {data?.data.nickname || prompter.nickname}
        </div>
      </div>
      {prompter.user_id !== user.user_id && (
        <FollowButton follow={isFollow} onClick={handleFollow} size="sm" type="button" />
      )}
    </div>
  );
};

export default MobilePrompter;
