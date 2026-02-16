import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';

import usePatchFollow from '@/hooks/mutations/ProfilePage/usePatchFollow';
import useDeleteFollow from '@/hooks/mutations/ProfilePage/useDeleteFollow';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import useGetFollower from '@/hooks/queries/ProfilePage/useGetFollower';
import useGetFollowing from '@/hooks/queries/ProfilePage/useGetFollowing';
import useGetPrompts from '@/hooks/queries/ProfilePage/useGetPrompts';
import useGetSNS from '@/hooks/queries/ProfilePage/useGetSNS';

import type { FollowerWithStatus, FollowingWithStatus } from '@/types/ProfilePage/profile';
import TextModal from '@/components/Modal/TextModal';
import FollowCard from './FollowCard';
import SnsButton from './SnsButton';
import ProfileButton from './ProfileButton';

import ArrowIcon from '@assets/icon-arrow-right-profile.svg?react';
import ProfileIcon from '@assets/header/icon-mypage.svg';
import clsx from 'clsx';
import PrimaryButton from '@/components/Button/PrimaryButton';
import AdminMessageModal from './AdminMessageModal';
import AdminBanModal from './AdminBanModal';
import DualModal from '@/components/Modal/DualModal';
import useDeleteAdmin from '@/hooks/mutations/ProfilePage/useDeleteAdmin';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import usePostChatRooms from '@/hooks/mutations/ChatPage/usePostChatRooms';

interface ProfileCardProps {
  mypage?: boolean;
}

