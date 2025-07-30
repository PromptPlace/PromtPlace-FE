import PromptHeader from './components/PromptHeader';
import PromptInfo from './components/PromptInfo';
import PromptActions from './components/PromptActions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReviewList from './components/ReviewList';
import IconButton from '@components/Button/IconButton';
import profile from './assets/profile.jpg';
import FollowButton from '@components/Button/FollowButton';
import ArrowLeft from './assets/keyboard_arrow_down _left.svg';
import ReportModal from './components/ReportModal';

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
  const [follow, setFollow] = useState(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleOpenReportModal = () => setIsReportModalOpen(true);
  const handleCloseReportModal = () => setIsReportModalOpen(false);

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
      {/* 모바일 유저 정보 섹션 */}
      <div className="lg:hidden max-w-[280px] max-h-[60px] pt-[12px] mx-auto">
        <div className="box-border flex items-center max-h-[48px] py-[6px]">
          {/* 아이콘 */}
          <img
            src={ArrowLeft}
            alt="뒤로가기"
            className="w-[20px] h-[48px] cursor-pointer mr-[10px]"
            onClick={() => navigate(-1)}
          />

          {/* 프로필 */}
          <div className="w-[36px] flex items-center justify-center mr-[8px]">
            <img src={profile} alt="profile" className="w-[36px] h-[36px] rounded-full object-cover" />
          </div>

          {/* 닉네임 + 팔로우 */}
          <div className="flex items-center w-[214px]">
            <p className="font-medium text-[12px] mr-[10px]">홍길동홍길동홍길동홍길동</p>
            <FollowButton follow={follow} onClick={() => setFollow(!follow)} />
          </div>
        </div>
      </div>

      <div className="flex max-lg:flex-col max-lg:gap-[20px] max-w-7xl max-lg:px-[20px] max-lg:pt-0 max-lg:max-w-[320px] gap-10 p-10 mx-auto">
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

        <div className="lg:hidden flex justify-end">
          <IconButton
            buttonType="squareMd"
            style="red"
            imgType="alert"
            text="신고하기"
            onClick={handleOpenReportModal}
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

      {/* 모바일 하단 고정 영역 */}
      <div className="lg:hidden fixed bottom-0 left-0 bg-white rounded-t-[24px] shadow-[0_-4px_12px_rgba(0,0,0,0.1)] p-[20px] z-50 w-[320px] h-[139px] mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-[20px] h-[34px]  ml-[85px]">
            <span className="text-[16px] font-medium text-black">{prompt.price.toLocaleString()}원</span>
            <IconButton buttonType="squareBig" style="fill" imgType="download" text="다운로드" onClick={() => {}} />
          </div>
        </div>
      </div>

      <ReportModal isOpen={isReportModalOpen} onClose={handleCloseReportModal} />
    </div>
  );
};

export default PromptDetailPage;
