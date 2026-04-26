import { getBankInfoByPortOneCode } from '../../utils/banks';
import type { SettlementAccountInfoSectionProps } from '@/types/MyPage/settlement';

const SETTLEMENT_ACCOUNT_SECTION_TITLE = '정산 계좌 정보';
const SETTLEMENT_ACCOUNT_NOTICE_TEXT =
  '해당 계좌로 정산액이 매월 15일 자동 지급됩니다. 계좌 변경 시 다음 정산일부터 적용됩니다.';
const EDIT_BUTTON_LABEL = '정보 수정하기';

const SettlementAccountInfoSection = ({ data, onClickEdit }: SettlementAccountInfoSectionProps) => {
  const bankInfo = getBankInfoByPortOneCode(data.bank);
  const bankName = bankInfo?.name ?? data.bank;

  return (
    <section className="flex flex-col gap-[20px]">
      <h2 className="custom-h2 text-text-on-white max-phone:!text-[20px]">{SETTLEMENT_ACCOUNT_SECTION_TITLE}</h2>

      <div className="flex flex-col gap-[16px] rounded-[12px] bg-white p-[24px]">
        <p className="max-w-[559px] custom-button1 text-gray-700 max-phone:!text-[12px]">{SETTLEMENT_ACCOUNT_NOTICE_TEXT}</p>

        <div className="flex flex-col justify-between gap-[20px] lg:flex-row lg:items-center">
          <div className="flex items-center gap-[20px]">
            {bankInfo?.logoUrl && <img src={bankInfo.logoUrl} alt={bankName} className="size-[48px]" />}

            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-wrap items-center gap-[12px]">
                <p className="custom-h2 text-text-on-white max-phone:!text-[16px]">{bankName}</p>
                <p className="custom-body1 text-text-on-white max-phone:!text-[14px]">{data.accountNumber}</p>
              </div>

              <p className="custom-body1 text-text-on-white max-phone:!text-[14px]">
                예금주: <span className="custom-h5 max-phone:!text-[14px]">{data.holderName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClickEdit}
            className="inline-flex h-[48px] items-center justify-center rounded-[12px] border-[0.8px] border-primary px-[20px] py-[12px] custom-button1 text-primary">
            {EDIT_BUTTON_LABEL}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SettlementAccountInfoSection;
