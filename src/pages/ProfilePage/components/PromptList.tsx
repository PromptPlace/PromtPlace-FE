import { useAuth } from '@/context/AuthContext';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import useGetPrompts from '@/hooks/queries/ProfilePage/useGetPrompts';
import { useParams } from 'react-router-dom';

import TwinkleIcon from '@assets/profile/icon-twinkle.svg?react';

const PromptList = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const myId = user.user_id;
  const isMyProfile = id ? Number(id) === myId : false;
  const member_id = isMyProfile ? myId : Number(id);

  // 회원 정보 불러오기
  const { data: userData } = useGetMember({ member_id });

  // 작성한 프롬프트 목록
  const { data: promptsData } = useGetPrompts({ member_id });

  const promptCount = promptsData
    ? promptsData?.pages?.reduce((acc, page) => acc + (page?.data?.prompts?.length ?? 0), 0)
    : 0;

  return (
    <div className="mt-[56px]">
      <div className="flex gap-[20px] items-start">
        <p className="custom-h2 max-phone:text-[20px]">{userData?.data.nickname}님이 작성한 프롬프트</p>
        <div className="custom-h5 text-gray500 rounded-[50px] border border-[0.8px] border-gray400 bg-white py-[5px] px-[10px]">
          {promptCount}
        </div>
      </div>

      {promptCount === 0 && (
        <div className="mt-[80px] flex flex-col justify-center items-center gap-[20px] max-phone:mt-[64px]">
          <TwinkleIcon />
          <div className="custom-h3 text-gray500 flex flex-col gap-[8px] items-center">
            <p className="max-phone:text-[14px]">아직 올린 프롬프트가 없어요!</p>
            <p className="max-phone:text-[10px]">다음에 확인해주세요.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptList;
