import { useEffect, useRef } from 'react';

import ArrowCreate from '@assets/coachmark/icon-arrow-create.svg';
import ArrowFilter from '@assets/coachmark/icon-arrow-filter.svg';
import ArrowFollow from '@assets/coachmark/icon-arrow-follow.svg';
import ArrowInput from '@assets/coachmark/icon-arrow-input.svg';
import ArrowLogin from '@assets/coachmark/icon-arrow-login.svg';
import ArrowProfile from '@assets/coachmark/icon-arrow-profile.svg';
import ArrowTip from '@assets/coachmark/icon-arrow-tip.svg';
import Cursor from '@assets/coachmark/icon-cursor.svg';
import Line from '@assets/coachmark/icon-line.svg';
import Mouse from '@assets/coachmark/icon-mouse.svg';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import ProfileIcon from '@assets/icon-profile-blue-small.svg';
import UserProfileIcon from '@assets/img-example-profile2.jpg';

import PrimaryButton from '@components/Button/PrimaryButton';
import GradientButton from '@components/Button/GradientButton';

import { useAuth } from '@/context/AuthContext';
import FilterBar from '@pages/MainPage/components/filterBar';

interface CoachMarkProps {
  setShowCoachMark: (state: boolean) => void;
}

const CoachMark = ({ setShowCoachMark }: CoachMarkProps) => {
  const { accessToken } = useAuth();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        setShowCoachMark(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-overlay-coach-mark z-[20]">
      <nav className="relative flex justify-between items-center gap-[2.6vw] py-[7.5px] pl-[61.25px] pr-[36px]">
        <div className="cursor-pointer w-[227px] shrink-0"></div>

        <div className="flex items-center relative ml-[61.26px] w-full max-lg:m-[0] max-w-[1000px]">
          <input
            placeholder="내가 원하는 프롬프트 찾기"
            className="relative flex-1 placeholder:font-SpoqaHanSansNeo placeholder:color-text-on-background placeholder:text-base placeholder:font-normal placeholder:leading-[26px] placeholder:tracking-[0.46px] bg-background rounded-[40px] border border-[#ccc] py-[10px] px-[20px] outline-none focus:border focus:border-primary focus:inset-shadow-inner"
          />
          <div className="absolute left-[-15px] -translate-x-full flex gap-[14px]">
            <div className="text-white text-[18px] font-normal leading-[23px] mt-[23px]">
              <p>
                원하는 프롬프트 또는
                <br />
                키워드 <span className="text-secondary-pressed">검색하기</span>
              </p>
            </div>

            <img src={ArrowInput} alt="arrow-input" />
          </div>
          <HiMagnifyingGlass className="absolute right-[20px] text-text-on-background cursor-pointer" />
        </div>

        <PrimaryButton buttonType="tip" text="프롬프트 TIP" onClick={() => {}} />
        <div className="absolute top-[77px] right-[418px] flex gap-[14px]">
          <div className="text-white text-[18px] font-normal leading-[23px] mt-[21px]">
            <p>
              프롬프트 작성 <span className="text-secondary-pressed">꿀팁</span>과
            </p>
            <p className="text-secondary-pressed">공지사항</p>
          </div>

          <div>
            <img src={ArrowTip} alt="arrow-tip" />
          </div>
        </div>

        {!accessToken && (
          <>
            <PrimaryButton buttonType="login" text="로그인 / 회원가입" onClick={() => {}} />
            <div className="absolute top-[77px] right-[219px] flex flex-col">
              <div className="flex justify-end">
                <img src={ArrowLogin} alt="arrow-login" />
              </div>
              <div className="text-white text-[18px] font-normal leading-[23px]">
                <p>
                  더 많은 서비스를
                  <br />
                  누릴 수 있는 <span className="text-secondary-pressed">로그인 기능</span>
                </p>
              </div>
            </div>
          </>
        )}

        <div className="cursor-pointer w-[60px] rounded-full overflow-hidden shrink-0 max-lg:hidden">
          {!accessToken && (
            <div className="border-[6px] border-white rounded-full">
              <img src={ProfileIcon} alt="사용자 이미지" className="w-full h-full object-cover cursor-pointer" />
              <div className="absolute top-[91px] right-[88px] flex flex-col gap-[13px]">
                <div className="flex justify-end">
                  <img src={ArrowProfile} alt="arrow-profile" />
                </div>
                <div className="text-white text-[18px] font-normal leading-[23px]">
                  <p>
                    내 프롬프트와 리뷰 등을
                    <br />
                    손쉽게 관리할 수 있는
                    <br />
                    <span className="text-secondary-pressed">마이페이지 탭</span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {accessToken && (
            <img
              src={UserProfileIcon ? UserProfileIcon : ProfileIcon}
              alt="로그인된 사용자 이미지"
              className="w-full h-full object-cover cursor-pointer"
            />
          )}
        </div>

        <div className="absolute top-[124px] left-1/2 -translate-x-1/2 w-[1171px]">
          <div className="w-max bg-white rounded-[1000px] py-[10px] relative">
            <FilterBar onModelChange={() => {}} onSortChange={() => {}} onlyFree={undefined} setOnlyFree={() => {}} />
            <div className="absolute left-[274px] top-[76px] flex gap-[16px] w-full">
              <div>
                <img src={ArrowFilter} alt="arrow-filter" />
              </div>
              <div className="text-white text-[18px] font-normal leading-[23px] mt-[10px]">
                <p>
                  원하는 프롬프트를 바로 찾는
                  <br />
                  <span className="text-secondary-pressed">정렬 기능</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[371px] left-1/2 translate-x-1/2 w-[372px]">
          <div className="w-max">
            <div className="flex flex-col items-center">
              <img src={ArrowFollow} alt="arrow-follow" />
            </div>
            <div className="text-white text-[18px] font-normal leading-[23px] mt-[20px] -translate-x-1/4">
              <p>
                관심있는 프롬프터
                <br />
                <span className="text-secondary-pressed">팔로우</span>하고 알림 받기
              </p>
            </div>
          </div>
        </div>

        <div className="flex absolute top-[274px] left-[227px] gap-[52px]">
          <div className="flex items-center justify-center">
            <div className="relative w-[79px] height-[546px]">
              <img src={Line} alt="line" className="w-full h-full object-contain" />
            </div>
            <div className="absolute animate-[slideDown_1.5s_linear_infinite]  ">
              <style>
                {`
                  @keyframes slideDown{
                    0% {
                      top:5%;
                    }
                    100% {
                      top:80%;
                    }
                  }
                `}
              </style>
              <img src={Cursor} alt="cursor" />
            </div>
          </div>
          <div className="flex flex-col justify-end gap-[38px]">
            <div className="text-white text-[32px] font-bold leading-[40px]">
              <p>
                원하는 <span className="text-secondary-pressed">프롬프트</span>를 <br />
                살펴보고 다운받으세요!
              </p>
            </div>
            <div className="w-[170px] h-[184.87px]">
              <img src={Mouse} alt="mouse" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-4 justify-center items-center flex flex-col gap-2.5 left-1/2">
        <div className="flex gap-[17.88px] absolute left-[48px] bottom-[91px] whitespace-nowrap w-full">
          <div>
            <img src={ArrowCreate} alt="arrow-create" />
          </div>

          <div className="text-white text-[18px] font-normal leading-[23px] relative bottom-[40px]">
            <p>
              프롬프트를 <span className="text-secondary-pressed">직접 작성</span>하고
              <br />
              공유 및 판매하기
            </p>
          </div>
        </div>

        <div className="border border-[6px] border-white rounded-[50px]">
          <GradientButton buttonType="imgButton" text="프롬프트 작성하기" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CoachMark;
