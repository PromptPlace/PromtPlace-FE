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

import updateIcon from '../assets/updatebutton.png';
import deleteIcon from '../assets/deletebutton.png';
import heartNone from '../../../assets/promptDetail/icon-heart-none_gray-300_28px.svg';
import heartOnClick from '../../../assets/promptDetail/icon-heart-fill_gradient_28px.svg';
import reportIcon from '../assets/report.svg';
import star from '../assets/star.png';
import ReportModal from '../components/ReportModal';
import arrowRightBlack from '../assets/arrow_right.svg';
import XIcon from '@assets/icon-x-logo.svg';
import KakaoIcon from '../assets/kakaotalk-logo.svg';
import LinkIcon from '../assets/link-logo.svg';
import FacebookIcon from '../assets/facebook-logo.svg';

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
  onDownload: () => void;
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
  isPaid = false,
  price,
  isFree,
  onDownload,
}: Props) => {
  const { id } = useParams<{ id: string }>();
  const promptId = Number(id);
  const { data, isLoading } = useGetPromptDetail(promptId, {
    enabled: Number.isFinite(promptId),
  });

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
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

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

  const { mutate: downloadPrompt, isPending } = usePromptDownload();
  const handleDownload = () => {
    downloadPrompt(promptId);
  };

  const currentUrl = window.location.href;

  // Kakao SDK 초기화
  useEffect(() => {
    if (!window.Kakao) return;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  // Facebook 공유
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  // X (트위터)
  const handleXShare = () => {
    const text = encodeURIComponent(`${title} - PromptPlace`);
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  // Kakao 공유
  const handleKakaoShare = () => {
    if (!window.Kakao) {
      alert('카카오 SDK를 불러오지 못했습니다.');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: 'PromptPlace에서 확인해보세요!',
        imageUrl: displayMain || 'https://your-default-image-url.com/logo.png',
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '프롬프트 보러가기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });
  };

  // 링크 복사
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('링크가 복사되었습니다!');
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  return (
    <>
      <div className="w-full max-w-[1236px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-6 ">
          <div className="flex items-center justify-between font-light">
            {mainCategoryLinkItems.length > 0 ? (
              <div className="flex flex-wrap gap-[20px]">
                {mainCategoryLinkItems.map((cat) => (
                  <button
                    key={`${cat.name}-${cat.id ?? 'none'}`}
                    type="button"
                    onClick={() => handleMainCategoryClick(cat)}
                    className="inline-flex items-center gap-1 text-[14px] text-[#030712]
          px-3 py-2 hover:bg-gray-100 transition cursor-pointer"
                    aria-label={`메인 카테고리 ${cat.name}로 이동`}>
                    {cat.name}
                    <img src={arrowRightBlack} alt="" className="w-[16px] h-[16px]" />
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-[14px] text-[#030712]">—</span>
            )}
            <button
              type="button"
              className="text-[14px] text-gray-400 underline flex items-center gap-1"
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
              <div className="flex items-center justify-between flex-wrap gap-y-1">
                <div className="flex flex-wrap gap-2 font-medium text-[14px]">
                  {safeModels.map((m, i) => (
                    <ModelButton key={`${m}-${i}`} text={m} />
                  ))}
                </div>
                <div className="hidden md:inline-flex items-center gap-2 text-[12px] whitespace-nowrap bg-gray-50 rounded-[8px] px-3 py-2">
                  <span className="text-[#374151] font-light">AI 모델의 버전은?</span>
                  <span className={`font-medium ${hasModelVersion ? 'text-[#030712]' : 'text-on-white'}`}>
                    {modelVersionDisplay}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center">
                <h1 className="font-medium text-[32px] text-[#030712] leading-tight break-words whitespace-normal">
                  {title}
                </h1>
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
                <div className="flex flex-wrap items-center gap-6">
                  <span className="text-[14px] text-[#6B7280]">업로드&nbsp;&nbsp;&nbsp;{uploadedAt}</span>
                  <Count imgType="eye" count={views} />
                  <Count imgType="download" count={downloads} />
                </div>

                {/* 오른쪽 공유 */}
                <div className="flex items-center gap-3">
                  <span className="text-[14px] text-[#6B7280]">공유</span>
                  <button onClick={handleFacebookShare}>
                    <img src={FacebookIcon} alt="Facebook 공유" className="w-[18px] h-[18px] cursor-pointer" />
                  </button>
                  <button onClick={handleKakaoShare}>
                    <img src={KakaoIcon} alt="Kakao 공유" className="w-[18px] h-[18px] cursor-pointer" />
                  </button>
                  <button onClick={handleXShare}>
                    <img src={XIcon} alt="X 공유" className="w-[18px] h-[18px] cursor-pointer" />
                  </button>
                  <button onClick={handleCopyLink}>
                    <img src={LinkIcon} alt="링크 복사" className="w-[18px] h-[18px] cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="flex gap-2 shrink-0">
                <button className="w-[32px] h-[32px]" aria-label="수정" onClick={() => alert('수정 클릭')}>
                  <img src={updateIcon} alt="수정" />
                </button>
                <button className="w-[32px] h-[32px]" aria-label="삭제" onClick={() => alert('삭제 클릭')}>
                  <img src={deleteIcon} alt="삭제" />
                </button>
              </div>
            )}
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
                <div className="mt-[28px] w-full max-w-[485px] rounded-[12px] rounded-tl-none bg-[#F0F7FF] p-4">
                  <p className="text-[14px] font-light leading-[22px] whitespace-pre-line">
                    {isLoading ? '불러오는 중…' : promptResult || ''}
                  </p>
                </div>
              )}
              {hasImages && (
                <div className="mt-4 text-[15px] leading-[22px] whitespace-pre-line">
                  {isLoading ? '불러오는 중…' : promptResult || ''}
                </div>
              )}
            </section>

            <aside className="md:col-span-6 w-full max-w-full">
              <p className="text-[14px] font-light text-[#6b7280] mb-[8px]">이 프롬프트의 활용법이 궁금하다면</p>
              <h3 className="mb-[28px] font-medium text-[18px] md:text-[20px]">이렇게 쓰는 프롬프트예요</h3>

              <div className="text-[16px] font-light leading-[22px] whitespace-pre-line">
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
            {/* 가격 + 버튼 */}
            <div className="flex flex-col items-end text-right w-full lg:w-auto">
              <p className="font-medium text-[24px]">{isFree ? '무료' : `${price.toLocaleString()}원`}</p>
              {isPaid && !isFree && <span className="text-sm text-green-600">구매 완료</span>}
              <span className="text-[12px] font-light text-[#374151] mb-[8px]">
                ※ 다운로드를 하고 프롬프트를 사용해보세요!
              </span>

              <div className="flex items-center gap-5 mt-2 lg:mt-0">
                <IconButton
                  buttonType="squareBig"
                  style="fill"
                  imgType="download"
                  text="프롬프트 다운로드"
                  onClick={onDownload}
                />
                <button
                  className="w-[49px] h-[49px] rounded-[12px] bg-[#FFFEFB] border-[1px] border-[#D1D5DB] flex items-center justify-center"
                  onClick={handleToggleLike}
                  aria-label="좋아요">
                  <img src={liked ? heartOnClick : heartNone} alt="like" className="w-[28px] h-[28px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptDetailCard;
