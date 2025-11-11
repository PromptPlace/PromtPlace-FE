import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import useGetMember from '@/hooks/queries/ProfilePage/useGetMember';

import LogoIcon from '@assets/logo/text/text-logo-default.svg';
import AppLogoIcon from '@assets/logo/app/app-logo-default.svg';
import ArrowIcon from '@assets/header/icon-arrow_fill.svg';
import NotificationIcon from '@assets/header/icon-notification.svg';
import NotificationAlarmIcon from '@assets/header/icon-notification_new.svg';
import MessageIcon from '@assets/header/icon-message.svg';
// import MessageAlarmIcon from '@assets/header/icon-message_new.svg';
import UserIcon from '@assets/header/mypage.svg';

import SocialLoginModal from '@components/Modal/SocialLoginModal';
import BackgroundButton from '@components/Button/BackgroundButton';
import NavbarModal from './NavbarModal';
import clsx from 'clsx';
import NavbarNotificationModal from './NavbarNotificationModal';
import TextModal from '../Modal/TextModal';
import useGetNewNotification from '@/hooks/queries/Navbar/useGetNewNotification';

const Navbar = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [isNavModalShow, setIsNavModalShow] = useState(false);
  const [isNotificationModalShow, setIsNotificationModalShow] = useState(false);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const { accessToken, user } = useAuth();
  const { data } = useGetMember({ member_id: user.user_id });
  const { data: notificationData } = useGetNewNotification();

  const LINKS = [
    { to: '/', label: '홈', labelMobile: '홈' },
    { to: '/prompt', label: '프롬프트 보기', labelMobile: '프롬프트' },
    { to: '/guide/tip', label: 'AI 꿀팁', labelMobile: 'AI 꿀팁' },
    { to: '/guide/notice', label: '공지사항', labelMobile: '공지' },
  ];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsNavModalShow(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setIsNotificationModalShow(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      <nav className="bg-white">
        <div className="px-[102px] max-lg:px-[40px] max-phone:px-[20px] py-[18px] flex justify-between">
          <img
            src={LogoIcon}
            alt="로고이미지"
            onClick={() => navigate('/')}
            className="cursor-pointer w-[178px] max-lg:hidden"
          />

          <img
            src={AppLogoIcon}
            alt="로고이미지"
            onClick={() => navigate('/')}
            className="cursor-pointer w-[48px] lg:hidden"
          />

          {!accessToken && (
            <div className="flex gap-[24px]">
              <BackgroundButton
                background="secondary"
                text="로그인"
                onClick={() => {
                  setLoginModalShow(true);
                }}
              />
              <BackgroundButton
                background="primary"
                text="회원가입"
                onClick={() => {
                  setSignupModalShow(true);
                }}
              />
            </div>
          )}

          {accessToken && (
            <div className="flex gap-[26px] max-phone:gap-[20px] items-center cursor-pointer">
              <BackgroundButton
                background="secondary"
                text="프롬프트 올리기"
                onClick={() => {
                  navigate('/create');
                }}
              />
              <div className="phone:relative">
                <img
                  src={notificationData?.data.hasNew ? NotificationAlarmIcon : NotificationIcon}
                  alt="알림"
                  className="self-center max-phone:w-[16px] max-phone:h-[16px]"
                  onClick={() => setIsNotificationModalShow((prev) => !prev)}
                />

                {isNotificationModalShow && (
                  <div ref={notificationRef} className="phone:absolute top-[34px] right-0 z-50 max-phone:top-[70px]">
                    <NavbarNotificationModal setIsNotificationModalShow={setIsNotificationModalShow} />
                  </div>
                )}
              </div>

              <img
                src={data?.data.has_unread_messages ? MessageIcon : MessageIcon}
                alt="메세지 알림"
                className="self-center max-phone:w-[16px] max-phone:h-[16px]"
                onClick={() => setIsMessageModalShow((prev) => !prev)}
              />
              <img
                src={data?.data.profile_image || UserIcon}
                alt="프로필 이미지"
                className="w-[40px] h-[40px] rounded-full object-cover self-center max-phone:w-[32px] max-phone:h-[32px]"
                onClick={() => navigate(`/mypage/profile`)}
              />
            </div>
          )}
        </div>

        <div className="px-[102px] max-lg:px-[40px] max-phone:px-[20px] py-[16px] flex justify-between items-center custom-h3 max-phone:text-[14px] text-black whitespace-nowrap">
          <div className="flex items-center gap-[20px] max-lg:gap-[8px]">
            {LINKS.map((link) => (
              <NavLink
                to={link.to}
                key={link.to}
                className={`${link.to === '/' ? 'pr-[8px]' : 'px-[8px]'} hover:font-medium hover:text-primary`}>
                <p className="max-phone:hidden">{link.label}</p>
                <p className="phone:hidden">{link.labelMobile}</p>
              </NavLink>
            ))}
          </div>

          <div
            onClick={() => setIsNavModalShow((prev) => !prev)}
            className="flex items-center cursor-pointer"
            ref={navRef}>
            <p className="px-[8px] max-lg:hidden">AI 바로가기</p>
            <p className="px-[8px] lg:hidden">AI</p>
            <img
              src={ArrowIcon}
              alt="메뉴 버튼"
              className={clsx(
                'cursor-pointer self-center transition-all ease-in-out duration-500',
                isNavModalShow ? '-rotate-180' : 'rotate - none',
              )}
            />

            {isNavModalShow && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-[102px] max-lg:right-[20px] top-[140px] z-30 max-phone:right-1/2 max-phone:translate-x-1/2">
                <NavbarModal setIsNavModalShow={setIsNavModalShow} />
              </div>
            )}
          </div>
        </div>
      </nav>

      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}

      {signupModalShow && (
        <SocialLoginModal
          isOpen={signupModalShow}
          onClose={() => setSignupModalShow(false)}
          onClick={() => {}}
          initialView="signup"
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

export default Navbar;
