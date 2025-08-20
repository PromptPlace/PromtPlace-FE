/**
 * TODO:
 * - userId 가져와서 본인의 프로필 홈인지 타인의 프로필 홈인지 구별하는 로직 필요
 *
 * @author 김진효
 * **/

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

import ProfileIcon from '@assets/icon-profile-gray.svg';
import AlarmOffIcon from '@assets/icon-alarm-off.svg';
import AlarmOnIcon from '@assets/icon-alarm-on.svg';
import Arrow from '@assets/icon-vector-bottom.svg?react';
import EditPhoto from '@assets/mobile/icon-mobile-photo.svg';

import FollowButton from '@components/Button/FollowButton';
import PromptCard from './components/PromptCard';
import RecordCard from './components/RecordCard';
import AskCard from './components/AskCard';
import SnsCard from './components/SnsCard';
import CircleButton from '@components/Button/CircleButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import InquiryCard from './components/InquiryCard';
import InquiryDetailCard from './components/InquiryDetailCard';
import FollowCard from './components/FollowCard';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import Select from './components/Select';

import type {
  FollowerWithStatus,
  FollowingWithStatus,
  RequestDeletePromptDto,
  RequestEditMemberDto,
  RequestIntroDto,
} from '@/types/ProfilePage/profile';
import type { RequestDeleteHistoryDto, RequestEditHistoryDto, RequestHistoryDto } from '@/types/ProfilePage/history';
import type { RequestPatchSNSDto, RequestPostSNS } from '@/types/ProfilePage/sns';
import type { RequestGetInquiriesDto } from '@/types/ProfilePage/inquiry';

import useImgUpload from '@hooks/useImgUpload';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';
import useGetFollower from '@/hooks/queries/ProfilePage/useGetFollower';
import useGetFollowing from '@/hooks/queries/ProfilePage/useGetFollowing';
import usePatchEditMember from '@/hooks/mutations/ProfilePage/usePatchEditMember';
import usePostEditIntro from '@/hooks/mutations/ProfilePage/usePostEditIntro';
import useGetHistories from '@/hooks/queries/ProfilePage/useGetHistories';
import usePatchHistories from '@/hooks/mutations/ProfilePage/usePatchHistories';
import useDeleteHistories from '@/hooks/mutations/ProfilePage/useDeleteHistories';
import usePostHistories from '@/hooks/mutations/ProfilePage/usePostHistories';
import useGetPrompts from '@/hooks/queries/ProfilePage/useGetPrompts';
import usePatchDeletePrompts from '@/hooks/mutations/ProfilePage/usePatchDeletePrompts';
import useGetSNS from '@/hooks/queries/ProfilePage/useGetSNS';
import usePatchSNS from '@/hooks/mutations/ProfilePage/usePatchSNS';
import useDeleteSNS from '@/hooks/mutations/ProfilePage/useDeleteSNS';
import usePostSNS from '@/hooks/mutations/ProfilePage/usePostSNS';
import useDeleteFollow from '@/hooks/mutations/ProfilePage/useDeleteFollow';
import usePatchFollow from '@/hooks/mutations/ProfilePage/usePatchFollow';
import useGetInquiries from '@/hooks/queries/ProfilePage/useGetInquiries';
import useGetDetailInquiries from '@/hooks/queries/ProfilePage/useGetDetailInquiries';
import usePostReplyInquiries from '@/hooks/mutations/ProfilePage/usePostReplyInquiries';
import usePatchReadInquiries from '@/hooks/mutations/ProfilePage/usePatchReadInquiries';
import usePostInquiries from '@/hooks/mutations/ProfilePage/usePostInquiries';
import usePostImg from '@/hooks/mutations/ProfilePage/usePostImg';
import { useAuth } from '@/context/AuthContext';
import usePostNotifications from '@/hooks/mutations/ProfilePage/usePostNotifications';
import axios from 'axios';
import TextModal from '@/components/Modal/TextModal';
import useGetNofify from '@/hooks/queries/ProfilePage/useGetNofify';
import useDeleteInquiries from '@/hooks/mutations/ProfilePage/useDeleteInquiries';
import usePatchEditIntro from '@/hooks/mutations/ProfilePage/usePatchEditIntro';

