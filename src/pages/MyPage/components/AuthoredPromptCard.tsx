import PrimaryButton from '@components/Button/PrimaryButton';
import { Link } from 'react-router-dom';
import type { NewAuthoredPromptDTO } from '@/types/MyPage/prompt';
import logo from '@/assets/logo/app/app-logo-default.svg';

interface AuthoredPromptCardProps {
  prompt: NewAuthoredPromptDTO;
}

//여기는 하나의 프롬프트만 받아오면 됨
const AuthoredPromptCard = ({ prompt }: AuthoredPromptCardProps) => {
  const imageUrl = prompt.image_url ? prompt.image_url : logo;
  return (
    <div className="w-full bg-white pr-[24px]">
      <div className="flex justify-between">
        <div className="flex gap-[24px]">
          <img src={imageUrl} alt="프롬프트 이미지" className="w-[80px] h-[80px] rounded-[8px]" />
          <Link to={`/prompt/${prompt.prompt_id}`}>
            <p className="custom-h3 text-text-on-white">{prompt.title}</p>
          </Link>
        </div>
        <div className="flex gap-[16px]">
          <p>조회수</p>
          <p>{prompt.views}</p>
          <p>다운로드 수</p>
          <p>{prompt.downloads}</p>
        </div>
      </div>

      {prompt.reviews.data.slice(0, 3).map((review) => (
        <div>
          <div className="flex justify-between">
            <div>
              <span>{review.nickname}</span>
              <span>{review.content}</span>
            </div>
            <span>{review.rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthoredPromptCard;
