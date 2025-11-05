import { useState } from 'react';
import FollowButton from '@components/Button/FollowButton';
import ReviewList from './ReviewList';
import defaultProfile from '../assets/profile.png';
import mail from '../../../assets/icon-mail-black.svg';
import person from '../../../assets/icon-person-blue.svg';
import { useNavigate } from 'react-router-dom';
import RatingTitle from '@components/RatingTitle';
import type { ReactElement } from 'react';

import InstaIcon from '@assets/icon-instagram-logo.svg';
import YoutubeIcon from '@assets/icon-youtube-logo.svg';
import XIcon from '@assets/icon-x-logo.svg';
import TextModal from '@components/Modal/TextModal';

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
    profileImage: string | null;
    intro: string | null;
    sns_list: { url: string }[];
  };

  currentUserId?: number | null;
  follow: boolean;
  onToggleFollow: () => void;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  reviewCount: number;
  setReviewCount: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  reviewRatingAvg?: number;
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
  reviewRatingAvg,
}: PromptAuthorAndReviewProps) => {
  const navigate = useNavigate();

  const avg = Math.max(0, Math.min(5, Number(reviewRatingAvg) || 0));

  const [showModal, setShowModal] = useState(false);

  const getSNSIcons = () => {
    if (!user.sns_list?.length) return null;

    const seen = new Set<string>();
    const icons: ReactElement[] = [];

    const normalize = (raw: string) => {
      try {
        const u = new URL(raw.trim());
        const host = u.hostname.replace(/^www\./, '').toLowerCase();
        const path = u.pathname.replace(/\/+$/, '');
        return `${host}${path}`;
      } catch {
        return raw
          .trim()
          .toLowerCase()
          .replace(/^https?:\/\//, '')
          .replace(/^www\./, '')
          .replace(/\/+$/, '');
      }
    };

    user.sns_list.forEach((sns, idx) => {
      const url = sns.url;
      const key = normalize(url);
      if (seen.has(key)) return;
      seen.add(key);

      const lower = url.toLowerCase();

      if (lower.includes('instagram.com')) {
        icons.push(
          <a key={`ig-${idx}`} href={url} target="_blank" rel="noopener noreferrer">
            <img src={InstaIcon} alt="Instagram" className="w-5 h-5" />
          </a>,
        );
        return;
      }
      if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
        icons.push(
          <a key={`yt-${idx}`} href={url} target="_blank" rel="noopener noreferrer">
            <img src={YoutubeIcon} alt="YouTube" className="w-5 h-5" />
          </a>,
        );
        return;
      }
      if (lower.includes('x.com') || lower.includes('twitter.com')) {
        icons.push(
          <a key={`x-${idx}`} href={url} target="_blank" rel="noopener noreferrer">
            <img src={XIcon} alt="X" className="w-5 h-5" />
          </a>,
        );
        return;
      }
    });

    return icons.length ? icons : null;
  };

  return (
    <section className="flex flex-col lg:flex-row gap-[40px] mt-8 w-full max-w-[1236px] xl:px-0 mx-auto">
      {/* 작성자 프로필 카드 */}
      <div className="bg-[#FFFEFB] rounded-[16px] p-6 pt-[32px] w-full lg:w-[30%] xl:w-[35%] self-start">
        <p className="text-sm md:text-base custom-button1 text-gray-500 mb-2">제작자 프로필</p>

        <div className="flex items-center gap-4">
          <img
            src={user?.profileImage ?? defaultProfile}
            alt="profile"
            className="w-[49px] h-[49px] rounded-[12px] border border-gray-300 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-base md:text-lg font-semibold">{user?.nickname ?? 'Unknown'}</p>
            <div className="flex items-center gap-[20px] mt-1">
              {currentUserId !== user?.user_id && <FollowButton follow={follow} onClick={onToggleFollow} />}
              {getSNSIcons()}
            </div>
          </div>
        </div>

        {user.intro && (
          <p className="ml-15 mt-4 text-sm md:text-base custom-body2 text-gray-600 leading-[22px] break-keep">
            {user.intro}
          </p>
        )}

        <div className="mt-5 flex gap-2 flex-col sm:flex-row">
          <button
            className="flex-1 h-[48px] border border-gray-400 rounded-[12px] text-[14px] text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-100 transition"
            onClick={() => setShowModal(true)}>
            <img src={mail} alt="문의하기" className="w-4 h-4" />
            문의하기
          </button>
          <button
            className="flex-1 h-[48px] border border-primary rounded-[12px]  text-[14px] text-[#2563EB] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
            onClick={() => navigate(`/profile/${user?.user_id}`)}>
            <img src={person} alt="프로필 보기" className="w-4 h-4" />
            프로필 보기
          </button>
        </div>
      </div>
      {/* 리뷰 카드 */}
      <div className="bg-[#FFFEFB] rounded-[16px] py-[32px] px-[16px] w-full lg:w-[70%] xl:w-[65%]">
        {/* 상단 요약 */}
        <div className="flex flex-col mb-4 px-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[20px] md:text-[24px] font-medium">리뷰 전체보기</h2>
            <span className="px-[10px] py-[5px] rounded-[50px] border border-[#CCCCCC] bg-[#FFFEFB] text-[#999898] font-medium text-[14px] md:text-[16px]">
              {reviewCount}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <RatingTitle star={avg} />
            <span className="text-[#999898] font-medium text-[14px] md:text-[16px]">{avg.toFixed(1)}점</span>
          </div>
        </div>

        <ReviewList
          reviews={reviews}
          setReviews={setReviews}
          reviewCount={reviewCount}
          setReviewCount={setReviewCount}
          title={title}
          onClose={() => {}}
          currentUserId={currentUserId ?? undefined}
        />
      </div>

      {showModal && <TextModal text="아직 오픈하지 않은 페이지예요!" onClick={() => setShowModal(false)} size="lg" />}
    </section>
  );
};

export default PromptAuthorAndReview;
