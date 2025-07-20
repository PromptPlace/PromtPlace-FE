import FollowButton from '@/components/Button/FollowButton';
import ArrowIcon from '@assets/icon-arrow-left-black.svg?react';
import ProfileIcon from '@assets/icon-profile-gray.svg?react';
import { useState } from 'react';

type Following = {
  follow_id: number;
  following_id: number;
  nickname: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type Follower = {
  follow_id: number;
  follower_id: number;
  nickname: string;
  email: string;
  created_at: string;
  updated_at: string;
};

interface FollowCardProps {
  title: string;
  list?: Following[] | Follower[];
  setShow: (show: boolean) => void;
  status: boolean;
}

const FollowCard = ({ title, list = [], setShow, status }: FollowCardProps) => {
  const [following, setFollowing] = useState<Record<number, boolean>>(
    Object.fromEntries(list?.map((f) => [f.follow_id, status])),
  );

  const toggleFollowing = (id: number) => {
    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed inset-0 bg-overlay flex justify-center items-center">
      <div className="bg-white pt-[30px] px-[20px] max-w-[416px] w-full rounded-[16px]">
        <div className="flex items-center justify-start p-[10px] gap-[10px]">
          <ArrowIcon onClick={() => setShow(false)} className="cursor-pointer" />
          <div className="text-text-on-white text-[24px] font-bold leading-[30px]">{title}</div>
        </div>
        <div className="mt-[10px] max-h-[740px] overflow-auto">
          {list?.map((f) => (
            <div key={f.follow_id} className="flex justify-between items-center px-[50px]">
              <div className="flex items-center gap-[10px] ">
                <ProfileIcon />
                <div className="flex flex-col items-start py-[12px]">
                  <p className="text-text-on-white text-[18px] font-normal leading-[26px] trackint-[0.46px]">
                    {f.nickname}
                  </p>
                  <p className="text-text-on-white text-[14px] font-normal leading-[26px] tracking-[0.46px]">
                    팔로워 1234명
                  </p>
                </div>
              </div>

              <FollowButton
                follow={!!following[f.follow_id]}
                onClick={() => {
                  toggleFollowing(f.follow_id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowCard;
