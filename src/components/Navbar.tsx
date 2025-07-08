import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import LogoIcon from '@assets/icon-header-logo.svg';
import ProfileIcon from '@assets/icon-profile-blue-small.svg';
import UserProfileIcon from '@assets/img-example-profile2.jpg';
import PrimaryButton from '@components/Button/PrimaryButton';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const Navbar = () => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const { accessToken } = useAuth();

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

  return (
    <nav className="flex items-center gap-[38px] py-[7.5px] pl-[61.25px] pr-[36px]">
      <div onClick={() => handleNavigate('/')} className="cursor-pointer w-[227px]">
        <img src={LogoIcon} alt="로고" className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center relative flex-1 ml-[61.26px]">
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
            alert('로그인/회원가입 컴포넌트 완성 시 연결 예정');
          }}
        />
      )}

      <div className="cursor-pointer w-[60px] rounded-full overflow-hidden">
        {!accessToken && <img src={ProfileIcon} alt="사용자 이미지" className="w-full h-full object-cover" />}
        {accessToken && (
          <img
            src={UserProfileIcon ? UserProfileIcon : ProfileIcon}
            alt="로그인된 사용자 이미지"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
