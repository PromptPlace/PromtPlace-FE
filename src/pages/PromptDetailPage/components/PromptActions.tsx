import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import IconButton from '@components/Button/IconButton';
import FollowButton from '@components/Button/FollowButton';
import Rating from '@components/Rating';
import TagButton from '@components/Button/TagButton';

import profile from '@/assets/icon-profile-gray.svg';
import heartNone from '../../../assets/icon-heart-none-big.svg';
import heartOnClick from '../../../assets/icon-heart-blue-big.svg';
import contentCheckIcon from '../assets/contentcheck.png';

import ReviewList from './ReviewList';
import ReportModal from '../components/ReportModal';
import DownloadModal from '../components/DownloadModal';
import CreateModal from '../components/CreateModal';

import usePromptDownload from '@/hooks/mutations/PromptDetailPage/usePromptDownload';
import usePromptLike from '@/hooks/mutations/PromptDetailPage/usePromptLike';
import usePromptUnlike from '@/hooks/mutations/PromptDetailPage/usePromptUnlike';
import useMyLikedPrompts, { likedKeys } from '@/hooks/queries/PromptDetailPage/useMyLikedPrompts';
import useGetAllPromptReviews from '@/hooks/queries/PromptDetailPage/useGetAllPromptReviews';
import usePatchFollow from '@/hooks/mutations/ProfilePage/usePatchFollow';
import useDeleteFollow from '@/hooks/mutations/ProfilePage/useDeleteFollow';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import PaymentModal from './PaymentModal';
import useGetFollowing from '@/hooks/queries/ProfilePage/useGetFollowing';

import type { PromptDetailDto } from '@/types/PromptDetailPage/PromptDetailDto';
import type { PromptReviewDto } from '@/types/PromptDetailPage/PromptReviewDto';
import { reviewKeys } from '@/hooks/queries/PromptDetailPage/useGetAllPromptReviews';

interface PromptActionsProps {
  title: string;
  price: number;
  isFree: boolean;
  downloads: number;
  reviewCounts: number;
  rating: number;
  updatedAt: string;
  user: PromptDetailDto['user'];
  tags: {
    tag_id: number;
    name: string;
  }[];
  onClickReview: () => void;
}

