import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetPromptDetail from '@/hooks/queries/PromptDetailPage/useGetPromptDetail';
import Count from '@components/Count';
import ModelButton from '@components/Button/ModelButton';
import TagButton from '@components/Button/TagButton';
import IconButton from '@components/Button/IconButton';
import { useNavigate } from 'react-router-dom';
import { categoryData } from '@/pages/MainPage/components/categoryData';
import usePromptDownload from '@/hooks/mutations/PromptDetailPage/usePromptDownload';
import usePromptLike from '@/hooks/mutations/PromptDetailPage/usePromptLike';
import usePromptUnlike from '@/hooks/mutations/PromptDetailPage/usePromptUnlike';
import useMyLikedPrompts from '@/hooks/queries/PromptDetailPage/useMyLikedPrompts';
import useAdminDeletePrompt from '@/hooks/mutations/PromptDetailPage/Admin/useAdminDeletePrompt';
import { useAuth } from '@/context/AuthContext';
import DualModal from '@components/Modal/DualModal';
import TextModal from '@components/Modal/TextModal';

import updateIcon from '../assets/updatebutton.png';
import deleteIcon from '../assets/deletebutton.png';
import heartNone from '../../../assets/promptDetail/icon-heart-none_gray-300_28px.svg';
import heartOnClick from '../../../assets/promptDetail/icon-heart-fill_gradient_28px.svg';
import reportIcon from '../assets/report.svg';
import star from '../assets/star.png';
import ReportModal from '../components/ReportModal';
import arrowRightBlack from '../assets/arrow_right.svg';
import usePayment from '@/hooks/mutations/MainPage/usePostRequestPayment';
import ShareModal from './ShareModal';

interface Props {
  title: string;
  views: number;
  downloads: number;
  onClose: () => void;
  onClickReview: () => void;
  models?: string[] | null;
  rating?: number;
  tags?: string[] | null;
  description?: string | null;
  usageGuide?: string | null;
  isPaid?: boolean;
  price: number;
  isFree: boolean;
  onPrimaryAction: () => void;
}

type MainCategoryLinkItem = {
  id: number | null;
  name: string;
};

