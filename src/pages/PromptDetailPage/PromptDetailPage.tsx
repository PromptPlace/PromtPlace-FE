import PromptHeader from './components/PromptHeader';
import PromptInfo from './components/PromptInfo';
import PromptActions from './components/PromptActions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReviewList from './components/ReviewList';

const mockPrompt = {
  prompt_id: 123,
  user_id: 45,
  title: '동양풍 일러스트 이미지 생성',
  prompt: '수채화 느낌의 동양풍 여성 일러스트 생성',
  prompt_result: '아름다운 전통의상을 입은 여성이 자연과 함께 서 있다...',
  has_image: true,
  description:
    '- 수채화, 수묵화 느낌이 나는 동양풍 일러스트를 생성할 때\n- 한복을 입은 인물을 자연스럽게 출력시키고 싶을 때',
  usage_guide:
    '프롬프트 내 ##(키워드)## 부분 중 (키워드)에 해당하는 부분에 원하는 키워드를 입력하세요. 일본풍과 한국풍을 나눠서 출력할 수 있습니다. 사이즈는 1990x890과 같은 형식으로 설정하세요. 결과물이 나온 직후 이러한 프롬프트를 활용해서 더 업그레이드 시킬 수 있습니다! "배경의 선명도를....',
  price: 1800,
  is_free: false,
  downloads: 120,
  views: 2109,
  likes: 456,
  review_counts: 24,
  rating_avg: 4.0,
  updated_at: '2025-07-06T10:00:00',
};

const dummyReviews = [
  {
    review_id: 101,
    writer_id: 1,
    writer_profile_image_url: '',
    writer_nickname: '홍길동',
    rating: 4.0,
    content: '좋은 프롬프트 감사합니다.',
    created_at: '2025-07-28',
  },
  {
    review_id: 102,
    writer_id: 2,
    writer_profile_image_url: '',
    writer_nickname: '이몽룡',
    rating: 5.0,
    content: '바로 써봤는데 너무 좋네요!',
    created_at: '2025-07-28',
  },
];

const PromptDetailPage = () => {
  const navigate = useNavigate();
  const prompt = mockPrompt;
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [showReviews, setShowReviews] = useState(false);

  if (showReviews) {
    return (
      <ReviewList
        reviews={dummyReviews}
        title={prompt.title}
        reviewCount={prompt.review_counts}
        setReviews={() => {}}
        onClose={() => setShowReviews(false)}
        currentUserId={1}
        setReviewCount={() => {}}
      />
    );
  }

  return (
    <div className="bg-[#F5F5F5]">
      <div className="flex max-lg:flex-col max-lg:gap-[31px] max-w-7xl max-lg:px-[20px] max-lg:pt-[60px] max-lg:max-w-[320px] gap-10 p-10 mx-auto">
        {/* 왼쪽: 정보 */}
        <div className="w-[711px] max-lg:max-w-[280px] max-lg:max-h-[544px] bg-[#FFFEFB] rounded-[16px] overflow-hidden">
          <PromptHeader
            title={prompt.title}
            views={prompt.views}
            downloads={prompt.downloads}
            onClose={() => navigate(-1)}
            onClickReview={() => setShowReviews(true)}
          />
          <PromptInfo
            promptResult={prompt.prompt_result}
            description={prompt.description}
            usageGuide={prompt.usage_guide}
          />
        </div>

        {/* 오른쪽: 액션 */}
        <div
          className={`max-lg:hidden w-[459px] max-lg:max-w-[280px] ${isAdmin ? 'h-[548px]' : 'h-[654px]'} bg-[#FFFEFB] shrink-0 rounded-[16px] overflow-hidden`}>
          <PromptActions
            title={prompt.title}
            price={prompt.price}
            isFree={prompt.is_free}
            downloads={prompt.downloads}
            likes={prompt.likes}
            reviewCounts={prompt.review_counts}
            rating={prompt.rating_avg}
            updatedAt={prompt.updated_at}
            userId={prompt.user_id}
            onClickReview={() => setShowReviews(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptDetailPage;
