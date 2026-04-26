import ArrowIcon from '../ArrowIcon';
import type { MonthlySettlement, TotalSettlementAmountSectionProps } from '@/types/MyPage/settlement';
import { formatPrice } from '@/pages/MyPage/utils/format';

const TOTAL_SETTLEMENT_SECTION_TITLE = '총 누적 정산 금액';
const TOTAL_SETTLEMENT_NOTICE_TEXT =
  '조회 기간 내 정산 완료된 금액의 합계예요. 기간을 선택해 누적 금액을 확인할 수 있습니다.';
const TOTAL_SETTLEMENT_LABEL = '총 누적 정산액';

// 총 누적 정산 금액 섹션에서 연도별 월별 정산 금액을 표시하는 열 컴포넌트
const TotalColumn = ({ items, year }: { items: MonthlySettlement[]; year: number }) => {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[12px] rounded-[8px] bg-gray-50 px-[16px] py-[12px] min-h-[240px]">
      {items.map((item) => (
        <div key={item.month} className="flex items-center justify-between">
          <span className="custom-body1 text-text-on-white max-phone:!text-[14px]">{`${year}년 ${item.month}월`}</span>
          <span className="custom-h4 text-gray-700 max-phone:!text-[16px]">{formatPrice(item.amount)}</span>
        </div>
      ))}
    </div>
  );
};

const TotalSettlementAmountSection = ({
  data,
  onClickYearSelect,
  onClickYearOption,
}: TotalSettlementAmountSectionProps) => {
  const hasNoSettlements = data.isEmpty || data.monthlySettlements.length === 0;

  if (hasNoSettlements) {
    return (
      <section className="flex flex-col gap-[20px]">
        <h2 className="custom-h2 text-text-on-white max-phone:!text-[20px]">{TOTAL_SETTLEMENT_SECTION_TITLE}</h2>

        <div className="flex flex-col gap-[20px] rounded-[12px] bg-white p-[24px]">
          <p className="custom-button1 text-gray-700 max-phone:!text-[12px]">{TOTAL_SETTLEMENT_NOTICE_TEXT}</p>

          <div className="flex flex-col gap-[20px] lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-[223px]">
              <button
                type="button"
                onClick={onClickYearSelect}
                className="flex h-[48px] w-full items-center justify-between rounded-[8px] bg-gray-50 px-[16px] py-[12px]">
                <span className="custom-button1 text-text-on-white">{data.selectedYearLabel}</span>
                <ArrowIcon fillColor="#9CA3AF" />
              </button>

              {data.isYearDropdownOpen && data.yearOptions && data.yearOptions.length > 0 && (
                <div className="absolute left-0 top-[56px] z-10 w-full overflow-hidden rounded-[8px] border border-gray-200 bg-white py-[8px]">
                  {data.yearOptions.map((option) => {
                    const isSelected = option === data.selectedYearLabel;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => onClickYearOption?.(option)}
                        className={`w-full px-[16px] py-[8px] text-left custom-body1 max-phone:!text-[14px] ${isSelected ? 'bg-background text-text-on-white' : 'bg-white text-text-on-white hover:bg-gray-50'}`}>
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-[12px] py-[40px]">
            <p className="custom-h5 text-gray-600 max-phone:!text-[14px]">해당 연도에 정산된 금액이 없어요.</p>
            <p className="custom-body2 text-gray-500 max-phone:!text-[12px]">
              프롬프트가 판매되면 수익이 이곳에 표시돼요.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const leftItems = data.monthlySettlements.slice(0, 6);
  const rightItems = data.monthlySettlements.slice(6, 12);

  return (
    <section className="flex flex-col gap-[20px]">
      <h2 className="custom-h2 text-text-on-white max-phone:!text-[20px]">{TOTAL_SETTLEMENT_SECTION_TITLE}</h2>

      <div className="flex flex-col gap-[20px] rounded-[12px] bg-white p-[24px]">
        <p className="custom-button1 text-gray-700 max-phone:!text-[12px]">{TOTAL_SETTLEMENT_NOTICE_TEXT}</p>

        <div className="flex flex-col gap-[20px] lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="custom-h4 text-text-on-white max-phone:!text-[16px]">{TOTAL_SETTLEMENT_LABEL}</h3>
            <p className="custom-h1 text-primary max-phone:!text-[24px]">{formatPrice(data.totalAccumulatedAmount)}</p>
          </div>

          <div className="relative w-[223px]">
            <button
              type="button"
              onClick={onClickYearSelect}
              className="flex h-[48px] w-full items-center justify-between rounded-[8px] bg-gray-50 px-[16px] py-[12px]">
              <span className="custom-button1 text-text-on-white">{data.selectedYearLabel}</span>
              <ArrowIcon fillColor="#9CA3AF" />
            </button>

            {data.isYearDropdownOpen && data.yearOptions && data.yearOptions.length > 0 && (
              <div className="absolute left-0 top-[56px] z-10 w-full overflow-hidden rounded-[8px] border border-gray-200 bg-white py-[8px]">
                {data.yearOptions.map((option) => {
                  const isSelected = option === data.selectedYearLabel;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onClickYearOption?.(option)}
                      className={`w-full px-[16px] py-[8px] text-left custom-body1 max-phone:!text-[14px] ${isSelected ? 'bg-background text-text-on-white' : 'bg-white text-text-on-white hover:bg-gray-50'}`}>
                      {option}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
          <TotalColumn items={leftItems} year={data.year} />
          {rightItems.length > 0 ? (
            <TotalColumn items={rightItems} year={data.year} />
          ) : (
            <div className="min-w-0 flex-1 rounded-[8px] bg-gray-50 min-h-[240px]" />
          )}
        </div>
      </div>
    </section>
  );
};

export default TotalSettlementAmountSection;
