import { useState } from 'react';
import IconButton from '@components/Button/IconButton';
import FollowButton from '@components/Button/FollowButton';
import Rating from '@components/Rating';
import profile from '../assets/profile.jpg';
import TagButton from '@components/Button/TagButton';
import heartNone from '../../../assets/icon-heart-none-big.svg';
import heartOnClick from '../../../assets/icon-heart-blue-big.svg';
import ReviewList from './ReviewList';
import ReportModal from '../components/ReportModal';
import DownloadModal from '../components/DownloadModal';

interface Props {
  title: string;
  price: number;
  isFree: boolean;
  downloads: number;
  likes: number;
  reviewCounts: number;
  rating: number;
  updatedAt: string;
  userId: number;
}

const dummyReviews = [
  {
    review_id: 101,
    writer_id: 1,
    writer_profile_image_url: profile,
    writer_nickname: '홍길동',
    rating: 4.0,
    content: '가격도 저렴하고 퀄리티 좋아요. 잘 쓰고 있어요.',
    created_at: '2025-07-06T12:34:56',
  },
  {
    review_id: 100,
    writer_id: 2,
    writer_profile_image_url: profile,
    writer_nickname: '김땡땡',
    rating: 4.5,
    content: '최고에요',
    created_at: '2025-07-08T12:34:51',
  },
  {
    review_id: 99,
    writer_id: 3,
    writer_profile_image_url: profile,
    writer_nickname: '이수지',
    rating: 3.5,
    content: '괜찮긴 한데 원하는 느낌은 아니었어요.',
    created_at: '2025-07-09T09:20:00',
  },
  {
    review_id: 98,
    writer_id: 4,
    writer_profile_image_url: profile,
    writer_nickname: '박보검',
    rating: 5.0,
    content: '진짜 완벽해요. 이런 퀄리티 처음 봐요!',
    created_at: '2025-07-10T16:45:30',
  },
  {
    review_id: 50,
    writer_id: 5,
    writer_profile_image_url: profile,
    writer_nickname: '김민지',
    rating: 5.0,
    content: '진짜 완벽해요. 이런 퀄리티 처음 봐요!',
    created_at: '2025-07-10T16:45:30',
  },
  {
    review_id: 51,
    writer_id: 6,
    writer_profile_image_url: profile,
    writer_nickname: '김도영',
    rating: 5.0,
    content: '너무 만족합니다.',
    created_at: '2025-07-10T16:45:30',
  },
  {
    review_id: 52,
    writer_id: 7,
    writer_profile_image_url: profile,
    writer_nickname: '박땡땡',
    rating: 3.5,
    content: '좋았어요',
    created_at: '2025-07-10T16:45:30',
  },
];

