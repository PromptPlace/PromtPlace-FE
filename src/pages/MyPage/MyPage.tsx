import { useAuth } from '@/context/AuthContext';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';

import ProfileIcon from '@assets/icon-profile-gray.svg';

import MailIcon from '@assets/icon-sidebar-mail.svg?react';
import PersonIcon from '@assets/icon-sidebar-person.svg?react';
import ReceiptIcon from '@assets/icon-sidebar-BiReceipt.svg?react';
import ChatIcon from '@assets/icon-sidebar-chat-bubble.svg?react';
import ArchiveIcon from '@assets/icon-sidebar-archive.svg?react';
import LogOutIcon from '@assets/icon-sidebar-FiLogOut.svg?react';

import PrimaryButton from '@components/Button/PrimaryButton';
import SocialLoginModal from '@components/Modal/SocialLoginModal';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';

const MyPage = () => {
  const { accessToken, user, logout } = useAuth();
  const [loginModalShow, setLoginModalShow] = useState(false);

  // 회원 정보 불러오기
  const { data } = useGetMember({ member_id: user.user_id });
  console.log(data);

  const LINKS = [
    { to: '/mypage/prompt', label: '내 프롬프트', icon: <ArchiveIcon className="w-[16px] h-[16px]" /> },
    { to: '/mypage/review', label: '내 리뷰 관리', icon: <ChatIcon className="w-[16px] h-[16px]" /> },
    { to: '/mypage/pay', label: '정산 관리', icon: <ReceiptIcon className="w-[16px] h-[16px]" /> },
    { to: '/mypage/message/message', label: '메시지함', icon: <MailIcon className="w-[16px] h-[16px]" /> },
    { to: '/mypage/info', label: '회원정보', icon: <PersonIcon className="w-[16px] h-[16px]" /> },
  ];

  const handleNavigate = (url: string) => {
    window.location.href = url;
  };

  return (
    <>
      <div className="pt-[12px] flex flex-col items-center gap-[20px] relative">
        <p className="text-black text-[16px] font-medium leading-[26px] tracking-[0.46px]">마이페이지</p>

        {!accessToken && (
          <>
            <div className="flex flex-col gap-[8px] items-center">
              <div className="w-[48px] h-[48px]">
                <img src={ProfileIcon} alt="프로필" className="w-full h-full object-contain" />
              </div>
              <p className="text-text-on-white text-[14px] font-medium leading-[18px]">로그인 하세요</p>
            </div>
            <div className="mb-[63px] w-full flex justify-center">
              <PrimaryButton
                buttonType="login"
                text="로그인 / 회원가입"
                onClick={() => setLoginModalShow(true)}
                type="button"
              />
            </div>
          </>
        )}

        {accessToken && (
          <>
            <div className="flex flex-col gap-[8px] items-center w-full">
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                <img src={ProfileIcon} alt="프로필" className="w-full h-full object-contain" />
              </div>

              <p className="text-text-on-white text-[14px] font-medium leading-[18px]">{data?.data.name}</p>

              <div
                onClick={() => handleNavigate(`/profile/${user.user_id}`)}
                className="flex items-center justify-center px-[8px] py-[4px] rounded-[4px] border border-primary bg-background text-primary text-[10px] font-normal leading-[13px] cursor-pointer bg-white">
                프로필 홈
              </div>
            </div>

            <div></div>
            <div className="w-full flex flex-col items-center gap-[26px]">
              {LINKS.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = to;
                  }}
                  to={to}
                  className="relative flex text-text-on-white text-[14px] font-medium leading-[18px] cursor-pointer">
                  {({ isActive }) => (
                    <div
                      className={clsx(
                        'w-[95px] flex gap-[8px] items-center justify-start hover:text-primary-hover',
                        isActive && 'text-primary-hover',
                      )}>
                      {icon}
                      {label}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>

            <button
              onClick={logout}
              className="py-[4px] px-[8px] gap-[8px] rounded-[4px] border-[0.5px] border-text-on-background bg-white shadow-button text-text-on-background text-[10px] font-normal leading-[13px] tracking-[0.46px] flex absolute top-[427px] right-[20px]">
              <LogOutIcon className="text-white-stroke w-[12px] h-[12px]" />
              로그아웃
            </button>
          </>
        )}
      </div>

      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
    </>
  );
};

export default MyPage;
