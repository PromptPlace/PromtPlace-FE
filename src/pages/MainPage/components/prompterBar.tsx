/**
 * author @곽도윤
 * API 연동 후 creator -> writer or prompter로 수정할 예정
 **/

import React, { useMemo, useState } from 'react';
import FollowButton from '@/components/Button/FollowButton';
import profileImage from '@/assets/icon-profile-gray.svg';
import allowRight from '@/assets/icon-arrow-right-blue.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import useGetPrompterList from '@/hooks/queries/MainPage/useGetPrompterList';
import useGetFollowing from '@/hooks/queries/ProfilePage/useGetFollowing';
import useOptimisticFollow from '@/hooks/mutations/MainPage/useOptimisticFollow';

const PrompterBar = () => {
  const { accessToken, user } = useAuth();
  const [loginModalShow, setLoginModalShow] = useState(false);
  const navigate = useNavigate();

  const { data: promptersData } = useGetPrompterList();
  console.log(promptersData?.data.members)

  // useMemo를 사용하여 promptersData가 변경될 때만 목록을 다시 계산하도록 수정
  const allPrompters = useMemo(() => promptersData?.data?.members ?? [], [promptersData]);

  const topPrompters = useMemo(
    () => [...allPrompters].sort((a, b) => b.follower_cnt - a.follower_cnt).slice(0, 4),
    [allPrompters],
  );

  const topNewPrompters = useMemo(() => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const newPrompters = allPrompters.filter((m) => new Date(m.created_at) >= oneMonthAgo);
    return [...newPrompters].sort((a, b) => b.follower_cnt - a.follower_cnt).slice(0, 2);
  }, [allPrompters]);

  const { data: myFollowingData } = useGetFollowing({ member_id: user.user_id });
  const myFollowingSet = useMemo(() => new Set(myFollowingData?.data.map((f) => f.following_id)), [myFollowingData]);

  const { follow, unfollow } = useOptimisticFollow();

  const handleFollow = (targetId: number, isFollowed: boolean) => {
    if (isFollowed) {
      unfollow(targetId);
    } else {
      follow(targetId);
    }
  };

  return (
    <aside className="flex flex-col gap-6 mt-[17px] w-[313px]">
      {/* 미로그인 시 로그인 모달 연결 */}
      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
      {/* 🔥 이달의 인기 프롬프터 */}
      <section className="w-[313px] h-[390px] rounded-2xl p-4 shadow-sm bg-white">
        <div className="pb-2 font-bold text-xl flex items-center gap-1">
          이달의 인기 프롬프터 <span>🔥</span>
        </div>
        <ul className="mt-4 space-y-4 ">
          {topPrompters.map((p) => {
            const isFollowed = myFollowingSet.has(p.user_id);
            return (
              <li key={p.user_id} className="flex items-center justify-between">
                <div
                  className="flex items-center gap-[10px] mt-[12px] cursor-pointer"
                  onClick={() => navigate(`/profile/${p.user_id}`)}>
                  <img
                    src={p.profile_img_url ? p.profile_img_url : profileImage} // API에 이미지 있으면 표시
                    alt={p.nickname}
                    className="w-11 h-11 rounded-full object-cover mr-[10px]"
                  />
                  <div>
                    <p className="text-lg font-normal max-w-[120px] truncate">{p.nickname}</p>
                    <p className="text-sm font-normal">팔로워 {p.follower_cnt}명</p>
                  </div>
                </div>
                <FollowButton
                  follow={isFollowed}
                  onClick={() => {
                    if (!accessToken) {
                      alert('로그인이 필요합니다.');
                      setLoginModalShow(true);
                      return;
                    }
                    handleFollow(p.user_id, isFollowed);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </section>

      {/* ⭐ 신규 인기 프롬프터 */}
      <section className="w-[313px] h-[246px] rounded-2xl p-4 shadow-sm bg-white">
        <h4 className="pb-2 font-bold text-xl flex items-center gap-1">
          신규 인기 프롬프터 <span>⭐</span>
        </h4>
        <ul className="mt-4 space-y-4">
          {topNewPrompters.map((p) => {
            const isFollowed = myFollowingSet.has(p.user_id);
            return (
              <li key={p.user_id} className="flex items-center justify-between">
                <div
                  className="flex items-center gap-[10px] mt-[12px] cursor-pointer"
                  onClick={() => navigate(`/profile/${p.user_id}`)}>
                  <img
                    src={p.profile_img_url || profileImage} // API에 이미지 있으면 표시
                    alt={p.nickname}
                    className="w-11 h-11 rounded-full object-cover mr-[10px]"
                  />
                  <div>
                    <p className="text-lg">{p.nickname}</p>
                    <p className="text-sm">팔로워 {p.follower_cnt}명</p>
                  </div>
                </div>
                <FollowButton
                  follow={isFollowed}
                  onClick={() => {
                    if (!accessToken) {
                      alert('로그인이 필요합니다.');
                      setLoginModalShow(true);
                      return;
                    }
                    handleFollow(p.user_id, isFollowed);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="w-[313px] h-[124px] p-[20px] rounded-2xl inline-flex flex-col justify-center shadow-sm bg-white gap-2.5">
        <h4 className="pb-2 font-bold text-xl flex items-center gap-1">프롬프트 작성 가이드라인</h4>
        <button
          className="w-[136px] px-4 py-2.5 bg-white rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] outline-1 outline-offset-[-1px] outline-primary inline-flex justify-center items-center gap-3.5"
          onClick={() => {
            navigate('/guide/notice');
          }}>
          <span className="text-primary">보러가기</span>
          <div>
            <img src={allowRight} />
          </div>
        </button>
      </section>

      <section className="w-[313px] h-[124px] p-5 rounded-2xl inline-flex flex-col justify-center shadow-sm bg-white gap-2.5 mt-[-8px]">
        <h4 className="pb-2 font-bold text-xl flex items-center gap-1">프롬프트 작성 꿀팁</h4>
        <button
          className="w-[136px] px-4 py-2.5 bg-white rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] outline-1 outline-offset-[-1px] outline-primary inline-flex justify-center items-center gap-3.5"
          onClick={() => {
            navigate('/guide/tip');
          }}>
          <span className="text-primary">보러가기</span>
          <div>
            <img src={allowRight} />
          </div>
        </button>
      </section>
    </aside>
  );
};

export default PrompterBar;
