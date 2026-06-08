const Bone = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);
const Circle = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-full ${className}`} />
);

/* ── 상단 카드 ── */
const PromptDetailCardSkeleton = () => (
  <div className="w-full max-w-[1236px] mx-auto flex flex-col gap-6">
    {/* 브레드크럼 + 신고 */}
    <div className="flex items-center justify-between">
      <Bone className="h-[14px] w-[120px]" />
      <Bone className="h-[14px] w-[120px]" />
    </div>

    <div className="w-full bg-[#FFFEFB] rounded-[16px] p-6 flex flex-col gap-6">
      {/* 모델칩 + 모델버전 */}
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <Bone className="h-[28px] w-[72px] rounded-full" />
          <Bone className="h-[28px] w-[60px] rounded-full" />
          <Bone className="h-[28px] w-[88px] rounded-full" />
          <Bone className="h-[28px] w-[80px] rounded-full" />
        </div>
        <Bone className="h-[32px] w-[160px] rounded-[8px]" />
      </div>

      {/* 제목 */}
      <Bone className="h-[36px] w-[70%]" />

      {/* 설명 한줄 */}
      <Bone className="h-[16px] w-[50%]" />

      {/* 업로드일 + 조회/다운로드 */}
      <div className="flex items-center gap-6">
        <Bone className="h-[14px] w-[100px]" />
        <Bone className="h-[14px] w-[60px]" />
        <Bone className="h-[14px] w-[60px]" />
      </div>

      {/* 다운로드 버튼 */}
      <Bone className="h-[49px] w-[141px] rounded-[10px]" />

      {/* 본문 2컬럼 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 왼쪽: 이미지 영역 */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-start gap-3 mb-1">
            <Bone className="w-[36px] h-[35px] rounded-md shrink-0" />
            <div className="flex flex-col gap-2">
              <Bone className="h-[13px] w-[140px]" />
              <Bone className="h-[20px] w-[180px]" />
            </div>
          </div>
          {/* 메인 이미지 */}
          <Bone className="w-full rounded-[12px]" style={{ aspectRatio: '4/3' } as React.CSSProperties} />
          {/* 썸네일 */}
          <div className="flex justify-center gap-5 mt-2">
            <Bone className="w-[56px] h-[56px] rounded-[10px]" />
            <Bone className="w-[56px] h-[56px] rounded-[10px]" />
          </div>
        </div>

        {/* 오른쪽: 활용법 */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <Bone className="h-[13px] w-[160px]" />
          <Bone className="h-[20px] w-[200px]" />
          <div className="flex flex-col gap-2 mt-2">
            <Bone className="h-[14px] w-full" />
            <Bone className="h-[14px] w-[92%]" />
            <Bone className="h-[14px] w-[85%]" />
            <Bone className="h-[14px] w-full" />
            <Bone className="h-[14px] w-[78%]" />
          </div>
        </div>
      </div>

      {/* 하단: 태그 + 찜/공유 버튼 */}
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-end gap-4 mt-2">
        <div className="flex gap-4">
          <Bone className="h-[28px] w-[72px] rounded-full" />
          <Bone className="h-[28px] w-[60px] rounded-full" />
          <Bone className="h-[28px] w-[80px] rounded-full" />
          <Bone className="h-[28px] w-[56px] rounded-full" />
        </div>
        <div className="flex gap-3">
          <Bone className="w-[49px] h-[49px] rounded-[12px]" />
          <Bone className="w-[49px] h-[49px] rounded-[12px]" />
        </div>
      </div>
    </div>
  </div>
);

/* ── 하단: 제작자 + 리뷰 ── */
const ReviewItemSkeleton = () => (
  <div className="flex gap-3 py-4 border-b border-gray-100">
    <Circle className="w-[40px] h-[40px] shrink-0" />
    <div className="flex flex-col gap-2 flex-1">
      <div className="flex gap-2 items-center">
        <Bone className="h-[13px] w-[72px]" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Bone key={i} className="w-[16px] h-[16px] rounded-sm" />
          ))}
        </div>
      </div>
      <Bone className="h-[13px] w-full" />
      <Bone className="h-[13px] w-[65%]" />
    </div>
  </div>
);

const PromptAuthorAndReviewSkeleton = () => (
  <div className="w-full max-w-[1236px] mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
    {/* 제작자 프로필 */}
    <div className="bg-[#FFFEFB] rounded-[16px] p-6 flex flex-col gap-4">
      <Bone className="h-[16px] w-[80px]" />
      <div className="flex gap-3 items-center">
        <Circle className="w-[52px] h-[52px] shrink-0" />
        <div className="flex flex-col gap-2">
          <Bone className="h-[14px] w-[80px]" />
          <div className="flex gap-2">
            <Bone className="h-[28px] w-[60px] rounded-full" />
          </div>
        </div>
      </div>
      <Bone className="h-[13px] w-full" />
      <Bone className="h-[13px] w-[80%]" />
      <div className="flex gap-3 mt-2">
        <Bone className="h-[40px] flex-1 rounded-[8px]" />
        <Bone className="h-[40px] flex-1 rounded-[8px]" />
      </div>
    </div>

    {/* 리뷰 섹션 */}
    <div className="bg-[#FFFEFB] rounded-[16px] p-6 flex flex-col gap-4">
      {/* 리뷰 작성 */}
      <div className="flex items-center gap-3 mb-2">
        <Bone className="w-[36px] h-[36px] rounded-md shrink-0" />
        <Bone className="h-[22px] w-[160px]" />
      </div>
      <Bone className="h-[13px] w-[240px]" />
      <Bone className="h-[13px] w-[180px]" />
      {/* 별점 */}
      <div className="flex gap-2 justify-center my-2">
        {[...Array(5)].map((_, i) => (
          <Bone key={i} className="w-[36px] h-[36px] rounded-sm" />
        ))}
      </div>
      {/* 텍스트영역 */}
      <Bone className="h-[80px] w-full rounded-[8px]" />
      <Bone className="h-[44px] w-full rounded-[8px]" />

      {/* 리뷰 전체보기 */}
      <div className="flex items-center gap-2 mt-4">
        <Bone className="h-[18px] w-[90px]" />
        <Bone className="h-[22px] w-[28px] rounded-full" />
      </div>
      {/* 별점 평균 */}
      <div className="flex gap-1 items-center">
        {[...Array(5)].map((_, i) => (
          <Bone key={i} className="w-[24px] h-[24px] rounded-sm" />
        ))}
        <Bone className="h-[14px] w-[36px] ml-2" />
      </div>
      {/* 리뷰 목록 */}
      {[...Array(3)].map((_, i) => (
        <ReviewItemSkeleton key={i} />
      ))}
    </div>
  </div>
);

/* ── 최종 export ── */
const PromptDetailPageSkeleton = () => (
  <div className="bg-[#F5F5F5] min-h-screen py-8 pt-[64px] px-5 md:px-8 min-[1025px]:px-[102px]">
    <div className="flex flex-col gap-6">
      <PromptDetailCardSkeleton />
      <PromptAuthorAndReviewSkeleton />
    </div>
  </div>
);

export default PromptDetailPageSkeleton;
