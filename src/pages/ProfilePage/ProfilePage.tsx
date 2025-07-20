/**
 * TODO:
 * - userId 가져와서 본인의 프로필 홈인지 타인의 프로필 홈인지 구별하는 로직 필요
 *
 * @author 김진효
 * **/

import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import ProfileIcon from '@assets/icon-profile-gray.svg';
import AlarmOffIcon from '@assets/icon-alarm-off.svg';
import AlarmOnIcon from '@assets/icon-alarm-on.svg';
import UserProfileIcon from '@assets/img-example-profile2.jpg';
import Arrow from '@assets/icon-vector-bottom.svg?react';

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

import DESCRIPTION from '@data/ProfilePage/description.json';
import PROMPT from '@data/ProfilePage/prompt.json';
import SNS from '@data/ProfilePage/sns.json';
import INQUIRY from '@data/ProfilePage/inquiry.json';
import FOLLOWING from '@data/ProfilePage/following.json';
import FOLLOWER from '@data/ProfilePage/follower.json';

import useImgUpload from '@hooks/useImgUpload';

const USER = {
  member_id: 12345,
  name: '울랄라',
  description: '5년차 백엔드 개발자!',
};

type Inquiry = {
  inquiry_id: number;
  sender_id: number;
  sender_nickname: string;
  type: string;
  status: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const ProfilePage = () => {
  const { id } = useParams();
  const myId = localStorage.getItem('user_id'); // 로그인 시 저장 필요
  const isMyProfile = id === myId; // 현재 10인 경우 본인 페이지로 이동됨

  const [descriptions, setDescriptions] = useState(DESCRIPTION.map((d) => ({ ...d, isEditing: false })));

  const [isFollow, setIsFollow] = useState(false);

  const [isAlarmOn, setIsAlarmOn] = useState<{ state: boolean; icon: string }>({
    state: false,
    icon: AlarmOffIcon,
  });

  const [prompts, setPrompts] = useState(PROMPT);

  const [isBuyer, setIsBuyer] = useState(true);
  const [isArrowClicked, setIsArrowClicked] = useState(false);

  const [inquiries, setInquiries] = useState(INQUIRY);
  const [showInquiryDetail, setShowInquiryDetail] = useState<Inquiry | null>(null);

  const [sns, setSns] = useState(SNS.map((s) => ({ ...s, isEditing: false })));

  const { selectedImg, handleUpload } = useImgUpload();
  const [profileEdit, setProfileEdit] = useState(false);
  const [userName, setUserName] = useState(USER.name);
  const [userDescription, setUserDescription] = useState(USER.description);
  const imageRef = useRef<HTMLInputElement>(null);

  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollower, setShowFollower] = useState(false);

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

  const handleDeletePrompts = (id: number) => {
    setPrompts((prev) => prev.filter((p) => p.prompt_id !== id));
  };

  const handleAddNewDescription = () => {
    const newId = descriptions.length ? descriptions[descriptions.length - 1].history_id + 1 : 1;

    const newDescription = {
      history_id: newId,
      description: '',
      isEditing: true,
    };

    setDescriptions([...descriptions, newDescription]);
  };

  const handleDeleteDescription = (id: number) => {
    setDescriptions((prev) => prev.filter((d) => d.history_id !== id));
  };

  const handleUpdateDescription = (id: number, value: string) => {
    setDescriptions((prev) =>
      prev.map((item) => (item.history_id === id ? { ...item, description: value, isEditing: false } : item)),
    );
  };

  const handleDeleteSns = (id: number) => {
    setSns((prev) => prev.filter((s) => s.sns_id !== id));
  };

  const handleAddSns = () => {
    const sns_newId = sns.length ? sns[sns.length - 1].sns_id + 1 : 1;

    const newSns = {
      sns_id: sns_newId,
      user_id: 1024,
      url: '',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z',
      description: '',
      isEditing: true,
    };

    setSns([...sns, newSns]);
  };

  const handleUpdateSns = (id: number, value: string, url: string) => {
    setSns((prev) => prev.map((s) => (s.sns_id === id ? { ...s, description: value, isEditing: false, url: url } : s)));
  };

  return (
    <div className="flex flex-col pt-[120px]">
      <div
        className={clsx(
          'p-[10px] pl-[220px] flex items-center',
          !isMyProfile && 'gap-[60px]',
          isMyProfile && 'gap-[7vw]',
        )}>
        <div className={clsx('flex gap-[28px] items-center', profileEdit && 'items-center')}>
          <div className="flex flex-col items-center w-full">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              {isMyProfile && (
                <img
                  src={selectedImg?.thumbnail || UserProfileIcon}
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                />
              )}
              {!isMyProfile && <img src={ProfileIcon} alt="프로필 이미지" className="w-full h-full object-contain" />}
              {profileEdit && <img src={selectedImg?.thumbnail} alt="프로필 이미지" />}
            </div>
            {profileEdit && (
              <div className="mt-[10px]">
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

          <div className="flex flex-col gap-[5px] text-text-on-white shrink-0">
            {!profileEdit && <p className="text-[32px] font-bold leading-[40px]">{userName}</p>}
            {profileEdit && (
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-[32px] font-bold leading-[40px] outline-none text-primary placeholder:text-primary w-[175px]"
                placeholder={USER.name}
              />
            )}
            {!profileEdit && <p className="text-[20px] font-medium leading-[25px]">{userDescription}</p>}
            {profileEdit && (
              <input
                value={userDescription}
                onChange={(e) => setUserDescription(e.target.value)}
                placeholder={userDescription}
                className="text-[20px] font-medium leading-[25px] placeholder:text-primary outline-none text-primary w-[219px]"
              />
            )}
          </div>
          {isMyProfile && (
            <div className="shrink-0 flex flex-col gap-[13px] items-center">
              <CircleButton
                buttonType="edit"
                size="md"
                onClick={() => {
                  setProfileEdit(true);
                }}
                isActive={profileEdit}
              />
              {profileEdit && (
                <PrimaryButton
                  buttonType="squareMini"
                  text="완료"
                  onClick={() => {
                    setProfileEdit(false);
                  }}
                />
              )}
            </div>
          )}
        </div>

        {!isMyProfile && (
          <>
            <div className="flex flex-col gap-[5px] items-center">
              <p className="text-primary-hover text-[18px] font-normal leading-[23px]">팔로워</p>
              <div className="px-[10px] py-[5px] border border-primary-hover bg-primary-hover rounded-[50px] text-white text-[20px] font-medium leading-[25px] text-center">
                90
              </div>
            </div>

            <div className="flex gap-[24px] items-center">
              <FollowButton
                follow={isFollow}
                onClick={() => {
                  setIsFollow((prev) => !prev);
                }}
                size="lg"
              />

              <div
                onClick={() =>
                  setIsAlarmOn((prev) => ({ state: !prev.state, icon: prev.state ? AlarmOffIcon : AlarmOnIcon }))
                }
                className={clsx(
                  'w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out',
                  !isAlarmOn.state && 'border border-text-on-background',
                  isAlarmOn.state && 'border border-primary bg-red-500',
                )}>
                <img src={isAlarmOn.icon} alt="알림" />
              </div>
            </div>
          </>
        )}

        {isMyProfile && (
          <>
            <div className="flex gap-[28px]">
              <div className="flex flex-col gap-[5px] items-center">
                <p className="text-primary-hover text-[18px] font-normal leading-[23px]">팔로워</p>
                <div
                  onClick={() => setShowFollower(true)}
                  className="cursor-pointer px-[10px] py-[5px] border border-primary-hover bg-primary-hover rounded-[50px] text-white text-[20px] font-medium leading-[25px] text-center">
                  1091
                </div>
              </div>
              <div className="flex flex-col gap-[5px] items-center">
                <p className="text-primary-hover text-[18px] font-normal leading-[23px]">팔로잉</p>
                <div
                  onClick={() => setShowFollowing(true)}
                  className="cursor-pointer px-[10px] py-[5px] border border-primary-hover bg-primary-hover rounded-[50px] text-white text-[20px] font-medium leading-[25px] text-center">
                  215
                </div>
              </div>
            </div>
            {showFollower && (
              <FollowCard
                title={`${userName}님의 팔로워 목록`}
                list={FOLLOWER}
                setShow={setShowFollower}
                status={false}
              />
            )}
            {showFollowing && (
              <FollowCard
                title={`${userName}님의 팔로잉 목록`}
                list={FOLLOWING}
                setShow={setShowFollowing}
                status={true}
              />
            )}
          </>
        )}
      </div>

      <div className="flex flex-col items-center justify-center px-[102px] mt-[40px]">
        <div className="w-full">
          <div className="flex w-full justify-between border-b border-text-on-background">
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
            <div className="pr-[8px] bg-white">
              <div className="w-full max-h-[368px] overflow-y-auto">
                {prompts.map((prompt) => (
                  <PromptCard
                    key={prompt.prompt_id}
                    id={prompt.prompt_id}
                    title={prompt.title}
                    model={prompt.model}
                    tags={prompt.tags}
                    isMyProfile={isMyProfile}
                    handleDeletePrompts={() => handleDeletePrompts(prompt.prompt_id)}
                  />
                ))}
              </div>
            </div>
          )}

          {menuId === 1 && (
            <>
              <div className="flex flex-col items-center pr-[8px] bg-white h-full">
                <div
                  className={clsx(
                    'w-full overflow-y-auto bg-white',
                    !isMyProfile && 'max-h-[368px]',
                    isMyProfile && 'max-h-[279px]',
                  )}>
                  {descriptions.map((description) => (
                    <RecordCard
                      key={description.history_id}
                      history_id={description.history_id}
                      description={description.description}
                      isMyProfile={isMyProfile}
                      isEditing={description.isEditing}
                      handleDelete={handleDeleteDescription}
                      setDescriptions={handleUpdateDescription}
                    />
                  ))}
                </div>
              </div>
              {isMyProfile && (
                <div className="mt-[50px] w-full flex justify-center">
                  <PrimaryButton buttonType="plus" text="+" onClick={handleAddNewDescription} />
                </div>
              )}
            </>
          )}

          {menuId === 2 && !isMyProfile && <AskCard prompts={PROMPT} isMyProfile={isMyProfile} />}
          {menuId === 2 && isMyProfile && (
            <>
              <div className="relative text-text-on-white text-[20px] font-bold leading-[30px] flex gap-[10px] p-[10px] items-center py-[30px] px-[80px] bg-white">
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
                      setIsBuyer((prev) => !prev);
                      setIsArrowClicked(false);
                      setShowInquiryDetail(null);
                    }}
                    className="absolute top-[64.5px] left-[110px] cursor-pointer rounded-[8px] border border-white-stroke bg-white shadow-button-hover py-[10px] px-[20px] text-text-on-background text-[18px] font-normal leading-[23px] hover:bg-secondary active:bg-secondary-pressed active:text-text-on-white">
                    {isBuyer ? '비구매자 문의' : '구매자 문의'}
                  </div>
                )}
              </div>
              <div className="pr-[8px] bg-white">
                <div className="max-h-[316px] overflow-auto">
                  {showInquiryDetail === null &&
                    inquiries
                      .filter((i) => (isBuyer ? i.type === 'buyer' : i.type === 'non-buyer'))
                      .map((i) => (
                        <InquiryCard
                          key={i.inquiry_id}
                          created_at={i.created_at}
                          status={i.status}
                          sender_nickname={i.sender_nickname}
                          onClick={() => setShowInquiryDetail(i)}
                        />
                      ))}
                </div>
              </div>

              <div>
                {showInquiryDetail !== null && (
                  <InquiryDetailCard
                    inquiry={showInquiryDetail}
                    onClick={() => {
                      setShowInquiryDetail(null);
                      setInquiries((prev) =>
                        prev.map((i) => (i.inquiry_id === showInquiryDetail.inquiry_id ? { ...i, status: 'read' } : i)),
                      );
                    }}
                  />
                )}
              </div>
            </>
          )}

          {menuId === 3 && (
            <div className="flex flex-col items-center">
              <div className="w-full max-h-[368px] overflow-y-auto">
                {sns.map((sns) => (
                  <SnsCard
                    key={sns.sns_id}
                    sns_id={sns.sns_id}
                    description={sns.description}
                    url={sns.url}
                    isMyProfile={isMyProfile}
                    handleDeleteSns={() => handleDeleteSns(sns.sns_id)}
                    handleUpdateSns={() => handleUpdateSns(sns.sns_id, sns.description, sns.url)}
                    isEditing={sns.isEditing}
                  />
                ))}
              </div>
              {isMyProfile && (
                <div onClick={handleAddSns} className="mt-[50px]">
                  <PrimaryButton buttonType="plus" text="+" onClick={() => {}} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
