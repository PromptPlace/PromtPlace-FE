import ExpectedSettlementSection from './settlement/ExpectedSettlementSection';
import MonthlySalesHistorySection from './settlement/MonthlySalesHistorySection';
import TotalSettlementAmountSection from './settlement/TotalSettlementAmountSection';
import SettlementAccountInfoSection from './settlement/SettlementAccountInfoSection';
import type {
  ExpectedSettlementSectionData,
  MonthlySalesHistorySectionData,
  SettlementAccountInfoSectionData,
  TotalSettlementAmountSectionData,
} from '@/types/MyPage/settlement';

export interface SellerSettlementDashboardData {
  expectedSettlement: ExpectedSettlementSectionData;
  monthlySalesHistory: MonthlySalesHistorySectionData;
  totalSettlementAmount: TotalSettlementAmountSectionData;
  settlementAccountInfo: SettlementAccountInfoSectionData;
}

interface SellerSettlementDashboardProps {
  data: SellerSettlementDashboardData;
  onClickViewMore?: () => void;
  onClickMonthSelect?: () => void;
  onClickMonthOption?: (option: string) => void;
  onClickYearSelect?: () => void;
  onClickYearOption?: (option: string) => void;
  onClickEditAccount?: () => void;
  onClickUploadPrompt?: () => void;
}

const SellerSettlementDashboard = ({
  data,
  onClickViewMore,
  onClickMonthSelect,
  onClickMonthOption,
  onClickYearSelect,
  onClickYearOption,
  onClickEditAccount,
  onClickUploadPrompt,
}: SellerSettlementDashboardProps) => {
  return (
    <div className="flex flex-col gap-[56px]">
      <ExpectedSettlementSection data={data.expectedSettlement} />
      <MonthlySalesHistorySection
        data={data.monthlySalesHistory}
        onClickViewMore={onClickViewMore}
        onClickMonthSelect={onClickMonthSelect}
        onClickMonthOption={onClickMonthOption}
        onClickUploadPrompt={onClickUploadPrompt}
      />
      <TotalSettlementAmountSection
        data={data.totalSettlementAmount}
        onClickYearSelect={onClickYearSelect}
        onClickYearOption={onClickYearOption}
      />
      <SettlementAccountInfoSection data={data.settlementAccountInfo} onClickEdit={onClickEditAccount} />
    </div>
  );
};

export default SellerSettlementDashboard;
