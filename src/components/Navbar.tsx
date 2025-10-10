import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import LogoIcon from '@assets/logo/text/text-logo-default.svg';
import AppLogoIcon from '@assets/logo/app/app-logo-default.svg';
import ArrowIcon from '@assets/header/icon-arrow_fill.svg';

import SocialLoginModal from '@components/Modal/SocialLoginModal';
import BackgroundButton from './Button/BackgroundButton';

const Navbar = () => {
  const navigate = useNavigate();
  // const { accessToken, user } = useAuth();

  const [loginModalShow, setLoginModalShow] = useState(false);

  // const { data } = useGetMember({ member_id: user.user_id });

  const LINKS = [
    { to: '/', label: '홈' },
    { to: '/prompt/10', label: '프롬프트 보기' },
    { to: '/guide/tip', label: 'AI 꿀팁' },
    { to: '/guide/notice', label: '공지사항' },
  ];

  return (
    <>
      <nav className="bg-white">
        <div className="px-[102px] max-lg:px-[20px] py-[18px] flex justify-between">
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
                alert('회원가입 연결 예정');
              }}
            />
          </div>
        </div>

        <div className="px-[102px] max-lg:px-[20px] py-[16px] flex justify-between items-center custom-h3 text-black whitespace-nowrap">
          <div className="flex items-center gap-[20px] max-lg:gap-[8px]">
            {LINKS.map((link) => (
              <NavLink
                to={link.to}
                key={link.to}
                className={({ isActive }) =>
                  `${link.label === '/' ? 'pr-[8px]' : 'px-[8px]'} ${isActive ? 'custom-h5 text-primary' : ''}`
                }>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center">
            <p className="px-[8px]">AI 바로가기</p>
            <img src={ArrowIcon} alt="메뉴 버튼" className="cursor-pointer self-center" />
          </div>
        </div>
      </nav>

      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
    </>
  );
};

export default Navbar;
