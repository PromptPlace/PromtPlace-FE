import { useState } from 'react';
import { motion } from 'motion/react';

import FollowButton from '@/components/Button/FollowButton';
import ArrowIcon from '@assets/icon-arrow-left-black.svg?react';
import ProfileIcon from '@assets/icon-profile-gray.svg?react';
import usePatchFollow from '@/hooks/mutations/ProfilePage/usePatchFollow';
import useDeleteFollow from '@/hooks/mutations/ProfilePage/useDeleteFollow';
import type { Follow, FollowerWithStatus, FollowingWithStatus } from '@/types/ProfilePage/profile';

type FollowWithTargetID = Follow & { isFollowing: boolean; targetId: number; count: number };

interface FollowCardProps {
  title: string;
  list: FollowingWithStatus[] | FollowerWithStatus[];
  setShow: (show: boolean) => void;
  member_id: number;
}

const FollowCard = ({ title, list, setShow, member_id }: FollowCardProps) => {
  const normalizedList: FollowWithTargetID[] =
    list?.map((f) => ({
      ...f,
      targetId: f.follower_id ?? f.following_id,
      count: f.follower_cnt ?? f.following_cnt,
    })) ?? [];

  const [following, setFollowing] = useState<Record<number, boolean>>(() => {
    const initialState: Record<number, boolean> = {};

    normalizedList.forEach((f) => {
      const isFollower = 'follower_id' in f;
      const isFollowing = isFollower ? list.some((f) => f.follow_id === f.follower_id) : true;
      initialState[f.targetId] = isFollowing;
    });

    return initialState;
  });

  const [followCount, setFollowCount] = useState(normalizedList);

  // 팔로우, 언팔로우
  const { mutate: mutateFollow } = usePatchFollow({ member_id });
  const { mutate: mutateUnFollow } = useDeleteFollow({ member_id });

  const toggleFollowing = (id: number) => {
    const isFollowing = following[id];

    if (isFollowing) {
      mutateUnFollow({ member_id: id });
    } else {
      mutateFollow({ member_id: id });
    }

    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));

    setFollowCount((prev) =>
      prev.map((f) => (f.targetId === id ? { ...f, count: f.count + (isFollowing ? -1 : 1) } : f)),
    );
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
            {normalizedList?.map((f) => (
              <div key={f.follow_id} className="flex justify-between items-center px-[50px]">
                <div className="flex items-center gap-[10px] ">
                  <ProfileIcon />
                  <div className="flex flex-col items-start py-[12px]">
                    <p className="text-text-on-white text-[18px] font-normal leading-[26px] trackint-[0.46px]">
                      {f.nickname}
                    </p>
                    <p className="text-text-on-white text-[14px] font-normal leading-[26px] tracking-[0.46px]">
                      팔로워 {followCount.find((item) => item.targetId === f.targetId)?.count}명
                    </p>
                  </div>
                </div>

                <FollowButton
                  follow={f.isFollowing ?? false}
                  onClick={() => {
                    toggleFollowing(f.targetId);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        onClick={() => setShow(false)}
        className="lg:hidden fixed inset-0 z-200 bg-overlay max-w-[425px] w-full m-auto"
      />

      <div className="lg:hidden fixed left-0 right-0 bottom-0 z-200 max-w-[425px] w-full mx-auto">
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 320 }}
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
            if (info.point.y > window.innerHeight - 310) {
              setShow(false);
            }
          }}
          className="lg:hidden fixed left-0 h-[320px] right-0 bottom-0 z-200 max-w-[425px] w-full mx-auto max-lg:pr-[15px] bg-white rounded-t-[24px]">
          <div className="flex flex-col">
            <div className="pt-[14px] pb-[10px] rounded-t-[24px] bg-white cursor-grab flex flex-col items-center">
              <div className="w-[40px] h-[4px] rounded-[50px] bg-white-stroke"></div>
              <p className="px-[20px] mt-[20px] text-primary text-[10px] font-medium leading-[13px] flex justify-start w-full">
                {title.slice(0, -2)}
              </p>
            </div>

            <div className="bg-white overflow-y-auto pb-[env(safe-area-inset-bottom)] max-h-[50vh] h-full">
              {normalizedList?.map((f) => (
                <div key={f.follow_id} className="flex justify-between items-center pl-[50px] pr-[31px]">
                  <div className="flex items-center gap-[10px] max-lg:gap-[5px]">
                    <ProfileIcon className="max-lg:w-[36px] max-lg:h-[36px]" />
                    <div className="flex flex-col items-start py-[12px]">
                      <p className="text-text-on-white text-[18px] font-normal leading-[26px] trackint-[0.46px] max-lg:text-[9px] max-lg:leading-[13px] max-lg:tracking-[0.23px]">
                        {f.nickname}
                      </p>
                      <p className="text-text-on-white text-[14px] font-normal leading-[26px] tracking-[0.46px] max-lg:text-[8px] max-lg:leading-[13px] max-lg:tracking-[0.23px]">
                        팔로워 {followCount.find((item) => item.targetId === f.targetId)?.count}명
                      </p>
                    </div>
                  </div>

                  <FollowButton
                    follow={f.isFollowing ?? false}
                    onClick={() => {
                      toggleFollowing(f.targetId);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default FollowCard;
