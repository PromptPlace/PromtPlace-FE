import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import LogoIcon from '@assets/icon-header-logo.svg';
import ProfileIcon from '@assets/icon-profile-blue-small.svg';
import UserProfileIcon from '@assets/img-example-profile2.jpg';
import PrimaryButton from '@components/Button/PrimaryButton';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import Sidebar from '@components/Sidebar';
import SocialLoginModal from '@components/Modal/SocialLoginModal';

const Navbar = () => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    setSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSidebarClick = () => {
    setSidebarOpen(true);
    setTimeout(() => {
      setSidebarVisible(true);
    }, 10);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
    setTimeout(() => {
      setSidebarOpen(false);
    }, 300);
  };

  return (
    <>
      <nav className="flex justify-between items-center gap-[2.6vw] py-[7.5px] pl-[61.25px] pr-[36px] max-lg:p-0">
        <div onClick={() => handleNavigate('/')} className="cursor-pointer w-[227px] shrink-0 max-lg:hidden">
          <img src={LogoIcon} alt="로고" className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center relative ml-[61.26px] w-full max-lg:m-[0] max-w-[1000px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="내가 원하는 프롬프트 찾기"
            className="flex-1 placeholder:font-SpoqaHanSansNeo placeholder:color-text-on-background placeholder:text-base placeholder:font-normal placeholder:leading-[26px] placeholder:tracking-[0.46px] bg-background rounded-[40px] border border-[#ccc] py-[10px] px-[20px] outline-none focus:border focus:border-primary focus:inset-shadow-inner"
          />
          <HiMagnifyingGlass
            onClick={handleSearch}
            className="absolute right-[20px] text-text-on-background cursor-pointer"
          />
        </div>

        <PrimaryButton
          buttonType="tip"
          text="프롬프트 TIP"
          onClick={() => {
            handleNavigate('/guide/tip');
          }}
        />

        {!accessToken && (
          <PrimaryButton
            buttonType="login"
            text="로그인 / 회원가입"
            onClick={() => {
              setLoginModalShow(true);
            }}
          />
        )}

        {loginModalShow && (
          <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
        )}

        <div className="cursor-pointer w-[60px] rounded-full overflow-hidden shrink-0 max-lg:hidden">
          {!accessToken && (
            <img
              src={ProfileIcon}
              alt="사용자 이미지"
              onClick={handleSidebarClick}
              className="w-full h-full object-cover cursor-pointer"
            />
          )}
          {accessToken && (
            <img
              src={UserProfileIcon ? UserProfileIcon : ProfileIcon}
              alt="로그인된 사용자 이미지"
              onClick={handleSidebarClick}
              className="w-full h-full object-cover cursor-pointer"
            />
          )}
        </div>
      </nav>

      {sidebarOpen && (
        <>
          <div className="fixed inset-0 w-full h-full bg-overlay z-40" onClick={handleCloseSidebar}></div>
          <div className="fixed top-0 right-0 z-50">
            <Sidebar
              sidebarVisible={sidebarVisible}
              setSidebarVisible={setSidebarVisible}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
