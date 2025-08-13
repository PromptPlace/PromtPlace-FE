import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import IconButton from '@components/Button/IconButton';
import FollowButton from '@components/Button/FollowButton';
import Rating from '@components/Rating';
import TagButton from '@components/Button/TagButton';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';

import profile from '../assets/profile.jpg';
import heartNone from '../../../assets/icon-heart-none-big.svg';
import heartOnClick from '../../../assets/icon-heart-blue-big.svg';
import contentCheckIcon from '../assets/contentcheck.png';

import ReviewList from './ReviewList';
import ReportModal from '../components/ReportModal';
import DownloadModal from '../components/DownloadModal';

import usePromptDownload from '@/hooks/mutations/PromptDetailPage/usePromptDownload';
import usePromptLike from '@/hooks/mutations/PromptDetailPage/usePromptLike';
import usePromptUnlike from '@/hooks/mutations/PromptDetailPage/usePromptUnlike';
import useMyLikedPrompts, { likedKeys } from '@/hooks/queries/PromptDetailPage/useMyLikedPrompts';
import useGetAllPromptReviews from '@/hooks/queries/PromptDetailPage/useGetAllPromptReviews';
import useFollow from '@/hooks/mutations/PromptDetailPage/useFollow';
import useUnfollow from '@/hooks/mutations/PromptDetailPage/useUnfollow';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';

import type { PromptDetailDto } from '@/types/PromptDetailPage/PromptDetailDto';
import type { PromptReviewDto } from '@/types/PromptDetailPage/PromptReviewDto';

interface PromptActionsProps {
  title: string;
  price: number;
  isFree: boolean;
  downloads: number;
  likes: number;
  reviewCounts: number;
  rating: number;
  updatedAt: string;
  userId: number;
  user: PromptDetailDto['user'];
  onClickReview: () => void;
}

