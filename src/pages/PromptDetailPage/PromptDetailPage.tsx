import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

// components
import PromptDetailCard from './components/PromptDetailCard';
import PromptAuthorAndReview from './components/PromptAuthorAndReview';
import ReportModal from './components/ReportModal';
import DownloadModal from './components/DownloadModal';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import PaymentModal from './components/PaymentModal';

// hooks
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import usePromptDownload from '@/hooks/mutations/PromptDetailPage/usePromptDownload';
import useGetPromptDetail from '@/hooks/queries/PromptDetailPage/useGetPromptDetail';
import usePatchFollow from '@/hooks/mutations/ProfilePage/usePatchFollow';
import useDeleteFollow from '@/hooks/mutations/ProfilePage/useDeleteFollow';
import useGetFollowing from '@/hooks/queries/ProfilePage/useGetFollowing';
import useGetAllPromptReviews from '@/hooks/queries/PromptDetailPage/useGetAllPromptReviews';

import type { Review } from './components/ReviewList';

const PromptDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const promptId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) && n > 0 ? n : NaN;
  }, [id]);

  const qc = useQueryClient();
  const { data: prompt, isLoading } = useGetPromptDetail(promptId);

  const storedUser = localStorage.getItem('user');
  const currentUserId = storedUser ? JSON.parse(storedUser).user_id : null;
  const targetUserId = prompt?.user?.user_id ?? -1;

  const followMut = usePatchFollow({ member_id: targetUserId });
  const unfollowMut = useDeleteFollow({ member_id: targetUserId });
  const { data: myFollowings } = useGetFollowing({
    member_id: Number.isFinite(currentUserId) ? Number(currentUserId) : -1,
  });

  const [follow, setFollow] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [downloadData, setDownloadData] = useState<{ title: string; content: string } | null>(null);

  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const { data: allReviews } = useGetAllPromptReviews(promptId, {
    enabled: Number.isFinite(promptId),
  });

  useEffect(() => {
    if (Array.isArray(allReviews)) {
      setReviews(
        allReviews.map((r) => ({
          review_id: r.review_id,
          writer_id: r.writer_id,
          writer_profile_image_url: r.writer_image_url ?? null,
          writer_nickname: r.writer_nickname,
          rating: Number(r.rating) || 0,
          content: r.content,
          created_at: r.created_at,
        })),
      );
      setReviewCount(allReviews.length);
    } else {
      setReviews([]);
      setReviewCount(0);
    }
  }, [allReviews]);

  useEffect(() => {
    if (!Array.isArray(myFollowings) || !Number.isFinite(targetUserId)) return;
    const isFollowing = myFollowings.some((f: { member_id: number }) => f.member_id === targetUserId);
    setFollow(isFollowing);
  }, [myFollowings, targetUserId]);

  const { mutateAsync: fetchDownload } = usePromptDownload();
  const handleDownloadClick = async () => {
    if (!Number.isFinite(promptId)) return;
    if (prompt && !prompt.is_free && !isPaid) {
      setIsPaymentModalOpen(true);
      return;
    }

    try {
      const res = await fetchDownload(promptId);
      if (!prompt?.is_free) setIsPaid(res.is_paid ?? false);
      setDownloadData({ title: res.title, content: res.content ?? '' });
      setIsDownloadModalOpen(true);
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        const status = e.response?.status;
        if (status === 401) {
          handleShowLoginModal(() => handleDownloadClick());
          return;
        }
        if (status === 403) {
          setIsPaymentModalOpen(true);
          return;
        }
      }
      alert('다운로드를 불러오지 못했습니다.');
    }
  };

  const handlePaid = () => {
    setIsPaid(true);
    setIsPaymentModalOpen(false);
  };

  const handleToggleFollow = async () => {
    if (!Number.isFinite(targetUserId)) return;
    const prev = follow;
    setFollow(!prev);

    try {
      if (!prev) await followMut.mutateAsync({ member_id: targetUserId });
      else await unfollowMut.mutateAsync({ member_id: targetUserId });

      if (Number.isFinite(currentUserId))
        await qc.invalidateQueries({ queryKey: ['member-following', Number(currentUserId)] });
      await qc.invalidateQueries({ queryKey: ['member-follower', targetUserId] });
    } catch (e) {
      setFollow(prev);
      if (isAxiosError(e) && (e.response?.status ?? 0) === 401) handleShowLoginModal(handleToggleFollow);
      else alert('팔로우 처리에 실패했습니다.');
    }
  };

  if (!Number.isFinite(promptId)) return <div>잘못된 접근입니다.</div>;
  if (isLoading) return <div className="text-center text-gray-500 text-sm py-12">프롬프트 불러오는 중...</div>;
  if (!prompt) return <div>프롬프트를 불러오지 못했습니다.</div>;

  const modelNames = Array.isArray(prompt.models) ? prompt.models.map((m) => m?.name).filter(Boolean) : [];

  const tagNames = Array.isArray(prompt.categories)
    ? prompt.categories.map((c) => c?.category?.name).filter((v): v is string => !!v && v.trim().length > 0)
    : [];

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-8 pt-[64px] px-5 md:px-8 min-[1025px]:px-[102px]">
      <div className="w-full flex flex-col gap-[20px] max-lg:gap-5 max-md:gap-4 max-sm:gap-3">
        <PromptDetailCard
          title={prompt.title}
          views={prompt.views}
          downloads={prompt.downloads}
          onClose={() => navigate(-1)}
          onClickReview={() => {}}
          models={modelNames}
          tags={tagNames}
          description={prompt.description}
          usageGuide={prompt.usage_guide}
          isPaid={isPaid}
          price={prompt.price}
          isFree={prompt.is_free}
          onDownload={() => handleShowLoginModal(handleDownloadClick)}
        />

        <PromptAuthorAndReview
          user={prompt.user}
          currentUserId={currentUserId}
          follow={follow}
          onToggleFollow={handleToggleFollow}
          reviews={reviews}
          setReviews={setReviews}
          reviewCount={reviewCount}
          setReviewCount={setReviewCount}
          reviewRatingAvg={Number(prompt.review_rating_avg ?? 0)}
          title={prompt.title}
        />
      </div>

      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} promptId={promptId} />
      {isPaymentModalOpen && (
        <PaymentModal
          promptId={Number(id)}
          title={prompt.title}
          price={prompt.price}
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
          price={prompt.price}
          isFree={prompt.is_free}
          isPaid={isPaid}
          onPaid={() => setIsPaid(true)}
        />
      )}
      {loginModalShow && (
        <SocialLoginModal
          isOpen={loginModalShow}
          onClose={() => setLoginModalShow(false)}
          onClick={handleDownloadClick}
        />
      )}
    </div>
  );
};

export default PromptDetailPage;