const ProfileCard = ({ mypage }: ProfileCardProps) => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const myId = user.user_id;
  const isMyProfile = (id ? Number(id) === myId : false) || mypage;
  const member_id = isMyProfile ? myId : Number(id);

  const isAdmin = user.role === 'ADMIN';
  const [showAdminBanModal, setShowAdminBanModal] = useState(false); // 관리자 - 계정 정지
  const [showAdminDeleteModal, setShowAdminDeleteModal] = useState(false); // 관지라 - 계정 삭제
  const [showAdminMessageModal, setShowAdminMessageModal] = useState(false); // 관리자 - 메시지 보내기

  // 팔로잉, 팔로워 모달
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollower, setShowFollower] = useState(false);

  const { data: myFollowingData } = useGetFollowing({ member_id: user.user_id });
  const [isFollow, setIsFollow] = useState(() =>
    Boolean(myFollowingData?.data.some((f) => f.following_id === member_id)),
  ); // 팔로우 여부

  // 회원 정보 불러오기
  const { data: userData } = useGetMember({ member_id });

  // 팔로워, 팔로잉 목록
  const { data: followerData } = useGetFollower({ member_id });
  const { data: followingData } = useGetFollowing({ member_id });

  // 팔로우, 언팔로우
  const { mutate: mutateFollow } = usePatchFollow({ member_id: member_id });
  const { mutate: mutateUnFollow } = useDeleteFollow({ member_id: member_id });

  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();
  const [isMessageModalShow, setIsMessageModalShow] = useState(false); // 문의하기 모달

  // 작성한 프롬프트 목록
  const { data: promptsData } = useGetPrompts({ member_id });

  // 회원 SNS 목록
  const { data: snsData } = useGetSNS({ member_id });

  // 계정 삭제 (관리자)
  const { mutate: mutateDeleteAdmin } = useDeleteAdmin();

  // 채팅방 생성/반환
  const { mutate: mutatePostChatRooms } = usePostChatRooms();

  // 팔로우 및 팔로잉
  const handleFollow = () => {
    handleShowLoginModal(() => {
      if (isFollow) {
        mutateUnFollow({ member_id: member_id });
      } else {
        mutateFollow({ member_id: member_id });
      }
      setIsFollow((prev) => !prev);
    });
  };

  const normalizedFollowerList: FollowerWithStatus[] =
    followerData?.data.map((f) => ({
      ...f,
      isFollowing: followingData?.data.some((fw) => fw.following_id === f.follower_id) ?? false,
    })) || [];

  const normalizedFollowingList: FollowingWithStatus[] =
    followingData?.data.map((f) => ({
      ...f,
      isFollowing: true,
    })) || [];

  // 올린 프롬프트 개수
  const promptCount = promptsData ? promptsData?.pages[0].total_prompts : 0;

  useEffect(() => {
    if (isMyProfile && !mypage) {
      navigate('/mypage/profile');
    }
  }, [isMyProfile, navigate, mypage]);

  useEffect(() => {
    if (myFollowingData?.data) {
      const followed = myFollowingData.data.some((f) => f.following_id === member_id);
      setIsFollow(followed);
    }
  }, [myFollowingData, member_id]);

  return (
    <>
      <div
        className={clsx(
          mypage &&
            'max-mypage:px-[16px] max-mypage:pt-[20px] max-mypage:pb-[16px] max-mypage:flex-col max-mypage:gap-[16px]',
          !mypage &&
            'max-phone:px-[16px] max-phone:pt-[20px] max-phone:pb-[16px] max-phone:flex-col max-phone:gap-[16px]',
          'px-[32px] pt-[40px] pb-[32px] bg-white rounded-[12px] mt-[80px] flex gap-[40px]',
        )}>
        <div
          className={clsx(
            mypage && 'max-mypage:flex max-mypage:gap-[20px] max-mypage:items-center',
            'max-phone:flex max-phone:gap-[20px] max-phone:items-center',
          )}>
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden shrink-0 max-lg:w-[80px] max-lg:h-[80px]">
            <img
              src={userData?.data.profile_image ?? ProfileIcon}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>

          <p className={clsx(mypage && 'mypage:hidden', !mypage && 'phone:hidden', 'custom-h2')}>
            {userData?.data.nickname}
          </p>
        </div>

        <div className="pt-[12px] flex flex-col justify-between gap-[24px] w-full max-phone:gap-[20px]">
          <div className="flex gap-[24px] max-phone:ml-[40px]">
            <p
              className={clsx(
                mypage && 'max-mypage:hidden',
                !mypage && 'max-phone:hidden',
                'custom-h2 mr-[16px] whitespace-nowrap',
              )}>
              {userData?.data.nickname}
            </p>

            <div
              onClick={() => {
                if (followerData?.data.length !== 0) {
                  setShowFollower((prev) => !prev);
                }
              }}
              className="flex flex-col gap-[4px] items-center cursor-pointer">
              <div className="flex">
                <p className="custom-body3 whitespace-nowrap">팔로워</p>
                <ArrowIcon />
              </div>
              <p className="custom-h4">{followerData?.data.length}</p>
            </div>

            {isMyProfile && (
              <div
                onClick={() => setShowFollowing((prev) => !prev)}
                className="flex flex-col gap-[4px] items-center cursor-pointer">
                <div className="flex">
                  <p className="custom-body3">팔로잉</p>
                  <ArrowIcon />
                </div>
                <p className="custom-h4">{followingData?.data.length}</p>
              </div>
            )}

            <div className="flex flex-col gap-[4px] items-center">
              <p className="custom-body3 whitespace-nowrap">올린 프롬프트</p>
              <p className="custom-h4">{promptCount}</p>
            </div>
          </div>

          <div className="flex gap-[12px] px-[12px] max-phone:px-[0px] max-phone:ml-[40px] max-phone:mt-[-4px] flex-wrap">
            <SnsButton
              url={snsData?.data[snsData.data.length - 1]?.url || ''}
              id={snsData?.data[snsData.data.length - 1]?.user_sns_id || ''}
            />
          </div>

          {/* 관리자 */}
          {isAdmin && (
            <p className="custom-h5 text-alert max-phone:text-[14px] max-phone:ml-[40px]">{userData?.data.email}</p>
          )}

          <div className="custom-body1 h-[102px] max-lg:h-[130px] max-phone:h-[208px] overflow-y-scroll max-phone:ml-[40px]">
            {userData?.data.intros ? (
              userData.data.intros
            ) : (
              <p className="custom-body3 text-gray400">아직 소개를 작성하지 않았어요.</p>
            )}
          </div>

          {!isMyProfile && !isAdmin && (
            <div className="flex gap-[20px]">
              <ProfileButton text="문의하기" type="chat" onClick={() => mutatePostChatRooms(member_id)} />
              <ProfileButton
                text={isFollow ? '팔로우 완료' : '팔로우'}
                type={isFollow ? 'check' : 'plus'}
                onClick={handleFollow}
              />
            </div>
          )}

          {loginModalShow && (
            <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
          )}

          {/* 관리자 */}
          {isAdmin && (
            <div className="flex gap-[20px] justify-end">
              <PrimaryButton
                buttonType="adminBG"
                text="계정 정지"
                onClick={() => {
                  setShowAdminBanModal(true);
                }}
                borderRadius={8}
                py={8}
              />
              <PrimaryButton
                buttonType="adminBG"
                text="계정 삭제"
                onClick={() => {
                  setShowAdminDeleteModal(true);
                }}
                borderRadius={8}
                py={8}
              />
              <PrimaryButton
                buttonType="adminBG"
                text="메시지 보내기"
                onClick={() => {
                  setShowAdminMessageModal(true);
                }}
                borderRadius={8}
                py={8}
              />
            </div>
          )}
        </div>

        {showAdminBanModal && (
          <AdminBanModal
            userName={userData?.data.nickname}
            memberId={userData?.data.member_id}
            setShowAdminBanModal={setShowAdminBanModal}
          />
        )}

        {showAdminDeleteModal && (
          <DualModal
            text="해당 계정을 삭제 조치 하시겠습니까?"
            onClickYes={() => {
              const memberId = userData?.data.member_id;
              if (memberId === undefined) return;

              setShowAdminDeleteModal(false);
              mutateDeleteAdmin(memberId);

              alert('계정 삭제가 완료되었습니다.');
            }}
            onClickNo={() => {
              setShowAdminDeleteModal(false);
            }}
          />
        )}

        {showAdminMessageModal && (
          <AdminMessageModal
            data={userData}
            id={myId}
            follower={followerData?.data.length}
            setShowAdminMessageModal={setShowAdminMessageModal}
          />
        )}
      </div>

      {showFollower && (
        <FollowCard
          title={`${userData?.data.nickname}님의 팔로워 목록`}
          list={normalizedFollowerList}
          setShow={setShowFollower}
          member_id={member_id}
        />
      )}

      {showFollowing && (
        <FollowCard
          title={`${userData?.data.nickname}님의 팔로잉 목록`}
          list={normalizedFollowingList}
          setShow={setShowFollowing}
          member_id={member_id}
        />
      )}

      {isMessageModalShow && (
        <TextModal
          text="아직 오픈하지 않은 페이지예요!"
          size="lg"
          onClick={() => setIsMessageModalShow((prev) => !prev)}
        />
      )}
    </>
  );
};

export default ProfileCard;
