import PromptHeader from './components/PromptHeader';
import PromptInfo from './components/PromptInfo';
import PromptActions from './components/PromptActions';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ReviewList from './components/ReviewList';
import IconButton from '@components/Button/IconButton';
import profile from '@assets/icon-profile-blue-small.svg';
import FollowButton from '@components/Button/FollowButton';
import ArrowLeft from './assets/keyboard_arrow_down _left.svg';
import ReportModal from './components/ReportModal';
import DownloadModal from './components/DownloadModal';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import SocialLoginModal from '@/components/Modal/SocialLoginModal';
import useGetPromptDetail from '@/hooks/queries/PromptDetailPage/useGetPromptDetail';
import useGetAllPromptReviews from '@/hooks/queries/PromptDetailPage/useGetAllPromptReviews';
import usePromptDownload from '@/hooks/mutations/PromptDetailPage/usePromptDownload';
import type { Review as UIReview } from './components/ReviewList';
import { isAxiosError } from 'axios';

const PromptDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const promptId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) && n > 0 ? n : NaN;
  }, [id]);

  const { data, isLoading, isError } = useGetPromptDetail(promptId);

  const { mutateAsync: fetchDownload, isPending: isDownloading } = usePromptDownload();

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const [showReviews, setShowReviews] = useState(false);
  const [follow, setFollow] = useState(false);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const handleOpenReportModal = () => setIsReportModalOpen(true);
  const handleCloseReportModal = () => setIsReportModalOpen(false);

  const [reviews, setReviews] = useState<UIReview[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadData, setDownloadData] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const [isPaid, setIsPaid] = useState(false);
  const { loginModalShow, setLoginModalShow, handleShowLoginModal } = useShowLoginModal();

  const prompt = useMemo(() => {
    if (!data) return null;
    return {
      prompt_id: data.prompt_id,
      user_id: data.user_id,
      title: data.title,
      prompt: data.prompt,
      prompt_result: data.prompt_result,
      has_image: !!data.has_image,
      description: data.description,
      usage_guide: data.usage_guide,
      price: Number.isFinite(data.price) ? Number(data.price) : 0,
      is_free: !!data.is_free,
      downloads: Number.isFinite(data.downloads) ? Number(data.downloads) : 0,
      views: Number.isFinite(data.views) ? Number(data.views) : 0,
      likes: Number.isFinite(data.likes) ? Number(data.likes) : 0,
      review_counts: Number.isFinite(data.review_counts) ? Number(data.review_counts) : 0,
      rating_avg: Number.isFinite(data.rating_avg) ? Number(data.rating_avg) : 0,
      updated_at: data.updated_at ?? '',
      user: data.user,
      tags: (data.tags ?? [])
        .filter((t) => t?.tag)
        .map((t) => ({
          tag_id: t.tag.tag_id,
          name: t.tag.name,
        })),

      model:
        Array.isArray(data.models) && data.models.length > 0 && data.models[0]?.model?.name
          ? data.models[0].model.name
          : '',
    };
  }, [data]);

  useEffect(() => {
    if (prompt) setReviewCount(prompt.review_counts);
  }, [prompt]);

  const {
    data: allReviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useGetAllPromptReviews(promptId, { enabled: showReviews, perPage: 50 });

  useEffect(() => {
    if (prompt) setReviewCount(prompt.review_counts);
  }, [prompt]);

  useEffect(() => {
    if (!allReviews) return;
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
  }, [allReviews]);

  const handleDownloadClick = async () => {
    if (!Number.isFinite(promptId)) return;
    try {
      const res = await fetchDownload(promptId);
      setIsPaid(res.is_paid ?? false);
      setDownloadData({
        title: res.title,
        content: res.content ?? '',
      });
      setIsDownloadModalOpen(true);
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        const status = e.response?.status;
        if (status === 401) {
          handleShowLoginModal(() => handleDownloadClick());
          return;
        }
        if (status === 404) {
          alert('프롬프트를 찾을 수 없습니다.');
          return;
        }
      }
      alert('다운로드를 불러오지 못했습니다.');
    }
  };

  if (!Number.isFinite(promptId)) return <div>잘못된 접근입니다. (유효하지 않은 ID)</div>;
  if (isLoading) return <div>로딩 중…</div>;
  if (isError || !prompt) return <div>프롬프트를 불러오지 못했습니다.</div>;

  if (showReviews) {
    if (isReviewsLoading) return <div>리뷰 불러오는 중…</div>;
    if (isReviewsError) return <div>리뷰를 불러오지 못했습니다.</div>;

    return (
      <ReviewList
        reviews={reviews}
        setReviews={setReviews}
        reviewCount={reviewCount}
        setReviewCount={setReviewCount}
        title={prompt.title}
        onClose={() => setShowReviews(false)}
        currentUserId={1}
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
            <img
              src={prompt.user?.profileImage?.url ?? profile}
              alt="profile"
              className="w-[36px] h-[36px] rounded-full object-cover"
            />
          </div>

          {/* 닉네임 + 팔로우 */}
          <div className="flex items-center w-[214px]">
            <p className="font-medium text-[12px] mr-[10px]">{prompt.user?.nickname ?? '작성자'}</p>
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
            onClose={() => navigate(-1)}
            downloads={prompt.downloads}
            onClickReview={() => setShowReviews(true)}
            model={prompt.model}
            tags={prompt.tags.map((tag) => tag.name)}
          />

          <PromptInfo description={prompt.description} usageGuide={prompt.usage_guide} />
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
            reviewCounts={prompt.review_counts}
            rating={prompt.rating_avg}
            updatedAt={prompt.updated_at}
            tags={prompt.tags}
            onClickReview={() => setShowReviews(true)}
            user={{
              user_id: prompt.user.user_id,
              nickname: prompt.user.nickname,
              profileImage: prompt.user.profileImage,
            }}
          />
        </div>
      </div>

      {/* 모바일 하단 고정 영역 */}
      <div className="lg:hidden bottom-0 fixed left-1/2 -translate-x-1/2 z-[10]  max-w-[425px] h-[139px] w-full flex justify-center pointer-events-none">
        <div className="bg-white max-w-[425px] rounded-t-[24px] shadow-[0_-4px_12px_rgba(0,0,0,0.1)] p-[20px] h-[139px] z-[10] w-full h-full pointer-events-auto">
          <div className="flex justify-between w-full h-full">
            <div
              className={`flex items-center ${isPaid ? 'gap-[10px]' : 'gap-[20px]'} h-[34px] ${
                isPaid ? 'ml-[8%]' : 'ml-[28%]'
              }`}>
              {isPaid && <span className="text-[16px] font-medium text-black whitespace-nowrap">구매 완료</span>}

              <span className="text-[16px] font-medium text-black">{prompt.price.toLocaleString()}원</span>

              <IconButton
                buttonType="squareBig"
                style="fill"
                imgType="download"
                text="다운로드"
                onClick={() => handleShowLoginModal(handleDownloadClick)}
              />
            </div>
          </div>
        </div>
      </div>

      <ReportModal isOpen={isReportModalOpen} onClose={handleCloseReportModal} promptId={promptId} />

      {downloadData && (
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          title={downloadData.title}
          content={downloadData.content}
          isFree={prompt.is_free}
          isPaid={isPaid}
          price={prompt.price}
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
