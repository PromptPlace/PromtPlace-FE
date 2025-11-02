import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetPromptDetail from '@/hooks/queries/PromptDetailPage/useGetPromptDetail';
import Count from '@components/Count';
import ModelButton from '@components/Button/ModelButton';
import TagButton from '@components/Button/TagButton';
import IconButton from '@components/Button/IconButton';

import updateIcon from '../assets/updatebutton.png';
import deleteIcon from '../assets/deletebutton.png';
import heartNone from '../../../assets/promptDetail/icon-heart-none_gray-300_28px.svg';
import heartOnClick from '../../../assets/promptDetail/icon-heart-fill_gradient_28px.svg';
import reportIcon from '../assets/report.svg';
import star from '../assets/star.png';

interface Props {
  title: string;
  views: number;
  downloads: number;
  onClose: () => void;
  onClickReview: () => void;
  models?: string[] | null; // 부모에서 정규화된 문자열 배열 전달
  rating?: number;
  tags?: string[] | null; // 부모에서 정규화된 문자열 배열 전달
  description?: string | null;
  usageGuide?: string | null;
  isPaid?: boolean;
  price: number;
  isFree: boolean;
  onDownload: () => void;
}

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

  // 모델: 부모가 준 models 우선, 없으면 서버 응답으로 보강
  const safeModels = useMemo<string[]>(() => {
    if (Array.isArray(models) && models.length > 0) return models;
    const fromServer = Array.isArray(data?.models) ? data!.models.map((m: any) => m?.model?.name).filter(Boolean) : [];
    return fromServer;
  }, [models, data?.models]);

  // 날짜 포맷
  const formatDateToDot = (dateStr: string): string => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };

  const modelVersion = data?.model_version ?? '-';
  const uploadedAt = data?.created_at ? formatDateToDot(data.created_at) : '-';

  // 한 줄 소개: description 첫 줄
  const rawDescription = descProp ?? data?.description ?? '';
  const oneLiner =
    (typeof rawDescription === 'string'
      ? rawDescription
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)[0]
      : undefined) ?? '';

  // 활용법 / 결과
  const usageGuide = usageProp ?? data?.usage_guide ?? '';
  const promptResult = data?.prompt_result ?? '';

  // 이미지 정규화 (order_index 기준 정렬, 최대 3장)
  const rawImages: string[] = Array.isArray(data?.images)
    ? data!.images
        .filter((img): img is { order_index: number; image_url: string } => !!img && typeof img.image_url === 'string')
        .sort((a, b) => (Number(a.order_index) || 0) - (Number(b.order_index) || 0))
        .map((i) => i.image_url)
    : [];

  const hasImages = rawImages.length > 0;
  const normalizedImages = hasImages ? rawImages.slice(0, 3) : [];
  while (normalizedImages.length > 0 && normalizedImages.length < 3) {
    normalizedImages.push(normalizedImages[0]);
  }

  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => setActiveIdx(0), [normalizedImages.length]);
  const displayMain = normalizedImages[activeIdx] ?? '';

  const [liked, setLiked] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <>
      {/* 상단 */}
      <div className="flex items-center justify-between mb-1 font-light">
        <span className="text-[14px] text-[#030712]">이미지 생성 &gt;</span>
        <button
          type="button"
          className="text-[14px] text-[#6b7280] underline flex items-center gap-1"
          onClick={() => alert('신고하기')}>
          <img src={reportIcon} alt="신고" className="w-[24px] h-[24px]" />
          해당 프롬프트 신고하기
        </button>
      </div>

      <div className="w-full bg-[#FFFEFB] rounded-[16px] p-6 flex flex-col gap-6">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-1 flex-wrap gap-y-1">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-y-1">
              <div className="flex flex-wrap gap-2 font-medium text-[14px]">
                {safeModels.map((m, i) => (
                  <ModelButton key={`${m}-${i}`} text={m} />
                ))}
              </div>
              <div className="flex items-center gap-3 text-[12px] whitespace-nowrap">
                <span className="text-[#374151] font-light">AI 모델의 버전은?</span>
                <span className="text-[#030712] font-medium">{modelVersion}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center">
              <h1 className="font-medium text-[32px] text-[#030712] leading-tight truncate">{title}</h1>
            </div>

            <p className="mt-2 font-light text-[16px] leading-[22px] text-[#030712]">{oneLiner}</p>

            <div className="mt-3 flex flex-wrap items-center gap-6 font-medium">
              <span className="text-[14px] text-[#6B7280]">업로드&nbsp;&nbsp;&nbsp;{uploadedAt}</span>
              <Count imgType="eye" count={views} />
              <Count imgType="download" count={downloads} />
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
          {/* 좌측 */}
          <section className="md:col-span-5">
            <div className="flex items-center gap-3 mb-1">
              {' '}
              <img src={star} alt="별 아이콘" className="w-[36px] h-[35px]" />{' '}
              <p className="text-[13px] text-[#6b7280]">이 프롬프트로 다운받아 입력하면</p>{' '}
            </div>{' '}
            <h3 className="font-medium text-[18px] ml-12 md:text-[20px]">AI가 이렇게 대답해줘요</h3>
            {hasImages ? (
              <>
                <div className="mt-4 relative w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: '4 / 3' }}>
                  {displayMain && (
                    <img src={displayMain} alt="prompt-main" className="absolute inset-0 h-full w-full object-cover" />
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
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
                          isActive ? 'ring-[#3B82F6]' : 'ring-[#E5E7EB]'
                        }`}>
                        <img src={url} alt="" className="h-full w-full object-cover" />
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="mt-4 max-w-[328px] xl:max-w-[485px] rounded-[12px] rounded-tl-none bg-[#F0F7FF] p-4">
                <p className="text-[14px] font-light leading-[22px] whitespace-pre-line">
                  {isLoading ? '불러오는 중…' : usageGuide}
                </p>
              </div>
            )}
            {hasImages && (
              <div className="mt-4 text-[15px] leading-[22px] whitespace-pre-line">
                {isLoading ? '불러오는 중…' : promptResult || ''}
              </div>
            )}
          </section>

          <aside className="md:col-span-6 w-[388px] max-w-[388px] xl:w-[647px] xl:max-w-[647px]">
            <p className="text-[14px] font-light text-[#6b7280] mb-2">이 프롬프트의 활용법이 궁금하다면</p>
            <h3 className="font-medium text-[18px] md:text-[20px]">
              {hasImages ? '이렇게 쓰는 프롬프트예요' : '프롬프트에 대한 설명이에요'}
            </h3>
            <div className="mt-3 text-[16px] font-light leading-[22px] whitespace-pre-line">
              {isLoading ? '불러오는 중…' : hasImages ? usageGuide || '' : promptResult || ''}
            </div>
          </aside>
        </div>

        {/* 하단 액션 전체 영역 */}
        <div className="mt-6 flex justify-between items-end gap-4 max-lg:flex-col max-lg:items-start">
          {/* 왼쪽: 태그 영역 */}
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tags) && tags.length > 0 ? (
              tags.map((tag, idx) => <TagButton key={idx} hasDelete={false} text={`#${tag}`} onClick={() => {}} />)
            ) : (
              <span className="text-[12px] text-[#9aa0a6]">태그가 없습니다.</span>
            )}
          </div>

          {/* 오른쪽: 가격 + 다운로드 버튼 */}
          <div className="flex flex-col items-end gap-2 text-right">
            <p className="font-medium text-[24px]">{isFree ? '무료' : `${price.toLocaleString()}원`}</p>
            {isPaid && !isFree && <span className="text-sm text-green-600">구매 완료</span>}
            <span className="text-[12px] font-light text-[#374151]">* 다운로드를 하고 프롬프트를 사용해보세요!</span>

            <div className="flex items-center gap-5">
              <IconButton
                buttonType="squareBig"
                style="fill"
                imgType="download"
                text="프롬프트 다운로드"
                onClick={onDownload}
              />
              <button
                className="w-[49px] h-[49px] rounded-[12px] bg-[#FFFEFB] border-[1px] border-[#D1D5DB] flex items-center justify-center"
                onClick={() => setLiked((v) => !v)}
                aria-label="좋아요">
                <img src={liked ? heartOnClick : heartNone} alt="like" className="w-[28px] h-[28px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptDetailCard;
