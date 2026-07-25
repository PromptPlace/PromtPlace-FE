import Skeleton from '@/components/Skeleton';

const NoticeDetailSkeleton = () => {
  return (
    <div className="mb-[20px] h-[729px]">
      <div className="flex flex-col rounded-[12px] bg-white pt-[56px] px-[80px] pb-[32px] max-lg:px-[32px] h-full">
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex flex-col gap-[80px]">
            {/* 상단 */}
            <div className="flex flex-col gap-[24px]">
              {/* 제목 */}
              <Skeleton className="max-w-[450px] w-full h-[20px] rounded-full" />

              {/* 작성자 / 등록일 / 공유 */}
              <div className="flex justify-between items-center max-lg:flex-col max-lg:items-start max-lg:gap-[16px]">
                <div className="flex gap-[15px]">
                  <Skeleton className="w-[35px] h-[16px] rounded-full" />
                  <Skeleton className="w-[85px] h-[16px] rounded-full" />
                  <Skeleton className="w-[35px] h-[16px] rounded-full" />
                  <Skeleton className="w-[85px] h-[16px] rounded-full" />
                </div>

                <Skeleton className="w-[166px] h-[16px] rounded-full" />
              </div>
            </div>

            {/* 본문 */}
            <div className="flex flex-col gap-[16px]">
              <Skeleton className="max-w-[435px] w-full h-[16px] rounded-full" />
              <Skeleton className="max-w-[566px] w-full h-[16px] rounded-full" />
              <Skeleton className="max-w-[566px] w-full h-[16px] rounded-full" />
              <Skeleton className="max-w-[689px] w-full h-[16px] rounded-full" />
            </div>
          </div>

          {/* 하단 */}
          <Skeleton className="w-[98px] h-[36px] rounded-[8px]" />
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailSkeleton;