const PromptActions = ({
  title,
  price,
  isFree,
  downloads,
  likes,
  reviewCounts,
  rating,
  updatedAt,
  userId,
  user,
  onClickReview,
}: PromptActionsProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const promptId = Number(id);
  const qc = useQueryClient();

  const followMut = useFollow();
  const unfollowMut = useUnfollow();

  const likeMut = usePromptLike();
  const unlikeMut = usePromptUnlike();
  const isLiking = likeMut.isPending || unlikeMut.isPending;

  const isAdmin = useMemo(() => {
    try {
      return typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';
    } catch {
      return false;
    }
  }, []);

  const [follow, setFollow] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [tags] = useState<string[]>(['#수묵화', '#수채화', '#디자인', '#일러스트', '#그림', '#이미지']);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [downloadData, setDownloadData] = useState<{ title: string; content: string } | null>(null);

  const [reviews, setReviews] = useState<PromptReviewDto[]>([]);
  const [reviewCount, setReviewCount] = useState(reviewCounts);

  const {
    data: fetchedReviews = [],
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useGetAllPromptReviews(promptId, { enabled: Number.isFinite(promptId), perPage: 100 });

  useEffect(() => {
    if (fetchedReviews.length) {
      setReviews(fetchedReviews);
      setReviewCount(fetchedReviews.length);
    } else if (!isReviewsLoading && !isReviewsError) {
      setReviews([]);
      setReviewCount(0);
    }
  }, [fetchedReviews, isReviewsLoading, isReviewsError]);

  const [isPaid, setIsPaid] = useState(false);
  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();

  const { mutateAsync: fetchDownload, isPending: isDownloading } = usePromptDownload();

  const handleReportButtonClick = () => setIsReportModalOpen(true);
  const handleCloseReportModal = () => setIsReportModalOpen(false);

  const { data: likedSet } = useMyLikedPrompts(Number.isFinite(promptId));

  useEffect(() => {
    if (likedSet && Number.isFinite(promptId)) {
      setLiked(likedSet.has(promptId));
    }
  }, [likedSet, promptId]);

  const handleToggleFollow = async () => {
    if (!Number.isFinite(userId)) return;

    const prev = follow;
    setFollow(!prev);

    try {
      if (!prev) await followMut.mutateAsync(userId);
      else await unfollowMut.mutateAsync(userId);
    } catch (e) {
      setFollow(prev);
      if (isAxiosError(e) && (e.response?.status ?? 0) === 401) {
        handleShowLoginModal(handleToggleFollow);
        return;
      }
      alert('팔로우 처리에 실패했습니다.');
    }
  };

  const handleDownloadClick = async () => {
    if (!Number.isFinite(promptId)) {
      alert('잘못된 접근입니다.');
      return;
    }
    try {
      const res = await fetchDownload(promptId);
      setIsPaid(!!res.is_paid);
      setDownloadData({
        title: res.title || title,
        content: res.content ?? '',
      });
      setIsDownloadModalOpen(true);
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        const status = e.response?.status ?? 0;
        if (status === 401) {
          handleShowLoginModal(handleDownloadClick);
          return;
        }
        if (status === 404) {
          alert('프롬프트를 찾을 수 없습니다.');
          return;
        }
      }
      alert('다운로드 정보를 불러오지 못했습니다.');
    }
  };

  const handleToggleLike = async () => {
    if (!Number.isFinite(promptId) || isLiking) return;

    const prev = liked;
    setLiked(!prev);

    try {
      if (!prev) {
        await likeMut.mutateAsync(promptId);
      } else {
        await unlikeMut.mutateAsync(promptId);
      }
      await qc.invalidateQueries({ queryKey: likedKeys.all });
    } catch (e) {
      setLiked(prev);
      if (isAxiosError(e) && (e.response?.status ?? 0) === 401) {
        handleShowLoginModal(handleToggleLike);
        return;
      }
      alert('찜 처리에 실패했습니다.');
    }
  };

  if (showReviews) {
    return (
      <ReviewList
        reviews={reviews}
        title={title}
        reviewCount={reviewCount}
        setReviews={setReviews}
        onClose={() => setShowReviews(false)}
        currentUserId={1}
        setReviewCount={setReviewCount}
      />
    );
  }

  return (
    <div className={isAdmin ? 'w-[459px] bg-[#FFFEFB] px-8 h-[548px]' : 'w-[459px] bg-[#FFFEFB] px-8 h-[654px]'}>
      {/* 유저 정보 */}
      <div className="h-[96px] box-border flex items-center gap-3">
        <img
          src={user.profileImage ?? profile}
          alt="profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => navigate(`/profile/${user.user_id}`)}
        />
        <div className="flex items-center w-full">
          <p
            className="font-semibold text-[20px] mr-8 cursor-pointer"
            onClick={() => navigate(`/profile/${user.user_id}`)}>
            {user.nickname}
          </p>
          <FollowButton follow={follow} onClick={handleToggleFollow} />
        </div>
      </div>
      <div className="h-[1px] bg-[#CCCCCC] w-full" />

      {/* 제목 */}
      <div className="font-bold text-[24px] pt-[25px]">{title}</div>

      {/* 가격 */}
      <div className="text-[24px] pt-[30px] font-bold">{isFree ? '무료' : `${price.toLocaleString()}원`}</div>

      {/* 버튼 영역 */}
      <div className="h-[96px] pt-[30px] box-border flex items-center">
        {isAdmin ? (
          <img
            src={contentCheckIcon}
            alt="내용 확인"
            className="w-[198px] h-[60px] cursor-pointer"
            onClick={() => alert('내용 확인 버튼 클릭')}
          />
        ) : (
          <>
            <IconButton
              buttonType="squareBig"
              style="fill"
              imgType="download"
              text={isDownloading ? '불러오는 중…' : '다운로드'}
              onClick={() => handleShowLoginModal(handleDownloadClick)}
            />
            {downloadData && (
              <DownloadModal
                isOpen={isDownloadModalOpen}
                onClose={() => setIsDownloadModalOpen(false)}
                title={downloadData.title}
                content={downloadData.content}
                price={price}
                isFree={isFree}
                isPaid={isPaid}
                onPaid={() => setIsPaid(true)}
              />
            )}
          </>
        )}

        <img
          src={liked ? heartOnClick : heartNone}
          alt="heart"
          className="ml-[34px] w-[28px] h-[25px] cursor-pointer"
          onClick={() => handleShowLoginModal(handleToggleLike)}
        />
      </div>

      {/* 별점 및 리뷰보기 */}
      <div>
        <div className="pt-[30px] flex justify-start gap-[30px]">
          <Rating star={Number.isFinite(rating) ? Number(rating) : 0} />
        </div>
        <div className="pt-[30px] text-[20px] flex items-center gap-[10px]">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShowReviews(true)}
            disabled={isReviewsLoading}
            title={isReviewsLoading ? '리뷰 불러오는 중' : '리뷰 보기'}>
            리뷰보기
          </button>
          <span className="w-[37px] h-[28px] px-[10px] py-[5px] border border-[#999999] rounded-full text-[16px] text-[#999898] flex items-center justify-center cursor-pointer">
            {reviewCount}
          </span>
        </div>
      </div>

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-[30px] ${isAdmin ? 'mb-[25px]' : 'mb-[30px]'}`}>
        {tags.map((tag, idx) => (
          <TagButton key={idx} hasDelete={false} text={tag} onClick={() => {}} />
        ))}
      </div>

      {/* 신고 버튼: 일반 사용자만 */}
      {!isAdmin && (
        <>
          <IconButton
            buttonType="squareMd"
            style="red"
            imgType="alert"
            text="프롬프트 신고하기"
            onClick={handleReportButtonClick}
          />
          <ReportModal isOpen={isReportModalOpen} onClose={handleCloseReportModal} promptId={promptId} />
        </>
      )}

      {/* 로그인 모달 */}
      {loginModalShow && (
        <SocialLoginModal isOpen={loginModalShow} onClose={() => setLoginModalShow(false)} onClick={() => {}} />
      )}
    </div>
  );
};

export default PromptActions;
