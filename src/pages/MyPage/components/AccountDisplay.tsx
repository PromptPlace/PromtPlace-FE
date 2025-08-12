interface accountInfo {
  account_id?: number;
  bank_name: string;
  bank_code?: string;
  account_number: string;
  account_holder: string;
}

interface AccountDisplayProps {
  accountInfo?: accountInfo;
  onEditClick: () => void;
}

const AccountDisplay = ({ accountInfo, onEditClick }: AccountDisplayProps) => (
  <div className="flex flex-col flex-1 mt-[40px] max-lg:mt-[20px]">
    <div className="text-[22px] max-lg:text-[14px] font-bold max-lg:font-medium text-[#2A2A2A]  ">등록된 계좌</div>
    <div className="flex flex-col bg-white mt-[24px] max-lg:mt-[12px] border-[1px] max-lg:border-[0.5px] border-white-stroke rounded-[8px] gap-[20px] max-lg:gap-[10px] py-[24px] max-lg:py-[16px] px-[48px] max-lg:px-[14px] text-[20px] max-lg:text-[12px] text-text-on-white font-medium">
      <p className="max-lg:text-[14px]">
        {accountInfo?.bank_name} {accountInfo?.account_number}
      </p>
      <span className="flex">
        <p className="font-normal">예금주명 : </p>
        <p>{accountInfo?.account_holder}</p>
      </span>
    </div>
    <div className="lg:self-end mt-[364px] max-lg:mt-[196px]">
      <button
        onClick={onEditClick}
        className="py-[15px] max-lg:py-[10px] px-[29px] max-lg:px-[40px] bg-primary text-white text-[24px] max-lg:text-[16px] font-bold max-lg:font-medium rounded-[10px] max-lg:rounded-[4px] max-lg:w-full">
        변경하기
      </button>
    </div>
  </div>
);

export default AccountDisplay;
