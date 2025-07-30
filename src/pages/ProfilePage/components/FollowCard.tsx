import { useState } from 'react';
import { motion } from 'motion/react';

import FollowButton from '@/components/Button/FollowButton';
import ArrowIcon from '@assets/icon-arrow-left-black.svg?react';
import ProfileIcon from '@assets/icon-profile-gray.svg?react';

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
    <>
      <div className="fixed inset-0 bg-overlay flex justify-center items-center max-lg:hidden">
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

      <motion.div
        onClick={() => setShow(false)}
        className="lg:hidden fixed inset-0 bg-overlay max-w-[425px] w-full m-auto"
      />

      <div className="lg:hidden fixed left-0 right-0 bottom-0 z-200 max-w-[425px] w-full mx-auto">
        <motion.div
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={false}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300,
          }}
          onDragEnd={(_, info) => {
            if (info.point.y > 350) {
              setShow(false);
            }
          }}
          className="overflow-scroll flex flex-col max-h-[60vh]">
          <div className="pt-[14px] pb-[10px] rounded-t-[50px] bg-white cursor-grab flex flex-col items-center">
            <div className="w-[40px] h-[4px] rounded-[50px] bg-white-stroke"></div>
            <p className="px-[20px] mt-[20px] text-primary text-[10px] font-medium leading-[13px] flex justify-start w-full">
              {title.slice(0, -2)}
            </p>
          </div>

          <div className="bg-white overflow-y-auto pb-[env(safe-area-inset-bottom)] max-h-[50vh] h-full">
            {list?.map((f) => (
              <div key={f.follow_id} className="flex justify-between items-center px-[50px]">
                <div className="flex items-center gap-[10px] max-lg:gap-[5px]">
                  <ProfileIcon className="max-lg:w-[36px] max-lg:h-[36px]" />
                  <div className="flex flex-col items-start py-[12px]">
                    <p className="text-text-on-white text-[18px] font-normal leading-[26px] trackint-[0.46px] max-lg:text-[9px] max-lg:leading-[13px] max-lg:tracking-[0.23px]">
                      {f.nickname}
                    </p>
                    <p className="text-text-on-white text-[14px] font-normal leading-[26px] tracking-[0.46px] max-lg:text-[8px] max-lg:leading-[13px] max-lg:tracking-[0.23px]">
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
        </motion.div>
      </div>
    </>
  );
};

export default FollowCard;