const PromptActions = ({
  title,
  price,
  isFree,
  reviewCounts,
  rating,
  user,
  onClickReview,
  tags,
}: PromptActionsProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const promptId = Number(id);
  const qc = useQueryClient();

  const [searchParams] = useSearchParams();

  const storedUser = localStorage.getItem('user');
  const currentUserId = storedUser ? JSON.parse(storedUser).user_id : null;

  const { data: myFollowings } = useGetFollowing({
    member_id: Number.isFinite(currentUserId) ? Number(currentUserId) : -1,
  });

  const targetUserId = Number(user.user_id);
  const followMut = usePatchFollow({ member_id: targetUserId });
  const unfollowMut = useDeleteFollow({ member_id: targetUserId });

  const likeMut = usePromptLike();
  const unlikeMut = usePromptUnlike();
  const isLiking = likeMut.isPending || unlikeMut.isPending;
  const [liked, setLiked] = useState(false);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    if (!Array.isArray(myFollowings) || !Number.isFinite(targetUserId)) return;
    const isFollowing = myFollowings.some((f: { member_id: number }) => f.member_id === targetUserId);
    setFollow(isFollowing);
  }, [myFollowings, targetUserId]);

  const isAdmin = useMemo(() => {
    try {
      return typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';
    } catch {
      return false;
    }
  }, []);

  const [showReviews, setShowReviews] = useState(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePaid = () => {
    setIsPaid(true);
    setIsPaymentModalOpen(false);
  };

  const [downloadData, setDownloadData] = useState<{
    title: string;
    content: string;
  } | null>(null);

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
    if (!Number.isFinite(targetUserId)) return;

    const prev = follow;
    setFollow(!prev);

    try {
      if (!prev) {
        await followMut.mutateAsync({ member_id: targetUserId });
      } else {
        await unfollowMut.mutateAsync({ member_id: targetUserId });
      }

      const tasks: Promise<unknown>[] = [];
      if (Number.isFinite(currentUserId)) {
        tasks.push(qc.invalidateQueries({ queryKey: ['member-following', Number(currentUserId)] }));
      }
      tasks.push(qc.invalidateQueries({ queryKey: ['member-follower', targetUserId] }));

      await Promise.all(tasks);
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

    if (!isFree && !isPaid) {
      setIsPaymentModalOpen(true);
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
        if (status === 403) {
          // 403(미결제)일 때 PaymentModal을 띄움
          setIsPaymentModalOpen(true);
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

  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const shouldOpen = searchParams.get('open_review') === 'true';
    if (!shouldOpen) return;

    // 비로그인 시: 로그인 모달 먼저 → 로그인 후 작성 모달 오픈
    if (!currentUserId) {
      handleShowLoginModal(() => setShowCreateModal(true));
    } else {
      setShowCreateModal(true);
    }

    // URL 정리: 새로고침/뒤로가기 시 재오픈 방지
    const url = new URL(window.location.href);
    url.searchParams.delete('open_review');
    navigate(url.pathname + url.search, { replace: true });
  }, [searchParams]);

  if (showReviews) {
    return (
      <ReviewList
        reviews={reviews.map((r) => ({
          review_id: r.review_id,
          writer_id: r.writer_id,
          writer_nickname: r.writer_nickname,
          writer_profile_image_url: r.writer_image_url ?? '',
          rating: r.rating,
          content: r.content,
          created_at: r.created_at,
        }))}
        setReviews={(updated) => {
          if (typeof updated === 'function') {
            setReviews((prev) =>
              updated(
                prev.map((r) => ({
                  review_id: r.review_id,
                  writer_id: r.writer_id,
                  writer_nickname: r.writer_nickname,
                  writer_profile_image_url: r.writer_image_url ?? '',
                  rating: r.rating,
                  content: r.content,
                  created_at: r.created_at,
                })),
              ).map((r) => ({
                review_id: r.review_id,
                writer_id: r.writer_id,
                writer_nickname: r.writer_nickname,
                writer_image_url: r.writer_profile_image_url,
                rating: r.rating,
                content: r.content,
                created_at: r.created_at,
              })),
            );
          } else {
            setReviews(
              updated.map((r) => ({
                review_id: r.review_id,
                writer_id: r.writer_id,
                writer_nickname: r.writer_nickname,
                writer_image_url: r.writer_profile_image_url,
                rating: r.rating,
                content: r.content,
                created_at: r.created_at,
              })),
            );
          }
        }}
        title={title}
        reviewCount={reviewCount}
        setReviewCount={setReviewCount}
        onClose={() => setShowReviews(false)}
        currentUserId={currentUserId}
      />
    );
  }

  return (
    <div className={isAdmin ? 'w-[459px] bg-[#FFFEFB] px-8 h-[548px]' : 'w-[459px] bg-[#FFFEFB] px-8 h-[654px]'}>
      {/* 유저 정보 */}
      <div className="h-[96px] box-border flex items-center gap-3">
        <img
          src={user?.profileImage?.url ?? profile}
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
          {currentUserId !== user.user_id && <FollowButton follow={follow} onClick={handleToggleFollow} />}
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
            {isPaymentModalOpen && ( //유료프롬프트 & 미결제 시 PaymentModal 열기
              <PaymentModal
                prompt={{ user, title, price, isFree } as unknown as PromptDetailDto}
                user={user}
                onClose={() => setIsPaymentModalOpen(false)}
                onPaid={handlePaid}
              />
            )}
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
          onClick={handleToggleLike}
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
        {tags.map((tag) => (
          <TagButton key={tag.tag_id} hasDelete={false} text={tag.name} onClick={() => {}} />
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

      {/* 리뷰 작성 모달 */}

      {showCreateModal && Number.isFinite(promptId) && (
        <CreateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title={title}
          promptId={promptId}
          onSuccess={async () => {
            await qc.invalidateQueries({ queryKey: reviewKeys.allForPrompt(promptId) });

            setShowCreateModal(false);
            setTimeout(() => setShowReviews(true), 0);
          }}
        />
      )}
    </div>
  );
};

export default PromptActions;
