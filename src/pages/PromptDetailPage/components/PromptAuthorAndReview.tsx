import FollowButton from '@components/Button/FollowButton';
import ReviewList from './ReviewList';
import defaultProfile from '../assets/profile.png';
import mail from '../../../assets/icon-mail-black.svg';
import person from '../../../assets/icon-person-blue.svg';
import { useNavigate } from 'react-router-dom';

import InstaIcon from '@assets/icon-instagram-logo.svg';
import YoutubeIcon from '@assets/icon-youtube-logo.svg';
import XIcon from '@assets/icon-x-logo.svg';

interface Review {
  review_id: number;
  writer_id: number;
  writer_profile_image_url: string | null;
  writer_nickname: string;
  rating: number;
  content: string;
  created_at: string;
}

interface PromptAuthorAndReviewProps {
  user: {
    user_id: number;
    nickname: string;
    profileImage?: { url: string } | null;
    intro?: string | null;
    sns_list?: { url: string }[];
  };
  currentUserId?: number | null;
  follow: boolean;
  onToggleFollow: () => void;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  reviewCount: number;
  setReviewCount: React.Dispatch<React.SetStateAction<number>>;
  title: string;
}

const PromptAuthorAndReview = ({
  user,
  currentUserId,
  follow,
  onToggleFollow,
  reviews,
  setReviews,
  reviewCount,
  setReviewCount,
  title,
}: PromptAuthorAndReviewProps) => {
  const navigate = useNavigate();

  const getSNSIcons = () => {
    if (!user.sns_list) return null;

    return user.sns_list.map((sns, idx) => {
      const url = sns.url.toLowerCase();
      if (url.includes('instagram.com')) {
        return (
          <a key={idx} href={sns.url} target="_blank" rel="noopener noreferrer">
            <img src={InstaIcon} alt="Instagram" className="w-5 h-5" />
          </a>
        );
      }
      if (url.includes('youtube.com')) {
        return (
          <a key={idx} href={sns.url} target="_blank" rel="noopener noreferrer">
            <img src={YoutubeIcon} alt="YouTube" className="w-5 h-5" />
          </a>
        );
      }
      if (url.includes('x.com') || url.includes('twitter.com')) {
        return (
          <a key={idx} href={sns.url} target="_blank" rel="noopener noreferrer">
            <img src={XIcon} alt="X" className="w-5 h-5" />
          </a>
        );
      }
      return null;
    });
  };

  return (
    <section className="flex flex-col lg:flex-row gap-[40px] mt-8">
      {/* 작성자 프로필 카드 */}
      <div className="bg-[#FFFEFB] rounded-[16px] p-6 w-[430px] h-auto text-left self-start">
        <p className="text-sm font-medium text-gray-500 mb-2">제작자 프로필</p>

        {/* 상단 정보 */}
        <div className="flex items-center gap-4">
          <img
            src={user?.profileImage?.url ?? defaultProfile}
            alt="profile"
            className="w-[49px] h-[49px] rounded-[12px] border border-gray-300 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-base font-semibold">{user?.nickname ?? 'Unknown'}</p>
            <div className="flex items-center gap-2 mt-1">
              {getSNSIcons()}
              {currentUserId !== user?.user_id && <FollowButton follow={follow} onClick={onToggleFollow} />}
            </div>
          </div>
        </div>

        {/* 자기소개 */}
        {user.intro && <p className="ml-15 mt-4 text-sm text-gray-600 leading-[22px] break-keep">{user.intro}</p>}

        {/* 버튼 */}
        <div className="mt-5 flex gap-2">
          <button className="flex-1 h-[48px] border border-[#D1D5DB] rounded-md text-[14px] text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-100 transition">
            <img src={mail} alt="문의하기" className="w-4 h-4" />
            문의하기
          </button>
          <button
            className="flex-1 h-[48px] border border-[#D1D5DB] rounded-md text-[14px] text-[#2563EB] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
            onClick={() => navigate(`/profile/${user?.user_id}`)}>
            <img src={person} alt="프로필 보기" className="w-4 h-4" />
            프로필 보기
          </button>
        </div>
      </div>

      {/* 리뷰 리스트 */}
      <ReviewList
        reviews={reviews}
        setReviews={setReviews}
        reviewCount={reviewCount}
        setReviewCount={setReviewCount}
        title={title}
        onClose={() => {}}
        currentUserId={currentUserId ?? undefined}
      />
    </section>
  );
};

export default PromptAuthorAndReview;
