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
import useGetSettlementAccount from '@hooks/queries/AdminPage/useGetSettlementAccount.ts';
import { mapToSettlementAccount } from '@/pages/MyPage/utils/settlementsMapper';

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
  const { data: settlementAccountData } = useGetSettlementAccount();

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

      {settlementAccountData && (
        <SettlementAccountInfoSection
          data={mapToSettlementAccount(settlementAccountData.data)}
          onClickEdit={onClickEditAccount}
        />
      )}
    </div>
  );
};

export default SellerSettlementDashboard;
