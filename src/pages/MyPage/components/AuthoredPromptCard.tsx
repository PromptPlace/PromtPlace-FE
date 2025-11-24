import PrimaryButton from '@components/Button/PrimaryButton';
import { Link } from 'react-router-dom';
import type { NewAuthoredPromptDTO } from '@/types/MyPage/prompt';
import logo from '@/assets/logo/app/app-logo-default.svg';
import Portal from './Portal';
import kebabMenu from '@/assets/icon-kebabMenu.svg';
import { useState, useRef, useEffect } from 'react';
import Rating from './Rating';
import usePatchDeletePrompts from '@/hooks/mutations/ProfilePage/usePatchDeletePrompts';
import { useAuth } from '@/context/AuthContext';
import type { RequestDeletePromptDto } from '@/types/ProfilePage/profile';
import { useNavigate } from 'react-router-dom';
import default_icon from '@/assets/icon-profile-image-default.svg';
interface AuthoredPromptCardProps {
  prompt: NewAuthoredPromptDTO;
}

//여기는 하나의 프롬프트만 받아오면 됨
const AuthoredPromptCard = ({ prompt }: AuthoredPromptCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: DeletePrompt } = usePatchDeletePrompts({ member_id: user.user_id });
  const handleDeleteAuthoredPrompts = ({ prompt_id }: RequestDeletePromptDto) => {
    DeletePrompt({ prompt_id });
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null); // 버튼의 위치를 얻기 위한 ref
  const dropdownRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const lgQuery = '(min-width: 1024px)';

  const getIsDesktop = () => window.matchMedia(lgQuery).matches;

  useEffect(() => {
    if (!isDropdownOpen) return;

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const isDesktop = getIsDesktop();

        const dropdownWidth = isDesktop ? 90 : 90;
        const verticalOffset = isDesktop ? 2 : 0;

        setMenuPosition({
          top: rect.bottom + verticalOffset,
          left: rect.right - dropdownWidth,
        });
      }
    };

    updatePosition();

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isDropdownOpen]); // isDropdownOpen이 바뀔 때만 이 로직을 실행

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // 케밥 버튼(buttonRef)과 드롭다운 메뉴(dropdownRef) 바깥을 클릭했는지 확인
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleEditAuthoredPrompt = (prompt_id: number) => {
    const promptId = prompt_id;
    const targetUrl = `/mypage/edit/${promptId}`;

    // 3. 생성된 URL로 페이지를 이동시킵니다.
    navigate(targetUrl);
  };

  const imageUrl = prompt.image_url ? prompt.image_url : logo;
  return (
    <div className="w-full bg-white p-[24px]">
      <div className="flex justify-between pr-[24px]">
        <div className="flex gap-[24px] items-center">
          <img src={imageUrl} alt="프롬프트 이미지" className="w-[80px] h-[80px] rounded-[8px]" />
          <div className="flex flex-col py-[16px]">
            <Link to={`/prompt/${prompt.prompt_id}`}>
              <p className="custom-h3 text-text-on-white break-words">{prompt.title}</p>
            </Link>
            <div className="lg:hidden flex gap-[16px] mt-[20px] max-phone:mt-[12px]">
              <div className=" flex flex-col items-center">
                <p className="custom-body3">조회수</p>
                <p className="custom-button1">{prompt.views}</p>
              </div>
              <div className=" flex flex-col items-center">
                <p className="custom-body3">다운로드 수</p>
                <p className="custom-button1">{prompt.downloads}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="max-lg:hidden flex flex-col items-center min-w-[35px]">
            <p className="custom-body3">조회수</p>
            <p className="custom-button1">{prompt.views}</p>
          </div>
          <div className="max-lg:hidden flex flex-col items-center min-w-[61px]">
            <p className="custom-body3">다운로드 수</p>
            <p className="custom-button1">{prompt.downloads}</p>
          </div>

          <div className="flex items-center justify-center h-[72px] max-lg:h-auto shrink-0 max-lg:w-auto py-[10px] max-lg:py-[0px]  ">
            <div className="relative" ref={anchorRef}>
              <button
                ref={buttonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center justify-center h-[28px] w-[28px] rounded-[50px]  ${isDropdownOpen ? 'bg-secondary-pressed' : 'bg-transparent'}`}>
                <img src={kebabMenu} alt="케밥 메뉴" className="w-[16px] h-[16px]" />
              </button>
              {isDropdownOpen && (
                <Portal>
                  <div
                    ref={dropdownRef}
                    className="fixed mt-[11px] min-w-[91px] bg-white rounded-md z-10 shadow-[0_4px_8px_0_rgba(0,0,0,0.12)]"
                    style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}>
                    <button
                      onClick={() => {
                        handleDeleteAuthoredPrompts({ prompt_id: prompt.prompt_id });
                        setIsDropdownOpen(false);
                      }}
                      className="block custom-h3 px-[15px]  py-[8px]  border-b-[1px] border-b-white-stroke text-text-on-background bg-secondary active:bg-secondary-pressed active:text-black rounded-t-[4px]">
                      삭제하기
                    </button>
                    {/*
                    <button
                      onClick={() => {
                        handleEditAuthoredPrompt(prompt.prompt_id);
                        setIsDropdownOpen(false);
                      }}
                      className="block custom-h3 px-[15px]  py-[8px] text-[16px]  text-text-on-background bg-secondary active:bg-secondary-pressed active:text-black rounded-b-[4px]">
                      수정하기
                    </button>
                    */}
                  </div>
                </Portal>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        {prompt.reviews.data.slice(0, 3).map((review) => (
          <div>
            <div className="flex flex-col gap-[8px] px-[28px]">
              <div className="flex justify-between">
                <div className="flex items-center gap-[8px]">
                  <img
                    src={review.profile_image_url ? review.profile_image_url : default_icon}
                    alt="리뷰어 프로필 이미지"
                    className="w-[24px] h-[24px] rounded-[50px]"
                  />
                  <span className="custom-body3">{review.nickname}</span>
                </div>
                <span className="w-[80px] h-[16px]">
                  <Rating star={review.rating} />
                </span>
              </div>
              <div className="custom-body3 text-gray-700">{review.content}</div>
            </div>
            {prompt.reviews.data.length > 1 && review === prompt.reviews.data[1] && (
              <div className="flex justify-end pr-[20px] mt-[8px]">
                <Link to={`/prompt/${prompt.prompt_id}`}>
                  <button className="custom-button2 text-gray-500">리뷰 더 보기 ({prompt.reviews.data.length})</button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthoredPromptCard;
