import InstaIcon from '@assets/icon-instagram-logo.svg';
import YoutubeIcon from '@assets/icon-youtube-logo.svg';
import FacebookIcon from '@assets/icon-facebook-logo.svg';
import KakaoIcon from '@assets/icon-kakao-logo.svg';
import XIcon from '@assets/icon-x-logo.svg';
import GoogleIcon from '@assets/icon-google-logo.svg';
import NaverIcon from '@assets/icon-naver-logo.svg';

interface SnsCardProps {
  description: string;
  url: string;
}

const SnsCard = ({ description, url }: SnsCardProps) => {
  const getSnsType = (url: string) => {
    if (url.includes('instagram')) return 'instagram';
    if (url.includes('facebook')) return 'facebook';
    if (url.includes('kakao')) return 'kakao';
    if (url.includes('x')) return 'x';
    if (url.includes('google')) return 'google';
    if (url.includes('youtube')) return 'youtube';
    if (url.includes('naver')) return 'naver';
  };

  const snsType = getSnsType(url);

  return (
    <div className="bg-white border-b border-b-white-stroke py-[30px] pl-[80px] text-text-on-white text-[20px] font-medium leading-[25px] flex gap-[20px]">
      {snsType === 'instagram' && <img src={InstaIcon} alt="instagram" />}
      {snsType === 'facebook' && <img src={FacebookIcon} alt="facebook" />}
      {snsType === 'kakao' && <img src={KakaoIcon} alt="kakao" />}
      {snsType === 'x' && <img src={XIcon} alt="x" />}
      {snsType === 'google' && <img src={GoogleIcon} alt="google" />}
      {snsType === 'youtube' && <img src={YoutubeIcon} alt="youtube" />}
      {snsType === 'naver' && <img src={NaverIcon} alt="naver" />}
      {description}
    </div>
  );
};

export default SnsCard;