const PromptDetailCard = ({
  title,
  views,
  downloads,
  onClose,
  onClickReview,
  models = [],
  rating,
  tags = [],
  description: descProp,
  usageGuide: usageProp,
  isPaid,
  price,
  isFree,
  onPrimaryAction,
}: Props) => {
  const { id } = useParams<{ id: string }>();
  const promptId = Number(id);
  const { data, isLoading } = useGetPromptDetail(promptId, {
    enabled: Number.isFinite(promptId),
  });

  const accessToken = localStorage.getItem('accessToken');

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const navigate = useNavigate();

  const safeModels = useMemo<string[]>(() => {
    if (Array.isArray(models) && models.length > 0) return models;
    const fromServer = Array.isArray(data?.models) ? data!.models.map((m: any) => m?.model?.name).filter(Boolean) : [];
    return fromServer;
  }, [models, data?.models]);

  const formatDateToDot = (dateStr: string): string => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };

  const rawModelVersion = (data?.model_version ?? '').toString().trim();
  const hasModelVersion = rawModelVersion.length > 0;
  const modelVersionDisplay = hasModelVersion ? rawModelVersion : '버전을 적지 않았어요';
  const uploadedAt = data?.created_at ? formatDateToDot(data.created_at) : '-';

  const rawDescription = descProp ?? data?.description ?? '';
  const oneLiner =
    (typeof rawDescription === 'string'
      ? rawDescription
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)[0]
      : undefined) ?? '';

  const usageGuide = usageProp ?? data?.usage_guide ?? '';
  const promptResult = data?.prompt_result ?? '';
  const rawImages: string[] = Array.isArray(data?.images)
    ? data!.images
        .filter((img): img is { order_index: number; image_url: string } => !!img && typeof img.image_url === 'string')
        .sort((a, b) => (Number(a.order_index) || 0) - (Number(b.order_index) || 0))
        .map((i) => i.image_url)
    : [];

  const normalizedImages = rawImages.slice(0, 3);
  const hasImages = normalizedImages.length > 0;

  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => setActiveIdx(0), [normalizedImages.length]);
  const displayMain = normalizedImages[activeIdx] ?? '';

  const [liked, setLiked] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { data: likedSet } = useMyLikedPrompts();

  const { mutate: likeMutate, isPending: isLiking } = usePromptLike();

  const { mutate: unlikeMutate, isPending: isUnliking } = usePromptUnlike();

  useEffect(() => {
    if (!likedSet || !Number.isFinite(promptId)) return;
    setLiked(likedSet.has(promptId));
  }, [likedSet, promptId]);

  const handleToggleLike = () => {
    if (!Number.isFinite(promptId)) return;
    if (isLiking || isUnliking) return;

    const next = !liked;
    setLiked(next);

    const mutateFn = next ? likeMutate : unlikeMutate;

    mutateFn(promptId, {
      onError: () => {
        setLiked((prev) => !prev);
      },
    });
  };

  const mainCategoryNames = useMemo(() => {
    const list = Array.isArray(data?.categories) ? data!.categories : [];

    const names = list
      .map((c: any) => {
        const mainCatName =
          c?.category?.mainCategory?.name || c?.mainCategory?.name || c?.category?.main_category?.name || null;
        return mainCatName;
      })
      .filter((name: string | null): name is string => !!name && name.trim().length > 0);

    return Array.from(new Set(names));
  }, [data?.categories]);

  const mainCategoryLinkItems = useMemo<MainCategoryLinkItem[]>(
    () =>
      mainCategoryNames.map((name) => {
        const normalizedServerName = name.replace(/\s*\/\s*/g, ' / ').trim();

        const category = categoryData.find((cat) => {
          const normalizedCatName = cat.name.replace(/\s*\/\s*/g, ' / ').trim();
          return normalizedCatName === normalizedServerName;
        });

        return {
          id: category?.id ?? null,
          name,
        };
      }),
    [mainCategoryNames],
  );

  const normalizeCategoryName = (name: string) =>
    name
      .replace(/\s*\/\s*/g, ' / ')
      .replace(/\s+/g, ' ')
      .trim();

  const handleMainCategoryClick = (item: MainCategoryLinkItem) => {
    const prettyName = normalizeCategoryName(item.name);

    if (item.id !== null) {
      const qs = `categoryId=${item.id}&categoryName=${encodeURIComponent(prettyName)}`;
      navigate(`/prompt?${qs}`);
      return;
    }

    const qs = `categoryName=${encodeURIComponent(prettyName)}`;
    navigate(`/prompt?${qs}`);
  };

  const displayTags = useMemo(() => {
    const arr = Array.isArray(tags) ? tags : [];
    return Array.from(
      new Set(
        arr
          .map((t) => t.trim())
          .filter(Boolean)
          .map((t) => t.replace(/\s*\/\s*/g, '•')), // "A / B" → "A•B"
      ),
    );
  }, [tags]);

  // const { mutate: downloadPrompt, isPending } = usePromptDownload();
  // const handleDownload = () => {
  //   downloadPrompt(promptId);
  // };

  const isPaidPrompt = !isFree; // 유료 프롬프트 여부
  const hasPurchased = isPaidPrompt && isPaid; // 구매 완료 여부(유료일 때만 의미 있음)

  const actionLabel = isFree ? '다운로드' : hasPurchased ? '구매완료' : `₩${price.toLocaleString()}`;

  const guideText =
    hasPurchased || isFree
      ? '※ 다운로드를 하고 실제 프롬프트를 사용해보세요!'
      : '※ 결제 후 ‘프롬프트 다운로드’를 누르면 확인하실 수 있습니다. 열람 후에는 환불이 불가합니다.';

  // const { handlePayment } = usePayment();
  //
  // // const handlePrimaryAction = async () => {
  // //   if (accessToken === null) {
  // //     // 로그인하지 않은 경우 로그인 모달 오픈
  // //     onDownload();
  // //     return;
  // //   }
  // //   // 유료 + 구매 전 → 결제 진행
  // //   if (isPaidPrompt && !hasPurchased) {
  // //     try {
  // //       await handlePayment(promptId);
  // //       // const isPaymentSuccess = await handlePayment(promptId);
  // //       // if (isPaymentSuccess === true) {
  // //       //   onDownload();
  // //       // }
  // //     } catch (err: any) {
  // //       alert(err.message || '결제에 실패했습니다.');
  // //     }
  // //     return;
  // //   }
  // //   // 무료 or 구매 완료 → 다운로드 동작
  // //   onDownload();
  // // };

  const { user } = useAuth();
  const isAdmin = user.role === 'ADMIN';

  const { mutate: adminDeleteMutate, isPending: isAdminDeleting } = useAdminDeletePrompt();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleAdminEdit = () => {
    navigate(`/prompt/${promptId}/edit`);
  };

  const handleAdminDelete = () => {
    if (!Number.isFinite(promptId)) return;

    const ok = window.confirm('이 프롬프트를 삭제할까요? (관리자 권한)');
    if (!ok) return;

    adminDeleteMutate(promptId, {
      onSuccess: () => {
        alert('프롬프트 삭제 성공(관리자)');
        navigate(-1);
      },
      onError: (err: unknown) => {
        alert('삭제에 실패했습니다. (권한/존재 여부를 확인해주세요)');
        console.error(err);
      },
    });
  };

  return (
    <>
      <div className="w-full max-w-[1236px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-6 ">
          <div className="flex items-start justify-between font-light gap-4">
            {mainCategoryLinkItems.length > 0 ? (
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2">
                  {mainCategoryLinkItems.map((cat) => {
                    const displayName = cat.name
                      .replace(/\s*\/\s*/g, ' • ')
                      .replace(/\s+/g, ' ')
                      .trim();

                    return (
                      <button
                        key={`${cat.name}-${cat.id ?? 'none'}`}
                        type="button"
                        onClick={() => handleMainCategoryClick(cat)}
                        className="inline-flex items-center gap-1 text-[14px] text-[#030712]
                        px-3 py-2 hover:bg-gray-100 transition cursor-pointer"
                        aria-label={`메인 카테고리 ${displayName}로 이동`}>
                        {displayName}
                        <img src={arrowRightBlack} alt="" className="w-[16px] h-[16px]" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <span className="text-[14px] text-[#030712]">—</span>
            )}

            <button
              type="button"
              className="shrink-0 self-end whitespace-nowrap text-[12px] text-gray-400 underline flex items-center gap-1"
              onClick={() => setIsReportModalOpen(true)}>
              <img src={reportIcon} alt="신고" className="w-[24px] h-[24px]" />
              해당 프롬프트 신고하기
            </button>

            <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} promptId={promptId} />
          </div>
        </div>

        {/* 카드 본문 */}
        <div className="w-full bg-[#FFFEFB] rounded-[16px] p-6 max-w-[1236px] mx-auto flex flex-col gap-6">
          <div className="flex items-start justify-between mb-1 flex-wrap gap-y-1">
            <div className="flex-1 min-w-0">
              {/* 상단: 모델들 + (오른쪽) 모델버전 + 관리자버튼(세로) */}
              <div className="flex items-start justify-between flex-wrap gap-y-1">
                {/* 왼쪽: 모델 버튼들 */}
                <div className="flex flex-wrap gap-2 font-medium text-[14px]">
                  {safeModels.map((m, i) => (
                    <ModelButton key={`${m}-${i}`} text={m} />
                  ))}
                </div>

                {/* 오른쪽: 모델버전 + 관리자버튼 */}
                <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
                  <div className="inline-flex items-center gap-2 text-[12px] whitespace-nowrap bg-gray-50 rounded-[8px] px-3 py-2">
                    <span className="text-[#374151] font-light">AI 모델의 버전은?</span>
                    <span className={`font-medium ${hasModelVersion ? 'text-[#030712]' : 'text-on-white'}`}>
                      {modelVersionDisplay}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                {/* 왼쪽: 타이틀 */}
                <h1 className="mt-2 font-medium text-[24px] md:text-[32px] text-[#030712] leading-tight break-words whitespace-normal min-w-0">
                  {title}
                </h1>

                {/* 오른쪽: 관리자 버튼 */}
                {isAdmin && (
                  <div className="mt-2 flex gap-2 shrink-0">
                    {/* <button
                      className="w-[26px] h-[26px]"
                      aria-label="수정"
                      onClick={handleAdminEdit}
                      disabled={isAdminDeleting}>
                      <img src={updateIcon} alt="수정" />
                    </button> */}

                    <button
                      className="w-[22px] h-[22px]"
                      aria-label="삭제"
                      onClick={() => setIsDeleteConfirmOpen(true)}
                      disabled={isAdminDeleting}>
                      <img src={deleteIcon} alt="삭제" />
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-[16px] font-light text-[16px] leading-[22px] text-[#030712]">{oneLiner}</p>

              {/* 모바일 모델버전 표시부분 */}
              <div className="my-[16px] inline-flex md:hidden items-center gap-2 text-[12px] bg-gray-50 rounded-[8px] px-3 py-2">
                <span className="text-[#374151] font-light">AI 모델의 버전은?</span>
                <span className={`font-medium ${hasModelVersion ? 'text-[#030712]' : 'text-on-white'}`}>
                  {modelVersionDisplay}
                </span>
              </div>

              <div className="mt-[12px] flex justify-between items-center flex-wrap font-medium">
                {/* 왼쪽 영역 */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-6">
                    <span className="text-[14px] text-[#6B7280]">업로드&nbsp;&nbsp;&nbsp;{uploadedAt}</span>
                    <Count imgType="eye" count={views} />
                    <Count imgType="download" count={downloads} />
                  </div>
                  <div>
                    <IconButton
                      buttonType="squareBig"
                      style="fill"
                      imgType="download"
                      text={actionLabel}
                      onClick={onPrimaryAction}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 본문 */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <section className="md:col-span-5 w-full max-w-full">
              {/* 아이콘 + 텍스트 묶음 */}
              <div className="flex items-start gap-3 mb-1">
                <img src={star} alt="별 아이콘" className="w-[36px] h-[35px]" />

                {/* 오른쪽 텍스트 컬럼 */}
                <div>
                  <p className="text-[13px] text-[#6b7280] custom-body2 leading-none mb-[8px]">
                    이 프롬프트를 다운받아 입력하면
                  </p>
                  <h3 className="mb-[28px] font-medium text-[18px] md:text-[20px]">AI가 이렇게 대답해줘요</h3>
                </div>
              </div>

              {hasImages ? (
                <>
                  <div className="relative w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: '4 / 3' }}>
                    {displayMain && (
                      <img
                        src={displayMain}
                        alt="prompt-main"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="mt-[20px] flex items-center justify-center gap-[20px]">
                    {normalizedImages.map((url, i) => {
                      const isActive = activeIdx === i;
                      return (
                        <button
                          key={url + i}
                          type="button"
                          onClick={() => setActiveIdx(i)}
                          aria-label={`미리보기 ${i + 1}`}
                          aria-pressed={isActive}
                          className={`h-[56px] w-[56px] rounded-[10px] overflow-hidden ring-2 ${
                            isActive ? 'ring-[#6198FF]' : 'ring-[#E5E7EB]'
                          }`}>
                          <img src={url} alt="" className="h-full w-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="mt-[28px] w-full max-w-[485px] rounded-[12px] rounded-tl-none bg-[#F0F7FF] p-4 overflow-hidden">
                  <p className="text-[14px] font-light leading-[160%] tracking-[0.02em] whitespace-pre-wrap break-words [word-break:break-word]">
                    {isLoading ? '불러오는 중…' : promptResult || ''}
                  </p>
                </div>
              )}
              {hasImages && (
                <div className="mt-4 text-[15px] leading-[160%] tracking-[0.02em] whitespace-pre-wrap break-words [word-break:break-word]">
                  {isLoading ? '불러오는 중…' : promptResult || ''}
                </div>
              )}
            </section>

            <aside className="md:col-span-6 w-full max-w-full">
              <p className="text-[14px] font-light text-[#6b7280] mb-[8px]">이 프롬프트의 활용법이 궁금하다면</p>
              <h3 className="mb-[28px] font-medium text-[18px] md:text-[20px]">이렇게 쓰는 프롬프트예요</h3>

              <div className="text-[16px] font-light leading-[160%] tracking-[0.02em] whitespace-pre-line">
                {isLoading ? '불러오는 중…' : hasImages ? usageGuide || '' : usageGuide || ''}
              </div>
            </aside>
          </div>

          <div className="mt-6 flex flex-col-reverse lg:flex-row lg:justify-between lg:items-end gap-4">
            {/* 태그 */}
            <div className="flex flex-wrap gap-[20px] lg:justify-start">
              {displayTags.length > 0 ? (
                displayTags.map((t) => <TagButton key={t} hasDelete={false} text={t} onClick={() => {}} />)
              ) : (
                <span className="text-[12px] text-[#9aa0a6]">태그가 없습니다.</span>
              )}
            </div>
            {/* 찜하기 + 공유 버튼 */}
            <div className="flex flex-col items-end text-right w-full lg:w-auto">
              <div className="flex items-center gap-3 mt-2 lg:mt-0">
                {/* 찜하기 버튼 */}
                <button
                  className="w-[49px] h-[49px] rounded-[12px] bg-[#FFFEFB] border-[1px] border-[#D1D5DB] flex items-center justify-center"
                  onClick={handleToggleLike}
                  aria-label="찜하기">
                  <img src={liked ? heartOnClick : heartNone} alt="찜하기" className="w-[28px] h-[28px]" />
                </button>

                {/* 공유 버튼 */}
                <button
                  className="w-[49px] h-[49px] rounded-[12px] bg-[#FFFEFB] border-[1px] border-[#D1D5DB] flex items-center justify-center"
                  onClick={() => setIsShareModalOpen(true)}
                  aria-label="공유하기">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="5" r="3" stroke="#6B7280" strokeWidth="1.8" />
                    <circle cx="6" cy="12" r="3" stroke="#6B7280" strokeWidth="1.8" />
                    <circle cx="18" cy="19" r="3" stroke="#6B7280" strokeWidth="1.8" />
                    <line x1="8.82" y1="10.59" x2="15.18" y2="6.41" stroke="#6B7280" strokeWidth="1.8" />
                    <line x1="8.82" y1="13.41" x2="15.18" y2="17.59" stroke="#6B7280" strokeWidth="1.8" />
                  </svg>
                </button>
              </div>

              <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title={title} />
            </div>
          </div>
        </div>
      </div>

      {isDeleteConfirmOpen && (
        <DualModal
          text="해당 프롬프트를 삭제 조치 하시겠습니까?"
          onClickYes={() => {
            if (!Number.isFinite(promptId) || isAdminDeleting) return;

            adminDeleteMutate(promptId, {
              onSuccess: () => {
                setIsDeleteConfirmOpen(false);
                alert('프롬프트 삭제가 완료되었습니다.');
                navigate('/prompt'); // 또는 navigate(-1)
              },
              onError: (err: unknown) => {
                setIsDeleteConfirmOpen(false);
                alert('삭제에 실패했습니다. (권한/토큰 확인)');
                console.error(err);
              },
            });
          }}
          onClickNo={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </>
  );
};

export default PromptDetailCard;
