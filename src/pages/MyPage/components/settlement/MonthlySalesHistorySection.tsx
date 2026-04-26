import RightArrowIcon from '../RightArrowIcon';
import ArrowIcon from '../ArrowIcon';
import { useNavigate } from 'react-router-dom';
import type { MonthlySalesHistorySectionProps } from '@/types/MyPage/settlement';
import { toMonthLabelFromSaleDate } from '@/pages/MyPage/utils/date';
import { formatPrice } from '@/pages/MyPage/utils/format';

const MONTHLY_SALES_SECTION_TITLE = '월별 판매 내역';
const MONTHLY_SALES_NOTICE_TEXT = '선택한 월에 발생한 판매 내역이에요. 환불 건은 정산에서 제외됩니다.';

const STATUS_LABELS = {
  COMPLETED: '판매 완료',
  REFUNDED: '환불 처리',
} as const;

const MonthlySalesHistorySection = ({
  data,
  onClickViewMore,
  onClickMonthSelect,
  onClickMonthOption,
  isDetailView = false,
  onClickUploadPrompt,
}: MonthlySalesHistorySectionProps) => {
  const navigate = useNavigate();

  const displayedItems = data.sales.filter(
    (item) => toMonthLabelFromSaleDate(item.saleDate) === data.selectedMonthLabel,
  );
  const showButton = !isDetailView && data.pagination.hasNextPage;

  return (
    <section className="flex flex-col gap-[20px]">
      <div className="flex items-center justify-between">
        <h2 className="custom-h2 text-text-on-white">{MONTHLY_SALES_SECTION_TITLE}</h2>
        {showButton && (
          <button type="button" className="flex items-center gap-[4px]" onClick={onClickViewMore}>
            <span className="custom-button1 text-gray-500">더 보기</span>
            <RightArrowIcon fillColor="#6B7280" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-[20px] rounded-[12px] bg-white p-[24px]">
        <p className="custom-button1 text-gray-700">{MONTHLY_SALES_NOTICE_TEXT}</p>

        <div className="relative w-[223px]">
          <button
            type="button"
            onClick={onClickMonthSelect}
            className="flex h-[48px] w-full items-end justify-between rounded-[8px] bg-gray-50 px-[16px] py-[12px]">
            <span className="custom-button1 text-text-on-white">{data.selectedMonthLabel}</span>
            <ArrowIcon fillColor="#9CA3AF" />
          </button>

          {data.isMonthDropdownOpen && data.monthOptions && data.monthOptions.length > 0 && (
            <div className="absolute left-0 top-[56px] z-10 w-full overflow-hidden rounded-[8px] border border-gray-200 bg-white py-[8px]">
              {data.monthOptions.map((option) => {
                const isSelected = option === data.selectedMonthLabel;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onClickMonthOption?.(option)}
                    className={`w-full px-[16px] py-[8px] text-left custom-body1 ${isSelected ? 'bg-background text-text-on-white' : 'bg-white text-text-on-white hover:bg-gray-50'}`}>
                    {option}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-[20px]">
          {displayedItems.length > 0 && (
            <div className="flex items-center justify-end gap-[40px] pb-[20px]">
              <span className="w-[88px] custom-h5 text-gray-700">판매가</span>
              <span className="w-[88px] custom-h5 text-gray-700">결제상태</span>
            </div>
          )}

          {/* 판매 내역이 없는 경우*/}
          {displayedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-[40px]">
              <p className="custom-h5 text-gray-600 mb-[8px]">해당 월의 판매내역이 없어요.</p>
              <p className="custom-body2 text-gray-500 mb-[16px]">프롬프트를 등록해보세요!</p>
              <button
                type="button"
                className="rounded-[8px] bg-primary px-[20px] py-[9px] custom-button1 text-white"
                onClick={onClickUploadPrompt}>
                프롬프트 올리기
              </button>
            </div>
          ) : (
            <>
              {/* 판매 내역이 있는 경우 */}
              {displayedItems.map((item, index) => {
                const isRefunded = item.status === 'REFUNDED';
                const textClass = isRefunded ? 'text-gray-400 line-through' : 'text-text-on-white';
                const priceClass = isRefunded ? 'text-gray-400 line-through' : 'text-text-on-white';
                const salePrice = item.price;
                const thumbnailSrc = item.thumbnailUrl;

                return (
                  <div
                    key={item.purchaseId}
                    className={`flex items-center justify-between py-[16px] ${index < displayedItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex min-w-0 flex-1 items-start">
                      <img
                        src={thumbnailSrc}
                        alt="프롬프트 썸네일"
                        className="size-[80px] rounded-[8px] object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-[8px] px-[24px] pb-[16px] pt-[8px]">
                        <button
                          type="button"
                          className={`truncate text-left custom-h5 ${textClass}`}
                          onClick={() => navigate(`/prompt/${item.promptId}`)}>
                          {item.title}
                        </button>
                        <p className={`custom-body2 ${textClass}`}>판매일: {item.saleDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-[40px]">
                      <p className={`w-[88px] custom-h4 ${priceClass}`}>{formatPrice(salePrice)}</p>
                      <div className="w-[88px]">
                        <span
                          className={`inline-flex items-center justify-center rounded-[4px] px-[12px] py-[4px] custom-button1 ${isRefunded ? 'bg-gray-200 text-gray-400' : 'bg-secondary-pressed text-primary-hover'}`}>
                          {STATUS_LABELS[item.status]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MonthlySalesHistorySection;
