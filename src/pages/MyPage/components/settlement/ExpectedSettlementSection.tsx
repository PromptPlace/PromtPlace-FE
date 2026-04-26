import ReportIcon from '@assets/icon-report.svg';
import { formatNextSettlementDate } from '@/pages/MyPage/utils/date';
import type { ExpectedSettlementSectionProps } from '@/types/MyPage/settlement';

const SETTLEMENT_GUIDE_TITLE = '정산 관련 안내 사항';
const SETTLEMENT_GUIDE_ITEMS = [
  '정산 금액은 수수료 및 세금 공제 후 금액입니다.',
  '정산일은 매월 15일이며, 이전 한 달 동안의 수익이 정산됩니다.',
  '최소 정산 금액은 10,000원이며 미달성 시 다음달로 이월됩니다.',
  '부가가치세(VAT)는 수수료의 10%가 공제됩니다.',
];
const SETTLEMENT_GUIDE_LINK_LABEL = '정산 관련 세부 안내사항 확인하기';

// 정산관리 탭 - 정산 예정 금액 섹션 컴포넌트

const toWon = (amount: number) => `${amount.toLocaleString('ko-KR')}원`;

const toDeductionWon = (amount: number) => {
  if (amount <= 0) {
    return '0원';
  }
  return `- ${toWon(amount)}`;
};

const ExpectedSettlementSection = ({ data, onClickGuideLink }: ExpectedSettlementSectionProps) => {
  const periodLabel = `${data.targetMonth} 정산 예정 금액`;
  const formattedExpectedAmount = toWon(data.expectedAmount);
  const formattedNextSettlementDate = formatNextSettlementDate(data.nextSettlementDate);

  return (
    <section className="flex flex-col gap-[20px]">
      <h2 className="custom-h2 text-text-on-white max-phone:!text-[20px]">정산 예정 금액</h2>

      <div className="flex flex-col gap-[20px] rounded-[12px] border-[0.8px] border-primary bg-white p-[24px]">
        <div className="flex flex-col gap-[20px] lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-1 flex-col gap-[20px]">
            <h3 className="custom-h4 text-text-on-white max-phone:!text-[16px]">{periodLabel}</h3>

            <div className="flex flex-col gap-[8px]">
              <p
                className={`custom-h1 max-phone:!text-[24px] ${data.expectedAmount === 0 ? 'text-gray-400' : 'text-primary'}`}>
                {formattedExpectedAmount}
              </p>
              <p className="custom-body1 text-gray-700 max-phone:!text-[14px]">{formattedNextSettlementDate}</p>
            </div>

            <div className="flex flex-col gap-[12px] rounded-[8px] bg-gray-50 px-[16px] py-[12px]">
              <div className="flex items-center justify-between">
                <span className="custom-body1 text-text-on-white max-phone:!text-[14px]">총 판매 금액</span>
                <span className="custom-h5 text-gray-700 max-phone:!text-[14px]">{toWon(data.totalSalesAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="custom-body1 text-text-on-white max-phone:!text-[14px]">서비스 수수료</span>
                <span className="custom-h5 text-alert max-phone:!text-[14px]">{toDeductionWon(data.serviceFee)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="custom-body1 text-text-on-white max-phone:!text-[14px]">부가가치세(VAT)</span>
                <span className="custom-h5 text-alert max-phone:!text-[14px]">{toDeductionWon(data.vatAmount)}</span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-[20px] lg:w-[480px]">
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[8px]">
                <img src={ReportIcon} alt="안내" className="size-[24px]" />
                <h3 className="custom-h5 text-text-on-white max-phone:!text-[14px]">{SETTLEMENT_GUIDE_TITLE}</h3>
              </div>

              <ul className="list-disc ps-[24px] custom-body1 text-text-on-white max-phone:!text-[14px]">
                {SETTLEMENT_GUIDE_ITEMS.map((guide) => (
                  <li key={guide}>{guide}</li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="w-fit custom-button1 text-primary underline max-phone:!text-[12px]"
              onClick={onClickGuideLink}>
              {SETTLEMENT_GUIDE_LINK_LABEL}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpectedSettlementSection;
