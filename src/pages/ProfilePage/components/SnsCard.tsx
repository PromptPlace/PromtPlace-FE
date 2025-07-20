import InstaIcon from '@assets/icon-instagram-logo.svg';
import YoutubeIcon from '@assets/icon-youtube-logo.svg';
import FacebookIcon from '@assets/icon-facebook-logo.svg';
import KakaoIcon from '@assets/icon-kakao-logo.svg';
import XIcon from '@assets/icon-x-logo.svg';
import GoogleIcon from '@assets/icon-google-logo.svg';
import NaverIcon from '@assets/icon-naver-logo.svg';
import CircleButton from '@/components/Button/CircleButton';
import CloseIcon from '@assets/icon-close.svg';
import { useEffect, useRef, useState } from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';

interface SnsCardProps {
  sns_id: number;
  description: string;
  url: string;
  isMyProfile: boolean;
  handleDeleteSns: (sns_id: number) => void;
  handleUpdateSns: (sns_id: number, description: string, sns_url: string) => void;
  isEditing: boolean;
}

const SnsCard = ({
  sns_id,
  description,
  url,
  isMyProfile,
  handleDeleteSns,
  handleUpdateSns,
  isEditing,
}: SnsCardProps) => {
  const getSnsType = (url: string) => {
    if (url.includes('instagram')) return 'instagram';
    if (url.includes('facebook')) return 'facebook';
    if (url.includes('kakao')) return 'kakao';
    if (url.includes('x')) return 'x';
    if (url.includes('google')) return 'google';
    if (url.includes('youtube')) return 'youtube';
    if (url.includes('naver')) return 'naver';
  };

  const clickPosition = useRef<HTMLDivElement | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [edit, setEdit] = useState(isEditing);
  const [editUrl, setEditUrl] = useState(url);
  const [editDescription, setEditDescription] = useState(description);
  const snsType = getSnsType(editUrl);

  useEffect(() => {
    const updateModalPosition = () => {
      if (clickPosition.current) {
        const rect = clickPosition.current.getBoundingClientRect();

        setModalPosition({
          top: rect.top + 32,
          left: rect.left + window.scrollX - 500,
        });
      }
    };

    if (edit) {
      updateModalPosition();
      window.addEventListener('scroll', updateModalPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateModalPosition);
    };
  }, [edit]);

  return (
    <div className="bg-white border-b border-b-white-stroke py-[30px] pl-[80px] pr-[33px] text-text-on-white text-[20px] font-medium leading-[25px] flex items-center gap-[20px]">
      <div>
        {snsType === 'instagram' && <img src={InstaIcon} alt="instagram" />}
        {snsType === 'facebook' && <img src={FacebookIcon} alt="facebook" />}
        {snsType === 'kakao' && <img src={KakaoIcon} alt="kakao" />}
        {snsType === 'x' && <img src={XIcon} alt="x" />}
        {snsType === 'google' && <img src={GoogleIcon} alt="google" />}
        {snsType === 'youtube' && <img src={YoutubeIcon} alt="youtube" />}
        {snsType === 'naver' && <img src={NaverIcon} alt="naver" />}
      </div>

      <div className="flex-1 truncate">{editDescription}</div>

      {isMyProfile && (
        <div className="flex items-center text-text-on-white text-[20px] font-medium leading-[25px]">
          <div ref={clickPosition} className="flex gap-[62px] items-center">
            <CircleButton
              buttonType="edit"
              size="sm"
              onClick={() => {
                setEdit((prev) => !prev);
              }}
              isActive={edit}
            />
            <div onClick={() => handleDeleteSns(sns_id)} className="w-[17px] h-[17px] cursor-pointer">
              <img src={CloseIcon} alt="삭제" className="w-full h-full object-contain" />
            </div>
            {edit && (
              <div
                className="fixed w-[500px] h-[346px] shadow-gradient bg-white rounded-[8px] py-[20px] px-[30px] flex flex-col gap-[20px]"
                style={{ top: modalPosition.top, left: modalPosition.left }}>
                <div className="flex flex-col gap-[10px] text-text-on-white text-[20px] font-medium leading-[25px]">
                  <p>SNS URL</p>
                  <textarea
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="URL을 붙여넣기 하세요"
                    className="w-[440px] h-[108px] p-[12px] rounded-[4px] bg-background inset-shadow-inner placeholder:text-text-on-background text-[18px] font-normal leading-[23px] outline-none resize-none"
                  />
                </div>
                <div className="flex flex-col gap-[10px] text-text-on-white text-[20px] font-medium leading-[25px]">
                  <p>채널 소개</p>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="SNS 소개말을 입력하세요"
                    className="w-[440px] h-[108px] p-[12px] rounded-[4px] bg-background inset-shadow-inner placeholder:text-text-on-background text-[18px] font-normal leading-[23px] outline-none resize-none"
                  />
                </div>
                <div className="absolute bottom-[14px] right-[14px]">
                  <PrimaryButton
                    buttonType="squareMini"
                    text="등록"
                    onClick={() => {
                      if (!editDescription.trim() || !editUrl.trim()) return;
                      setEdit(false);
                      handleUpdateSns(sns_id, editDescription, editUrl);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SnsCard;
