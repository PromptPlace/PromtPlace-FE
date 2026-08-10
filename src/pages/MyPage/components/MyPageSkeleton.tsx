const Bone = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);
const Circle = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-full ${className}`} />
);

/* ── 공통: 프로필 카드 상단 ── */
export const ProfileCardSkeleton = () => (
  <div className="w-full bg-white rounded-[12px] px-[32px] pt-[40px] pb-[32px] flex items-center gap-[40px] mt-[80px]">
    <Circle className="w-[100px] h-[100px] shrink-0" />
    <div className="flex flex-col gap-[12px] flex-1">
      <div className="flex gap-[16px] items-center">
        <Bone className="h-[20px] w-[100px]" />
        <Bone className="h-[16px] w-[60px]" />
        <Bone className="h-[16px] w-[60px]" />
        <Bone className="h-[16px] w-[80px]" />
      </div>
      <div className="flex gap-[8px]">
        <Bone className="h-[28px] w-[100px] rounded-full" />
        <Bone className="h-[28px] w-[120px] rounded-full" />
        <Bone className="h-[28px] w-[100px] rounded-full" />
      </div>
      <div className="flex flex-col gap-[6px]">
        <Bone className="h-[13px] w-[280px]" />
        <Bone className="h-[13px] w-[380px]" />
        <Bone className="h-[13px] w-[320px]" />
        <Bone className="h-[13px] w-[440px]" />
      </div>
    </div>
  </div>
);

/* ── 1. 프롬프트 탭 스켈레톤 ── */
const PromptItemSkeleton = () => (
  <div className="flex items-center justify-between py-[16px] border-b border-gray-100">
    <div className="flex gap-[12px] items-center flex-1">
      <Bone className="w-[56px] h-[56px] rounded-[8px] shrink-0" />
      <div className="flex flex-col gap-[6px]">
        <Bone className="h-[14px] w-[200px]" />
        <Bone className="h-[12px] w-[140px]" />
      </div>
    </div>
    <div className="flex flex-col gap-[4px] items-end">
      <div className="flex gap-[8px]">
        <Bone className="h-[12px] w-[40px]" />
        <Bone className="h-[12px] w-[50px]" />
      </div>
      <div className="flex gap-[8px]">
        <Bone className="h-[12px] w-[40px]" />
        <Bone className="h-[12px] w-[40px]" />
      </div>
    </div>
  </div>
);

export const PromptTabSkeleton = () => (
  <div className="mt-[64px] w-full">
    <div className="flex items-center justify-between mb-[20px]">
      <Bone className="h-[20px] w-[160px]" />
      <Bone className="h-[14px] w-[50px]" />
    </div>
    <div className="bg-white rounded-[12px] p-[24px]">
      {[...Array(4)].map((_, i) => (
        <PromptItemSkeleton key={i} />
      ))}
    </div>
  </div>
);

/* ── 2. 다운받은 프롬프트 탭 스켈레톤 ── */
const DownloadedItemSkeleton = () => (
  <div className="w-full bg-white rounded-[12px] p-[24px] mb-[12px]">
    <div className="flex items-center gap-[24px] mb-[20px]">
      <Bone className="w-[80px] h-[80px] rounded-[8px] shrink-0" />
      <div className="flex flex-col gap-[8px]">
        <Bone className="h-[16px] w-[220px]" />
        <Bone className="h-[14px] w-[60px]" />
      </div>
    </div>
    <div className="ml-[104px]">
      <div className="flex items-center gap-[8px] mb-[12px]">
        <Bone className="w-[20px] h-[20px] rounded-sm shrink-0" />
        <div className="flex flex-col gap-[4px]">
          <Bone className="h-[14px] w-[100px]" />
          <Bone className="h-[12px] w-[200px]" />
        </div>
      </div>
      <Bone className="h-[44px] w-full rounded-[12px]" />
    </div>
  </div>
);

export const DownloadedPromptTabSkeleton = () => (
  <div className="mt-[64px] w-full">
    <div className="flex items-center gap-[20px] mb-[20px]">
      <Bone className="h-[20px] w-[180px]" />
      <Bone className="h-[28px] w-[36px] rounded-full" />
    </div>
    {[...Array(3)].map((_, i) => (
      <DownloadedItemSkeleton key={i} />
    ))}
  </div>
);

/* ── 3. 정산관리 탭 스켈레톤 ── */
export const DashboardTabSkeleton = () => (
  <div className="mt-[64px] w-full flex flex-col gap-[12px]">
    <Bone className="h-[20px] w-[120px]" />
    <Bone className="h-[16px] w-[200px]" />
    <div className="bg-white rounded-[12px] p-[24px] flex flex-col gap-[12px]">
      <Bone className="h-[14px] w-[180px]" />
      <Bone className="h-[14px] w-[260px]" />
      <Bone className="h-[14px] w-[240px]" />
      <Bone className="h-[14px] w-[200px]" />
    </div>
  </div>
);

/* ── 프로필 설정 탭 스켈레톤 ── */
export const ProfileSettingTabSkeleton = () => (
  <div className="mt-[64px] w-full">
    <div className="bg-white rounded-[12px] p-[32px] flex flex-col gap-[20px]">
      <Bone className="h-[16px] w-[80px]" />
      <Bone className="h-[14px] w-[160px]" />
      <Bone className="h-[14px] w-[80px]" />
      <Circle className="w-[80px] h-[80px]" />
      <Bone className="h-[14px] w-[120px]" />
      <Bone className="h-[14px] w-[140px]" />
      <Bone className="h-[14px] w-[220px]" />
      <Bone className="h-[14px] w-[160px]" />
      <Bone className="h-[14px] w-[220px]" />
    </div>
  </div>
);

/* ── 프롬프트 탭 (메인) 스켈레톤 ── */
const Bone2 = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

const AuthoredItemSkeleton = () => (
  <div className="flex items-center justify-between py-[16px] border-b border-gray-100 last:border-0">
    <div className="flex gap-[12px] items-center flex-1">
      <Bone2 className="w-[56px] h-[56px] rounded-[8px] shrink-0" />
      <div className="flex flex-col gap-[6px]">
        <Bone2 className="h-[14px] w-[180px]" />
        <Bone2 className="h-[12px] w-[120px]" />
      </div>
    </div>
    <div className="flex flex-col gap-[4px] items-end">
      <div className="flex gap-[8px]">
        <Bone2 className="h-[12px] w-[40px]" />
        <Bone2 className="h-[12px] w-[50px]" />
      </div>
      <div className="flex gap-[8px]">
        <Bone2 className="h-[12px] w-[40px]" />
        <Bone2 className="h-[12px] w-[40px]" />
      </div>
    </div>
  </div>
);

const DownloadedItemSmallSkeleton = () => (
  <div className="w-full bg-white rounded-[12px] p-[24px] mb-[12px]">
    <div className="flex items-center gap-[24px] mb-[16px]">
      <Bone2 className="w-[80px] h-[80px] rounded-[8px] shrink-0" />
      <div className="flex flex-col gap-[8px]">
        <Bone2 className="h-[16px] w-[200px]" />
        <Bone2 className="h-[13px] w-[60px]" />
      </div>
    </div>
    <div className="ml-[104px]">
      <Bone2 className="h-[44px] w-full rounded-[12px]" />
    </div>
  </div>
);

export const PromptListSkeleton = () => (
  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[40px] mt-[64px]">
    {/* 작성한 프롬프트 */}
    <section className="flex flex-col">
      <div className="flex gap-[20px] mb-[20px]">
        <Bone2 className="h-[22px] w-[120px]" />
        <Bone2 className="h-[22px] w-[32px] rounded-full" />
      </div>
      <div className="bg-white p-[24px] rounded-[12px]">
        {[...Array(3)].map((_, i) => (
          <AuthoredItemSkeleton key={i} />
        ))}
      </div>
    </section>

    {/* 구매·다운받은 프롬프트 */}
    <section className="flex flex-col">
      <div className="flex gap-[20px] mb-[20px]">
        <Bone2 className="h-[22px] w-[180px]" />
        <Bone2 className="h-[22px] w-[32px] rounded-full" />
      </div>
      {[...Array(2)].map((_, i) => (
        <DownloadedItemSmallSkeleton key={i} />
      ))}
    </section>

    {/* 찜한 프롬프트 */}
    <section className="lg:col-span-2 mt-[56px] flex flex-col">
      <div className="flex gap-[20px] mb-[20px]">
        <Bone2 className="h-[22px] w-[120px]" />
        <Bone2 className="h-[22px] w-[32px] rounded-full" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {[...Array(4)].map((_, i) => (
          <Bone2 key={i} className="h-[200px] rounded-[12px]" />
        ))}
      </div>
    </section>
  </div>
);
