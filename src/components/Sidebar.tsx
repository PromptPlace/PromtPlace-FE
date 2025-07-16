import { useAuth } from '@/context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';

import ProfileIcon from '@assets/icon-profile-blue-big.svg';
import UserProfileIcon from '@assets/img-example-profile2.jpg';

import MailIcon from '@assets/icon-sidebar-mail.svg?react';
import PersonIcon from '@assets/icon-sidebar-person.svg?react';
import ReceiptIcon from '@assets/icon-sidebar-BiReceipt.svg?react';
import ChatIcon from '@assets/icon-sidebar-chat-bubble.svg?react';
import ArchiveIcon from '@assets/icon-sidebar-archive.svg?react';

import PrimaryButton from '@components/Button/PrimaryButton';
import IconButton from '@components/Button/IconButton';
import SocialLoginModal from '@components/Modal/SocialLoginModal';

interface SidebarProps {
  sidebarVisible: boolean;
  setSidebarVisible: (sidebarVisible: boolean) => void;
  setSidebarOpen: (sidebarOpen: boolean) => void;
}

const Sidebar = ({ sidebarVisible, setSidebarVisible, setSidebarOpen }: SidebarProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [loginModalShow, setLoginModalShow] = useState(false);

  const LINKS = [
    { to: '/mypage/prompt', label: '내 프롬프트', icon: <ArchiveIcon /> },
    { to: '/mypage/review', label: '내 리뷰 관리', icon: <ChatIcon /> },
    { to: '/mypage/pay', label: '정산 관리', icon: <ReceiptIcon /> },
    { to: '/mypage/message/message', label: '메시지함', icon: <MailIcon /> },
    { to: '/mypage/info', label: '회원정보', icon: <PersonIcon /> },
  ];

  const handleNavigate = (url: string) => {
    setSidebarVisible(false);
    setTimeout(() => {
      setSidebarOpen(false);
      navigate(url);
    }, 300);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 bg-[#fff] w-[279px] h-full rounded-l-[24px] shadow-gradient flex flex-col items-center transform transition-transform duration-300 ease-in-out ${sidebarVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        {!accessToken && (
          <>
            <div className="flex-1 mt-[93px] flex flex-col gap-[17px] items-center">
              <div className="w-[80px] h-[80px]">
                <img src={ProfileIcon} alt="프로필" className="w-full h-full object-contain" />
              </div>
              <p className="text-text-on-white text-xl font-medium leading-[25px]">로그인 하세요</p>
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
            <div className="flex-1 mt-[93px] flex flex-col gap-[17px] items-center w-full">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
                <img src={UserProfileIcon || ProfileIcon} alt="프로필" className="w-full h-full object-contain" />
              </div>

              <p className="text-text-on-white text-xl font-medium leading-[25px]">안송연</p>

              <div
                onClick={() => handleNavigate('/profile/10')}
                className="flex items-center justify-center px-[8px] py-[4px] rounded-[4px] border border-white-stroke bg-background text-text-on-background text-sm font-normal leading-[18px] cursor-pointer">
                프로필 홈
              </div>

              <div className="w-full flex flex-col gap-[20px] mt-[32px]">
                {LINKS.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    onClick={(e) => {
                      e.preventDefault();
                      setSidebarVisible(false);
                      setTimeout(() => {
                        setSidebarOpen(false);
                        navigate(to);
                      }, 300);
                    }}
                    to={to}
                    className={({ isActive }) =>
                      clsx(
                        'relative flex text-text-on-white font-normal text-lg leading-[23px] cursor-pointer',
                        isActive &&
                          'before:absolute before:left-0 before:top-0 before:w-[6px] before:h-full before:bg-primary-gradient',
                      )
                    }>
                    {({ isActive }) => (
                      <div
                        className={clsx(
                          'pl-[64px] py-[9px] flex gap-[10px] items-center justify-start',
                          isActive && 'text-primary-hover',
                        )}>
                        {icon}
                        {label}
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="mb-[63px] w-full flex justify-center text-text-on-white font-normal text-sm leading-[23px] cursor-pointer">
              <IconButton
                buttonType="squreSm"
                style="outline"
                imgType="LogoutIcon"
                text="로그아웃"
                onClick={() => {}}
              />
            </div>
          </>
        )}
      </div>

      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
    </>
  );
};

export default Sidebar;
