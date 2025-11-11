import { useEffect, useState } from 'react';
import FollowButton from '@components/Button/FollowButton';
import ReviewList from './ReviewList';
import defaultProfile from '../assets/profile.png';
import mail from '../../../assets/icon-mail-black.svg';
import person from '../../../assets/icon-person-blue.svg';
import { useNavigate, useParams } from 'react-router-dom';
import RatingTitle from '@components/RatingTitle';
import type { ReactElement } from 'react';
import { useAuth } from '@/context/AuthContext';
import useGetFollowing from '@/hooks/queries/ProfilePage/useGetFollowing';
import usePatchFollow from '@/hooks/mutations/ProfilePage/usePatchFollow';
import useDeleteFollow from '@/hooks/mutations/ProfilePage/useDeleteFollow';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import EditableRating from '../components/EditableRating';
import useCreateReview from '@/hooks/mutations/PromptDetailPage/useCreateReview';
import type { AxiosError } from 'axios';
import useGetDownloadedPrompts from '@/hooks/queries/PromptDetailPage/useGetMyDownloadedPrompts';
import { useQueryClient } from '@tanstack/react-query';

import InstaIcon from '@assets/icon-instagram-logo.svg';
import YoutubeIcon from '@assets/icon-youtube-logo.svg';
import XIcon from '@assets/icon-x-logo.svg';
import TextModal from '@components/Modal/TextModal';
import star from '../assets/star.png';

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
  reviews,
  setReviews,
  reviewCount,
  setReviewCount,
  title,
  reviewRatingAvg,
}: PromptAuthorAndReviewProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const promptId = Number(id);
  const { user: me } = useAuth();
  const myId = me.user_id;
  const member_id = user?.user_id;

  const queryClient = useQueryClient();
  const { data: downloadedPrompts } = useGetDownloadedPrompts();
  const isDownloaded = downloadedPrompts?.data?.some((item) => item.prompt_id === promptId);

  const avg = Math.max(0, Math.min(5, Number(reviewRatingAvg) || 0));
  const [showModal, setShowModal] = useState(false);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState(false);

  const { data: myFollowingData, isLoading: isFollowingLoading } = useGetFollowing({ member_id: myId });
  const { mutate: mutateFollow } = usePatchFollow({ member_id });
  const { mutate: mutateUnFollow } = useDeleteFollow({ member_id });
  const { handleShowLoginModal } = useShowLoginModal();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const { mutateAsync: createMutate, isPending } = useCreateReview();

  useEffect(() => {
    if (!myFollowingData?.data || !member_id) return;
    const followed = myFollowingData.data.some((f: any) => f.following_id === member_id);
    setIsFollow(followed);
  }, [myFollowingData, member_id]);

  const ready = !!member_id && !!myId && !isFollowingLoading;
  const isMyself = currentUserId === member_id || myId === member_id;

  const handleFollow = () => {
    if (!ready || isToggling) return;
    if (isMyself) return;

    handleShowLoginModal(() => {
      setIsToggling(true);
      try {
        if (isFollow) mutateUnFollow({ member_id });
        else mutateFollow({ member_id });
        setIsFollow((prev) => !prev);
      } finally {
        setIsToggling(false);
      }
    });
  };

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
      if (lower.includes('instagram.com'))
        icons.push(
          <a key={`ig-${idx}`} href={url} target="_blank" rel="noopener noreferrer">
            <img src={InstaIcon} alt="Instagram" className="w-5 h-5" />
          </a>,
        );
      else if (lower.includes('youtube.com') || lower.includes('youtu.be'))
        icons.push(
          <a key={`yt-${idx}`} href={url} target="_blank" rel="noopener noreferrer">
            <img src={YoutubeIcon} alt="YouTube" className="w-5 h-5" />
          </a>,
        );
      else if (lower.includes('x.com') || lower.includes('twitter.com'))
        icons.push(
          <a key={`x-${idx}`} href={url} target="_blank" rel="noopener noreferrer">
            <img src={XIcon} alt="X" className="w-5 h-5" />
          </a>,
        );
    });

    return icons.length ? icons : null;
  };

  const handleCreateReview = async () => {
    if (!rating || !reviewText.trim()) {
      alert('별점과 리뷰 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const res = await createMutate({
        promptId,
        body: { content: reviewText.trim(), rating },
      });

      setReviews((prev) => [res.data, ...prev]);
      setReviewCount((prev) => prev + 1);
      setReviewText('');
      setRating(0);
      alert('리뷰가 등록되었습니다!');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('리뷰 작성에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
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
              {currentUserId !== user?.user_id && myId !== user?.user_id && (
                <FollowButton follow={isFollow} onClick={handleFollow} />
              )}
              {getSNSIcons()}
            </div>
          </div>
        </div>

        {user.intro && (
          <p className="ml-15 mt-4 text-sm md:text-base custom-body2 text-gray-600 leading-[22px] break-keep">
            {user.intro}
          </p>
        )}

        <div className="mt-5 flex gap-2 flex-row w-full">
          <button
            className="flex-1 h-[48px] border border-gray-400 rounded-[12px] text-[14px] text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-100 transition"
            onClick={() => setShowModal(true)}>
            <img src={mail} alt="문의하기" className="w-4 h-4" />
            문의하기
          </button>
          <button
            className="flex-1 h-[48px] border border-primary rounded-[12px] text-[14px] text-[#2563EB] flex items-center justify-center gap-3 hover:bg-blue-50 transition"
            onClick={() => navigate(`/profile/${user?.user_id}`)}>
            <img src={person} alt="프로필 보기" className="w-4 h-4" />
            프로필 보기
          </button>
        </div>
      </div>

      {/* 리뷰 카드 */}
      <div className="bg-[#FFFEFB] rounded-[16px] py-[32px] px-[16px] w-full lg:w-[70%] xl:w-[65%] overflow-visible relative">
        <section>
          {isDownloaded && (
            <div className="px-6 mb-6">
              <div className="flex items-start gap-3 mb-1">
                <img src={star} alt="별 아이콘" className="w-[36px] h-[35px]" />
                <div>
                  <h2 className="text-[24px] font-semibold text-[#030712] mb-2">리뷰를 작성해주세요!</h2>
                  <p className="text-gray-700 text-[16px] mb-5 font-light">
                    프롬프트 제작자와 다른 사용자에게 도움 될 수 있어요.
                  </p>
                </div>
              </div>

              <p className="text-[16px] font-medium text-[#030712] mb-6">별점을 눌러 만족도를 알려주세요.</p>

              <div className="flex justify-center mb-6">
                <EditableRating star={rating} onChange={setRating} />
              </div>

              <p className="text-[16px] font-medium text-[#030712] mb-6">해당 프롬프트에 대한 생각을 남겨주세요.</p>

              <textarea
                className="w-full bg-gray-50 border-none rounded-[12px] p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="이 프롬프트를 사용해본 소감을 남겨주세요."
                rows={10}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                disabled={isPending}
              />

              <div className="flex items-center mt-5">
                <button
                  type="button"
                  onClick={handleCreateReview}
                  disabled={isPending || !rating || !reviewText.trim()}
                  className={`w-full h-[49px] rounded-[12px] border text-[16px] font-medium transition-colors duration-200 ${
                    isPending || !rating || !reviewText.trim()
                      ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed'
                      : 'border-[#2563EB] text-[#2563EB] hover:bg-blue-50'
                  }`}>
                  {isPending ? '작성 중…' : '리뷰 올리기'}
                </button>
              </div>
            </div>
          )}{' '}
        </section>

        {/* 상단 요약 */}
        <div className="flex flex-col mb-4 px-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[20px] md:text-[24px] font-medium">리뷰 전체보기</h2>
            <span className="px-[10px] py-[5px] rounded-[50px] border border-[#CCCCCC] bg-[#FFFEFB] text-[#999898] font-medium text-[14px] md:text-[16px]">
              {reviewCount}
            </span>
          </div>

          {reviewCount > 0 && (
            <div className="flex items-center gap-4">
              <RatingTitle star={avg} />
              <span className="text-[#999898] font-medium text-[14px] md:text-[16px]">{avg.toFixed(1)}점</span>
            </div>
          )}
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
