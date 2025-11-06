import type { NewDownloadedPromptDTO } from '@/types/MyPage/prompt';
import { useDeleteReview } from '@/hooks/mutations/MyPage/review';
import icon from '@/assets/icon-review.svg';
import { useNavigate } from 'react-router-dom';

interface DownloadedPromptCardProps {
  prompt: NewDownloadedPromptDTO;
}

import { Link } from 'react-router-dom';

const DownloadedPromptCard = ({ prompt }: DownloadedPromptCardProps) => {
  const navigate = useNavigate();

  const handleWriteReviewClick = (prompt_id: number) => {
    const promptId = prompt_id;
    const targetUrl = `/prompt/${promptId}?open_review=true`;
    navigate(targetUrl);
  };

  const imageUrl = prompt.imageUrls && prompt.imageUrls.length > 0 ? prompt.imageUrls[0] : '/default-prompt-image.svg';
  const price = prompt.price === 0 ? '무료' : `${prompt.price}원`;
  return (
    <>
      {' '}
      <div className="w-full bg-white pr-[24px] mb-[20px]">
        <div className="flex">
          <div className="flex gap-[24px] items-center">
            <img src={imageUrl} alt="프롬프트 이미지" className="w-[80px] h-[80px] rounded-[8px]" />
            <Link to={`/prompt/${prompt.prompt_id}`}>
              <p className="custom-h3 text-black">{prompt.title}</p>
              <p className="custom-h5 text-black">{price}</p>
            </Link>
          </div>
        </div>
      </div>
      {prompt.has_review === false ? (
        <div>
          <div className="flex items-center  py-[12px]">
            <img src={icon} alt="리뷰 아이콘" className="mr-[8px]" />
            <div className="flex flex-col gap-[4px]">
              <p className="custom-h4 text-black">리뷰 작성하기</p>
              <p className="custom-body2 text-gray-700">프롬프트 제작자와 다른 사용자에게 도움 될 수 있어요.</p>
            </div>
          </div>
          <button className="w-full px-[20px] py-[12px] bg-primary text-primary rounded-[12px] mt-[12px] border-[0.8px] border-primary custom-button1">
            리뷰 작성하기
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-[8px] px-[28px]">리뷰</div>
      )}
      ;
    </>
  );
};
export default DownloadedPromptCard;