const PromptActions = ({ title, price, isFree, downloads, likes, reviewCounts, rating, updatedAt, userId }: Props) => {
  const [follow, setFollow] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [tags, setTags] = useState<string[]>(['#수묵화', '#수채화', '#디자인', '#일러스트', '#그림', '#이미지']);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [downloadData, setDownloadData] = useState<{
    title: string;
    downloadUrl: string;
    content: string;
  } | null>(null);

  const handleDownloadClick = async () => {
    try {
      // const promptId = 1024;
      // const token = localStorage.getItem('accessToken');
      // if (!token) {
      //   alert('로그인이 필요합니다.');
      //   return;
      // }

      // const response = await axios.post(
      //   `/api/prompts/${promptId}/downloads`,
      //   { prompt_id: promptId },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );

      // const { download_url, title } = response.data;

      // ✅ 테스트용 더미 데이터
      const title = '동양풍 일러스트 이미지 생성';
      const download_url = 'https://cdn.promptplace.com/prompts/1024.txt';

      setDownloadData({
        title,
        downloadUrl: download_url,
        content: `
1. 전통 동양풍 인물 일러스트
a graceful Korean noblewoman wearing hanbok, sitting under a cherry blossom tree, Joseon dynasty style, soft lighting, detailed fabric texture, traditional hair style, serene atmosphere, oriental illustration --v 5 --ar 2:3
a Korean dragon soaring through the clouds, traditional ink painting style, dynamic cloud motion, golden scales shimmering in sunlight, East Asian mythology, majestic and ancient aura --v 5 --ar 3:2 --style scenic

2. 동양풍 마을/배경 일러스트
a peaceful traditional Japanese village in spring, sakura trees in full bloom, tiled rooftops, soft morning light, misty mountain background, Ghibli-style aesthetic, detailed background art --v 5 --ar 16:9

3. 퓨전 동양풍 일러스트
a futuristic city blending Korean traditional architecture and cyberpunk neon lights, hanok buildings with glowing signs, digital screens, night setting, rain-soaked street, Blade Runner meets Joseon, concept art --v 5 --ar 21:9
      `.trim(),
      });

      setIsDownloadModalOpen(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message || '다운로드 중 오류가 발생했습니다.';
      alert(msg);
    }
  };

  const handleReportButtonClick = () => {
    setIsReportModalOpen(true); // 신고 모달 열기
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false); // 신고 모달 닫기
  };

  if (showReviews) {
    return (
      <ReviewList
        reviews={dummyReviews}
        title="동양풍 일러스트 이미지 생성"
        reviewCounts={reviewCounts}
        onClose={() => setShowReviews(false)}
        currentUserId={1}
      />
    );
  }

  return (
    <div className="w-[459px] bg-[#FFFEFB] h-[654px] px-8">
      {/* 유저 정보 */}
      <div className="h-[96px] box-border flex items-center gap-3">
        <img src={profile} alt="profile" className="w-10 h-10 rounded-full" />
        <div className="flex items-center w-full">
          <p className="font-semibold text-[20px] mr-8">디자인킹</p>
          <FollowButton follow={follow} onClick={() => setFollow(!follow)} />
        </div>
      </div>
      <div className="h-[1px] bg-[#CCCCCC] w-full" />

      {/* 제목 */}
      <div className="font-bold text-[24px] pt-[20px] pb-[10px]">{`[${title}]`}</div>

      {/* 가격 */}
      <div className="text-[24px] pt-[20px] pb-[20px] font-bold">{isFree ? '무료' : `${price.toLocaleString()}원`}</div>

      {/* 다운로드 & 좋아요 */}
      <div className="h-[96px] box-border flex items-center gap-3">
        <IconButton
          buttonType="squareBig"
          style="fill"
          imgType="download"
          text="다운로드"
          onClick={handleDownloadClick}
        />

        {/* 다운로드 모달 */}
        {downloadData && (
          <DownloadModal
            isOpen={isDownloadModalOpen}
            onClose={() => setIsDownloadModalOpen(false)}
            title={downloadData.title}
            downloadUrl={downloadData.downloadUrl}
            content={downloadData.content}
          />
        )}

        <img
          src={liked ? heartOnClick : heartNone}
          alt="heart"
          className="ml-[34px] w-[28px] h-[25px] cursor-pointer"
          onClick={() => setLiked((prev) => !prev)}
        />
      </div>

      {/* 별점 및 리뷰보기 */}
      <div>
        <div className="mt-[25px] flex justify-start">
          <Rating star={rating} />
        </div>
        <div className="pt-[20px] text-[20px] flex items-center gap-[10px]">
          <p className="cursor-pointer" onClick={() => setShowReviews(true)}>
            리뷰보기
          </p>
          <span
            className="w-[37px] h-[28px] px-[10px] py-[5px] border border-[#999999] rounded-full text-[16px] text-[#999898] flex items-center justify-center cursor-pointer"
            onClick={() => setShowReviews(true)}>
            {reviewCounts}
          </span>
        </div>
      </div>

      {/* 태그 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-[40px] mb-[30px]">
        {tags.map((tag, idx) => (
          <TagButton key={idx} hasDelete={false} text={tag} onClick={() => {}} />
        ))}
      </div>

      {/* 신고 버튼 */}

      <IconButton
        buttonType="squareMd"
        style="red"
        imgType="alert"
        text="프롬프트 신고하기"
        onClick={handleReportButtonClick}
      />

      {/* 신고 모달 */}
      <ReportModal isOpen={isReportModalOpen} onClose={handleCloseReportModal} />
    </div>
  );
};

export default PromptActions;
