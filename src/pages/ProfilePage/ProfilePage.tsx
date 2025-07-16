/**
 * TODO:
 * - userId 가져와서 본인의 프로필 홈인지 타인의 프로필 홈인지 구별하는 로직 필요
 *
 * @author 김진효
 * **/

import { useParams } from 'react-router-dom';
import ProfileIcon from '@assets/icon-profile-gray.svg';
import FollowButton from '@/components/Button/FollowButton';
import AlarmOffIcon from '@assets/icon-alarm-off.svg';
import AlarmOnIcon from '@assets/icon-alarm-on.svg';
import { useState } from 'react';
import clsx from 'clsx';
import PromptCard from './components/PromptCard';
import RecordCard from './components/RecordCard';

const USER = {
  member_id: 12345,
  name: '울랄라',
};

const PROMPT = [
  {
    prompt_id: 1,
    title: '파이썬으로 5분안에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: [
      {
        tag_id: 1,
        name: '개발',
      },
      {
        tag_id: 2,
        name: '파이썬',
      },
      {
        tag_id: 3,
        name: '코딩',
      },
    ],
  },
  {
    prompt_id: 2,
    title: '파이썬으로 5분안에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: [
      {
        tag_id: 1,
        name: '개발',
      },
      {
        tag_id: 2,
        name: '파이썬',
      },
      {
        tag_id: 3,
        name: '코딩',
      },
    ],
  },
  {
    prompt_id: 3,
    title: '파이썬으로 5분안에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: [
      {
        tag_id: 1,
        name: '개발',
      },
      {
        tag_id: 2,
        name: '파이썬',
      },
      {
        tag_id: 3,
        name: '코딩',
      },
    ],
  },
  {
    prompt_id: 3,
    title: '파이썬으로 5분안에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: [
      {
        tag_id: 1,
        name: '개발',
      },
      {
        tag_id: 2,
        name: '파이썬',
      },
      {
        tag_id: 3,
        name: '코딩',
      },
    ],
  },
  {
    prompt_id: 3,
    title: '파이썬으로 5분안에 구슬깨기 게임 만들어주는 프롬프트',
    model: 'Claude',
    tags: [
      {
        tag_id: 1,
        name: '개발',
      },
      {
        tag_id: 2,
        name: '파이썬',
      },
      {
        tag_id: 3,
        name: '코딩',
      },
    ],
  },
];

const DESCRIPTION = [
  { history_id: 1, description: '2023년 심포니 해커톤 준우승' },
  { history_id: 2, description: '2024년 프롬프트 엔지니어 자격증 취득' },
  { history_id: 3, description: '2023년 심포니 해커톤 준우승' },
  { history_id: 4, description: '2023년 심포니 해커톤 준우승' },
  { history_id: 5, description: '2023년 심포니 해커톤 준우승' },
  { history_id: 6, description: '2023년 심포니 해커톤 준우승' },
];

const ProfilePage = () => {
  const { id } = useParams();
  const myId = localStorage.getItem('user_id'); // 로그인 시 저장 필요
  const isMyProfile = id === myId;
  console.log(isMyProfile);

  const [isFollow, setIsFollow] = useState(false);

  const [isAlarmOn, setIsAlarmOn] = useState<{ state: boolean; icon: string }>({
    state: false,
    icon: AlarmOffIcon,
  });

  const menuList = [
    {
      id: 0,
      label: '작성 프롬프트',
      selected: true,
    },
    { id: 1, label: '프롬프터 이력', selected: false },
    { id: 2, label: '문의하기', selected: false },
    { id: 3, label: 'SNS', selected: false },
  ];

  const [menuId, setMenuId] = useState(0);

  return (
    <div className="flex flex-col pt-[120px]">
      <div className="p-[10px] pl-[220px] flex gap-[60px] items-center">
        <div className="flex gap-[28px]">
          <div className="w-[80px] h-[80px]">
            <img src={ProfileIcon} alt="프로필 이미지" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col gap-[5px] text-text-on-white">
            <p className="text-[32px] font-bold leading-[40px]">{USER.name}</p>
            <p className="text-[20px] font-medium leading-[25px]">5년차 백엔드 개발자!</p>
          </div>
        </div>

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
      </div>

      <div className="flex flex-col items-center justify-center px-[102px] mt-[40px]">
        <div className="w-full">
          <div className="flex w-full justify-between">
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
            <div className="w-full max-h-[368px] overflow-scroll">
              {PROMPT.map((prompt) => (
                <PromptCard key={prompt.prompt_id} title={prompt.title} model={prompt.model} tags={prompt.tags} />
              ))}
            </div>
          )}

          {menuId === 1 && (
            <div className="w-full max-h-[368px] overflow-scroll">
              {DESCRIPTION.map((description) => (
                <RecordCard key={description.history_id} description={description.description} />
              ))}
            </div>
          )}
          {menuId === 2 && <div>문의하기</div>}
          {menuId === 3 && <div>sns</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