type Inquiry = {
  inquiry_id: number;
  sender_id: number;
  sender_nickname: string;
  type: string;
  status: string;
  title: string;
  updated_at: string;
};

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const myId = user.user_id;
  const isMyProfile = id ? Number(id) === myId : false;
  const member_id = isMyProfile ? myId : Number(id);

  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();

  // 알림 등록 & 취소
  const { mutate: mutateNotification } = usePostNotifications({ member_id });
  const { data: notifyData } = useGetNofify({ member_id });

  const [isAlarmOn, setIsAlarmOn] = useState<{ state: boolean; icon: string }>({
    state: !!notifyData?.data.subscribed,
    icon: !notifyData?.data.subscribed ? AlarmOffIcon : AlarmOnIcon,
  });

  const [isBuyer, setIsBuyer] = useState(true);
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  const [showInquiryDetail, setShowInquiryDetail] = useState<Inquiry | null>(null);

  // 회원 프로필 이미지 등록
  const { mutate: mutatePostImg } = usePostImg({ member_id });

  const { selectedImg, setSelectedImg, handleUpload } = useImgUpload(mutatePostImg);
  const [profileEdit, setProfileEdit] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollower, setShowFollower] = useState(false);

  const [showImgModal, setShowImgModal] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);

  const [type, setType] = useState<RequestGetInquiriesDto>({ type: 'buyer' });

  // 회원 정보 불러오기
  const { data } = useGetMember({ member_id });
  const [userName, setUserName] = useState('');

  // 팔로워, 팔로잉 목록
  const { data: followerData } = useGetFollower({ member_id });
  const { data: followingData } = useGetFollowing({ member_id });
  const { data: myFollowingData } = useGetFollowing({ member_id: user.user_id });

  const [isFollow, setIsFollow] = useState(() =>
    Boolean(myFollowingData?.data.some((f) => f.following_id === member_id)),
  );

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

  // 팔로우, 언팔로우
  const { mutate: mutateFollow } = usePatchFollow({ member_id });
  const { mutate: mutateUnFollow } = useDeleteFollow({ member_id });

  // 회원 정보 수정
  const { mutate } = usePatchEditMember({ member_id });

  // 회원 한줄 소개 작성 및 수정
  const { mutate: mutateIntro } = usePostEditIntro({ member_id });
  const { mutate: mutatePatchIntro } = usePatchEditIntro({ member_id });
  const [userDescription, setUserDescription] = useState('');

  // 작성한 프롬프트 목록
  const { data: promptsData, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPrompts({ member_id });

  const { ref, inView } = useInView({ threshold: 1 });

  // 프롬프트 삭제
  const { mutate: mutateDeletePrompts } = usePatchDeletePrompts({ member_id });
  const [delModal, setDelModal] = useState(false);

  // 회원 이력 조회
  const { data: historyData } = useGetHistories({ member_id });

  // 회원 이력 수정
  const { mutate: mutateHistory } = usePatchHistories({ member_id });

  // 회원 이력 삭제
  const { mutate: mutateDeleteHistory } = useDeleteHistories({ member_id });

  // 회원 이력 작성
  const { mutate: mutatePostHistory } = usePostHistories({ member_id });

  // 회원 SNS 목록
  const { data: snsData } = useGetSNS({ member_id });

  // 회원 SNS 수정
  const { mutate: mutatePatchSNS } = usePatchSNS({ member_id });

  // 회원 SNS 삭제
  const { mutate: mutateDeleteSNS } = useDeleteSNS({ member_id });

  // 회원 SNS 작성
  const { mutate: mutatePostSNS } = usePostSNS({ member_id });

  // 받은 문의 목록
  const { data: inquiryData } = useGetInquiries({ member_id }, { type: type.type });

  // 문의 상세 정보
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(null);
  const { data: inquiryDetailData } = useGetDetailInquiries({ member_id }, { inquiry_id: selectedInquiryId });

  // 문의 삭제
  const { mutate: mutateDeleteInquiry } = useDeleteInquiries({ member_id });

  // 문의 답변하기
  const { mutate: mutatePostReplyInquiries } = usePostReplyInquiries({ member_id });

  // 문의 읽음 처리
  const { mutate: mutateReadInquiries } = usePatchReadInquiries({ member_id });

  // 문의하기
  const { mutate: mutatePostInquiries } = usePostInquiries({ member_id });

  const menuList = [
    {
      id: 0,
      label: '작성 프롬프트',
      selected: true,
    },
    { id: 1, label: '프롬프터 이력', selected: false },
    { id: 2, label: `${isMyProfile ? '문의함' : '문의하기'}`, selected: false },
    { id: 3, label: 'SNS', selected: false },
  ];

  const [menuId, setMenuId] = useState(0);

  // 이름 및 소개 수정
  const handleEditMember = () => {
    setUserName(data?.data.nickname || '');
    setUserDescription(data?.data.intros || '');
    setProfileEdit(true);
  };

  // 이름 및 소개 수정 완료
  const handleEditSubmit = ({ nickname }: RequestEditMemberDto, { intro }: RequestIntroDto) => {
    mutate({ nickname });

    if (!data?.data.intros) {
      mutateIntro({ intro });
    } else {
      mutatePatchIntro({ intro });
    }
    setProfileEdit(false);
  };

  // 팔로우 및 팔로잉
  const handleFollow = () => {
    handleShowLoginModal(() => {
      if (isFollow) {
        mutateUnFollow({ member_id });
      } else {
        mutateFollow({ member_id });
      }
      setIsFollow((prev) => !prev);
    });
  };

  // 프롬프트 삭제
  const handleDeletePrompts = ({ prompt_id }: RequestDeletePromptDto) => {
    mutateDeletePrompts(
      { prompt_id },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            // 구매 이력 있는 경우
            if (status === 400) {
              setDelModal((prev) => !prev);
            }
          }
        },
      },
    );
  };

  // 회원 이력 작성
  const handleAddNewDescription = ({ history }: RequestHistoryDto) => {
    mutatePostHistory({ history });
  };

  // 회원 이력 삭제
  const handleDeleteDescription = ({ history_id }: RequestDeleteHistoryDto) => {
    mutateDeleteHistory({ history_id });
  };

  // 회원 이력 수정
  const handleUpdateDescription = ({ history_id, history }: RequestEditHistoryDto) => {
    mutateHistory({ history_id, history });
  };

  // 회원 SNS 삭제
  const handleDeleteSns = ({ sns_id }: { sns_id: number }) => {
    mutateDeleteSNS({ sns_id });
  };

  // 회원 SNS 작성
  const handleAddSns = ({ url, description }: RequestPostSNS) => {
    mutatePostSNS({ url, description });
  };

  // 회원 SNS 수정
  const handleUpdateSns = ({ sns_id, url, description }: { sns_id: number } & RequestPatchSNSDto) => {
    mutatePatchSNS({ sns_id, url, description });
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col justify-center pt-[120px] max-lg:pt-[12px] items-center lg:max-w-[1440px] lg:w-full lg:m-auto">
      <div className="lg:px-[102px] w-full flex flex-col justify-center">
        <div
          className={clsx(
            'p-[10px] flex items-center max-lg:flex-col max-lg:justify-center max-lg:p-0 relative',
            !isMyProfile && 'gap-[60px] max-lg:gap-[8px]',
            isMyProfile && 'gap-[7vw] max-lg:gap-[8px]',
          )}>
          {profileEdit && (
            <div className="lg:hidden max-lg:absolute max-lg:bottom-0 max-lg:right-0 z-20 max-lg:top-[33px] max-lg:left-1/2 max-lg:translate-x-1/20">
              <img onClick={() => setShowImgModal(true)} src={EditPhoto} alt="사진 수정하기" />
              {showImgModal && (
                <div className="absolute top-[20px] flex flex-col shadow-button-hover">
                  <div
                    onClick={() => {
                      imageRef.current?.click();
                      setShowImgModal(false);
                    }}
                    className="rounded-t-[4px] border-b border-b-white-stroke bg-secondary py-[4px] px-[12px] text-text-on-background text-[10px] font-normal leading-[13px]">
                    가져오기
                  </div>
                  <div
                    onClick={() => {
                      setSelectedImg(null);
                      setShowImgModal(false);
                    }}
                    className="cursor-pointer rounded-b-[4px] border-b border-b-white-stroke bg-secondary py-[4px] px-[12px] text-text-on-background text-[10px] font-normal leading-[13px]">
                    삭제하기
                  </div>
                </div>
              )}
            </div>
          )}
          <div
            className={clsx(
              'flex gap-[28px] max-lg:gap-[8px] items-center max-lg:flex-col',
              profileEdit && 'items-center',
            )}>
            <div className="flex flex-col items-center w-full">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden max-lg:w-[48px] max-lg:h-[48px] max-lg:relative max-lg:10">
                {isMyProfile && (
                  <>
                    <img
                      src={data?.data.profile_image || ProfileIcon}
                      alt="프로필 이미지"
                      className="w-full h-full object-cover"
                    />
                  </>
                )}
                {!isMyProfile && (
                  <img
                    src={data?.data.profile_image || ProfileIcon}
                    alt="프로필 이미지"
                    className="w-full h-full object-contain"
                  />
                )}
                {profileEdit && <img src={selectedImg?.thumbnail} alt="프로필 이미지" />}
              </div>
              {profileEdit && (
                <div className="mt-[10px] max-lg:hidden">
                  <PrimaryButton
                    buttonType="change"
                    text="사진 변경하기"
                    onClick={() => {
                      imageRef.current?.click();
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageRef}
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              )}
            </div>

            <div
              className={clsx(
                profileEdit && 'gap-[15px]',
                'flex flex-col gap-[5px] max-lg:gap-[4px] text-text-on-white shrink-0 max-lg:items-center',
              )}>
              {!profileEdit && (
                <div className="flex gap-[4px] max-lg:justify-center">
                  <p className="text-[32px] font-bold leading-[40px] max-lg:text-[16px] max-lg:font-medium max-lg:leading-[20px] ">
                    {data?.data.nickname}
                  </p>
                  {!isMyProfile && (
                    <div
                      onClick={() => {
                        if (isFollow) {
                          mutateNotification({ prompter_id: member_id });
                          setIsAlarmOn((prev) => ({
                            state: !prev.state,
                            icon: prev.state ? AlarmOffIcon : AlarmOnIcon,
                          }));
                        }
                      }}
                      className={clsx(
                        'lg:hidden w-[20px] h-[20px] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out p-[3px]',
                        !notifyData?.data.subscribed && 'border border-text-on-background',
                        notifyData?.data.subscribed && 'border border-primary',
                      )}>
                      <img src={isAlarmOn.icon} alt="알림" className="w-full h-full object-contain" />
                    </div>
                  )}
                  {isMyProfile && (
                    <div className="lg:hidden">
                      <CircleButton
                        buttonType="edit"
                        size="md"
                        onClick={() => {
                          handleEditMember();
                        }}
                        isActive={profileEdit}
                      />
                    </div>
                  )}
                </div>
              )}
              {profileEdit && (
                <div className="max-lg:flex max-lg:gap-[4px]">
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="text-[32px] font-bold leading-[40px] outline-none text-primary placeholder:text-primary w-[175px] border-b border-primary max-lg:text-[16px] max-lg:leading-[20px] max-lg:font-medium max-lg:border-b max-lg:w-max max-lg:max-w-[45px]"
                    placeholder={userName}
                  />
                  <div className={clsx('lg:hidden max-lg:relative', showImgModal && 'z-10', !showImgModal && 'z-30')}>
                    <CircleButton
                      buttonType="edit"
                      size="md"
                      onClick={() => {
                        handleEditSubmit({ nickname: userName }, { intro: userDescription });
                      }}
                      isActive={profileEdit}
                    />
                  </div>
                </div>
              )}
              {!profileEdit && (
                <p className="text-[20px] font-medium leading-[25px] max-lg:text-[12px] max-lg:font-medium max-lg:leading-[15px]">
                  {data?.data.intros}
                </p>
              )}
              {profileEdit && (
                <input
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  placeholder={userDescription}
                  className="text-[20px] font-medium leading-[25px] placeholder:text-primary outline-none text-primary lg:w-[219px] max-lg:w-[79px] border-b border-primary max-lg:text-[12px] max-lg:font-medium max-lg:leading-[15px] max-lg:border-b max-lg:relative max-lg:z-300"
                />
              )}
            </div>
            {isMyProfile && (
              <div className="shrink-0 flex flex-col gap-[13px] items-center max-lg:hidden">
                <CircleButton
                  buttonType="edit"
                  size="md"
                  onClick={() => {
                    handleEditMember();
                  }}
                  isActive={profileEdit}
                />
                {profileEdit && (
                  <PrimaryButton
                    buttonType="squareMini"
                    text="완료"
                    onClick={() => {
                      handleEditSubmit({ nickname: userName }, { intro: userDescription });
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {!isMyProfile && (
            <>
              <div className="flex flex-col gap-[5px] items-center max-lg:flex-row">
                <p className="text-primary-hover text-[18px] font-normal leading-[23px] max-lg:text-[10px] max-lg:leading-[13px]">
                  팔로워
                </p>
                <div className="px-[10px] max-lg:px-[6px] py-[5px] max-lg:py-[2px] border border-primary-hover bg-primary-hover rounded-[50px] text-white text-[20px] font-medium leading-[25px] text-center max-lg:text-[12px] max-lg:leading-[15px]">
                  {followerData?.data.length}
                </div>

                <div className="lg:hidden max-lg:ml-[3px]">
                  <FollowButton follow={isFollow} onClick={handleFollow} size="sm" />
                </div>
              </div>

              <div className="flex gap-[24px] items-center max-lg:hidden">
                <div className="max-lg:hidden">
                  <FollowButton follow={isFollow} onClick={handleFollow} size="lg" />
                </div>

                <div
                  onClick={() => {
                    mutateNotification({ prompter_id: member_id });
                    setIsAlarmOn((prev) => ({
                      state: !prev.state,
                      icon: prev.state ? AlarmOffIcon : AlarmOnIcon,
                    }));
                  }}
                  className={clsx(
                    'max-lg:hidden w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out',
                    !notifyData?.data.subscribed && 'border border-text-on-background',
                    notifyData?.data.subscribed && 'border border-primary',
                  )}>
                  <img src={isAlarmOn.icon} alt="알림" />
                </div>
              </div>
            </>
          )}

          {isMyProfile && (
            <>
              <div className="flex gap-[28px] max-lg:gap-[16px]">
                <div className="flex flex-col gap-[5px] items-center max-lg:flex-row">
                  <p className="text-primary-hover text-[18px] font-normal leading-[23px] max-lg:text-[10px] max-lg:leading-[13px]">
                    팔로워
                  </p>
                  <div
                    onClick={() => setShowFollower(true)}
                    className="cursor-pointer px-[10px] py-[5px] border border-primary-hover bg-primary-hover rounded-[50px] text-white text-[20px] font-medium leading-[25px] text-center max-lg:py-[2px] max-lg:px-[6px] max-lg:text-[12px] max-lg:leading-[15px]">
                    {followerData?.data.length}
                  </div>
                </div>
                <div className="flex flex-col gap-[5px] items-center max-lg:flex-row">
                  <p className="text-primary-hover text-[18px] font-normal leading-[23px] max-lg:text-[10px] max-lg:leading-[13px]">
                    팔로잉
                  </p>
                  <div
                    onClick={() => setShowFollowing(true)}
                    className="cursor-pointer px-[10px] py-[5px] border border-primary-hover bg-primary-hover rounded-[50px] text-white text-[20px] font-medium leading-[25px] text-center  max-lg:py-[2px] max-lg:px-[6px] max-lg:text-[12px] max-lg:leading-[15px]">
                    {followingData?.data.length}
                  </div>
                </div>
              </div>
              {showFollower && (
                <FollowCard
                  title={`${data?.data.nickname}님의 팔로워 목록`}
                  list={normalizedFollowerList}
                  setShow={setShowFollower}
                  member_id={member_id}
                />
              )}
              {showFollowing && (
                <FollowCard
                  title={`${data?.data.nickname}님의 팔로잉 목록`}
                  list={normalizedFollowingList}
                  setShow={setShowFollowing}
                  member_id={member_id}
                />
              )}
            </>
          )}
        </div>

        <div className="px-[20px] flex lg:hidden max-lg:mt-[12px]">
          {menuId !== 2 && <Select menuList={menuList} menuId={menuId} setMenuId={setMenuId} />}
          {menuId === 2 && isMyProfile && (
            <div className="flex items-start justify-between w-full">
              <Select menuList={menuList} menuId={menuId} setMenuId={setMenuId} />
              <div className="flex mt-[6px]">
                <div
                  onClick={() => {
                    setIsBuyer(true);
                    setType({ type: 'buyer' });
                  }}
                  className={clsx(
                    'cursor-pointer rounded-[4px] py-[6px] w-[90px] text-[10px] font-normal leading-[13px] flex justify-center',
                    isBuyer && 'bg-primary-hover text-white',
                    !isBuyer && 'bg-white text-text-on-white',
                  )}>
                  구매자 문의
                </div>
                <div
                  onClick={() => {
                    setIsBuyer(false);
                    setType({ type: 'non_buyer' });
                  }}
                  className={clsx(
                    'cursor-pointer rounded-[4px] py-[6px] w-[90px] text-[10px] font-normal leading-[13px] flex justify-center',
                    !isBuyer && 'bg-primary-hover text-white',
                    isBuyer && 'bg-white text-text-on-white',
                  )}>
                  비구매자 문의
                </div>
              </div>
            </div>
          )}
          {menuId === 2 && !isMyProfile && (
            <div className="flex items-start justify-between w-full">
              <Select menuList={menuList} menuId={menuId} setMenuId={setMenuId} />
              <div className="flex mt-[6px]">
                <div
                  onClick={() => setType({ type: 'buyer' })}
                  className={clsx(
                    'cursor-pointer rounded-[4px] py-[6px] w-[90px] text-[10px] font-normal leading-[13px] flex justify-center',
                    type.type === 'buyer' && 'bg-primary-hover text-white',
                    type.type === 'non_buyer' && 'bg-white text-text-on-white',
                  )}>
                  구매자 문의
                </div>
                <div
                  onClick={() => setType({ type: 'non_buyer' })}
                  className={clsx(
                    'cursor-pointer rounded-[4px] py-[6px] w-[90px] text-[10px] font-normal leading-[13px] flex justify-center',
                    type.type === 'non_buyer' && 'bg-primary-hover text-white',
                    type.type === 'buyer' && 'bg-white text-text-on-white',
                  )}>
                  비구매자 문의
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center max-lg:pl-[20px] max-lg:pr-[20px] mt-[40px] max-lg:mt-[42px]">
          <div className="w-full">
            <div className="max-lg:hidden flex w-full justify-between border-b border-text-on-background">
              {menuList.map((menu) => (
                <div
                  key={menu.id}
                  onClick={() => setMenuId(menu.id)}
                  className={clsx(
                    'max-w-[309px] w-full px-[10px] py-[20px] cursor-pointer text-[24px] font-bold leading-[30px] text-center',
                    menuId === menu.id && 'border-b-[3px] border-b-primary text-primary-hover ',
                    menuId !== menu.id && 'text-text-on-background',
                  )}>
                  {menu.label}
                </div>
              ))}
            </div>

            {menuId === 0 && (
              <>
                {delModal && (
                  <TextModal
                    text="판매된 프롬프트는 삭제할 수 없습니다."
                    onClick={() => setDelModal(false)}
                    size="lg"
                  />
                )}
                <div className="pr-[8px] bg-white max-lg:bg-transparent max-lg:p-0">
                  <div className="w-full max-h-[368px] overflow-y-auto">
                    {promptsData?.pages.map((page, pageIdx) =>
                      page.data.prompts.map((prompt, idx) => {
                        const last = pageIdx === promptsData.pages.length - 1 && idx === page.data.prompts.length - 1;
                        return (
                          <div ref={last ? ref : undefined} key={prompt.prompt_id}>
                            <PromptCard
                              key={prompt.prompt_id}
                              id={prompt.prompt_id}
                              title={prompt.title}
                              model={prompt.models}
                              tags={prompt.tags}
                              isMyProfile={isMyProfile}
                              handleDeletePrompts={() => {
                                handleDeletePrompts({ prompt_id: prompt.prompt_id });
                              }}
                            />
                          </div>
                        );
                      }),
                    )}
                  </div>
                </div>
              </>
            )}

            {menuId === 1 && (
              <>
                <div className="flex flex-col items-center pr-[8px] bg-white h-full max-lg:bg-transparent max-lg:p-0">
                  <div
                    className={clsx(
                      'w-full overflow-y-auto bg-white',
                      !isMyProfile && 'max-h-[368px]',
                      isMyProfile && 'max-h-[279px]',
                    )}>
                    {historyData?.data.map((history) => (
                      <RecordCard
                        key={history.history_id}
                        history_id={history.history_id}
                        description={history.history}
                        isMyProfile={isMyProfile}
                        handleDelete={handleDeleteDescription}
                        setDescriptions={handleUpdateDescription}
                      />
                    ))}
                  </div>
                </div>
                {isMyProfile && (
                  <div className="mt-[50px] max-lg:mt-[12px] w-full flex justify-center">
                    <PrimaryButton
                      buttonType="plus"
                      text="+"
                      onClick={() => handleAddNewDescription({ history: ' ' })}
                    />
                  </div>
                )}
              </>
            )}

            {menuId === 2 && !isMyProfile && (
              <AskCard
                prompts={promptsData}
                isMyProfile={isMyProfile}
                type={type}
                setType={setType}
                member_id={member_id}
                mutatePostInquiries={mutatePostInquiries}
              />
            )}

            {menuId === 2 && isMyProfile && (
              <>
                <div className="relative text-text-on-white text-[20px] font-bold leading-[30px] flex gap-[10px] p-[10px] items-center py-[30px] px-[80px] bg-white max-lg:hidden">
                  {isBuyer && <p>구매자 문의</p>}
                  {!isBuyer && <p>비구매자 문의</p>}
                  <div
                    onClick={() => setIsArrowClicked(true)}
                    className="w-[24px] h-[24px] py-[8px] px-[6px] rounded-full cursor-pointer hover:bg-primary-hover hover:text-white hover:shadow-gradient active:bg-primary-pressed active:shadow-gradient active:text-white">
                    <Arrow />
                  </div>
                  {isArrowClicked && (
                    <div
                      onClick={() => {
                        setType((prev) => (prev.type === 'buyer' ? { type: 'non_buyer' } : { type: 'buyer' }));
                        setIsBuyer((prev) => !prev);
                        setIsArrowClicked(false);
                        setShowInquiryDetail(null);
                      }}
                      className="absolute top-[64.5px] left-[110px] cursor-pointer rounded-[8px] border border-white-stroke bg-white shadow-button-hover py-[10px] px-[20px] text-text-on-background text-[18px] font-normal leading-[23px] hover:bg-secondary active:bg-secondary-pressed active:text-text-on-white">
                      {isBuyer ? '비구매자 문의' : '구매자 문의'}
                    </div>
                  )}
                </div>
                <div className="pr-[8px] bg-white max-lg:hidden">
                  <div className="max-h-[316px] overflow-auto">
                    {showInquiryDetail === null &&
                      inquiryData?.data
                        .filter((i) => (isBuyer ? i.type === 'buyer' : i.type === 'non_buyer'))
                        .map((i) => (
                          <InquiryCard
                            key={i.inquiry_id}
                            inquiry_id={i.inquiry_id}
                            created_at={i.created_at}
                            status={i.status}
                            sender_nickname={i.sender_nickname}
                            onClick={() => {
                              setSelectedInquiryId(i.inquiry_id);
                              setShowInquiryDetail(i);
                            }}
                            onRead={(id) => {
                              mutateReadInquiries({ inquiry_id: id });
                            }}
                            onDelete={(id) => {
                              mutateDeleteInquiry({ inquiry_id: id });
                            }}
                          />
                        ))}
                  </div>
                </div>

                <div className="max-lg:hidden">
                  {showInquiryDetail !== null && inquiryDetailData && (
                    <InquiryDetailCard
                      inquiry={inquiryDetailData!}
                      onClick={() => {
                        setShowInquiryDetail(null);
                      }}
                      setShowMsgMoldal={setShowMsgModal}
                      mutatePostReplyInquiries={mutatePostReplyInquiries}
                      mutateReadInquiries={mutateReadInquiries}
                      setShowInquiryDetail={setShowInquiryDetail}
                    />
                  )}
                </div>

                <div className="pr-[8px] bg-transparent lg:hidden max-lg:mt-[-30px]">
                  <div className="max-h-[316px] overflow-auto">
                    {inquiryData?.data
                      .filter((i) => (isBuyer ? i.type === 'buyer' : i.type === 'non_buyer'))
                      .map((i) => (
                        <InquiryCard
                          key={i.inquiry_id}
                          inquiry_id={i.inquiry_id}
                          created_at={i.created_at}
                          status={i.status}
                          sender_nickname={i.sender_nickname}
                          onClick={() => {
                            setSelectedInquiryId(i.inquiry_id);
                            setShowInquiryDetail(i);
                            setShowMsgModal(true);
                          }}
                          onRead={(id) => {
                            mutateReadInquiries({ inquiry_id: id });
                          }}
                          onDelete={(id) => {
                            mutateDeleteInquiry({ inquiry_id: id });
                          }}
                        />
                      ))}
                  </div>
                </div>

                <div className="lg:hidden">
                  {showInquiryDetail !== null && showMsgModal === true && inquiryDetailData && (
                    <InquiryDetailCard
                      inquiry={inquiryDetailData!}
                      onClick={() => {
                        setShowMsgModal(false);
                      }}
                      setShowMsgMoldal={setShowMsgModal}
                      mutatePostReplyInquiries={mutatePostReplyInquiries}
                      mutateReadInquiries={mutateReadInquiries}
                      setShowInquiryDetail={setShowInquiryDetail}
                    />
                  )}
                </div>
              </>
            )}

            {menuId === 3 && (
              <div className="flex flex-col items-center">
                <div className="w-full max-h-[368px] overflow-y-auto">
                  {snsData?.data.map((sns) => (
                    <SnsCard
                      key={sns.sns_id}
                      sns_id={sns.sns_id}
                      description={sns.description}
                      url={sns.url}
                      isMyProfile={isMyProfile}
                      handleDeleteSns={handleDeleteSns}
                      handleUpdateSns={handleUpdateSns}
                    />
                  ))}
                </div>
                {isMyProfile && (
                  <div className="mt-[50px] max-lg:mt-[12px]">
                    <PrimaryButton
                      buttonType="plus"
                      text="+"
                      onClick={() => {
                        handleAddSns({ url: 'https://example.com', description: ' ' });
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
    </div>
  );
};

export default ProfilePage;
