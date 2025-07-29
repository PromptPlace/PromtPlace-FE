interface accountInfo {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

interface AccountDisplayProps{
  accountInfo?:accountInfo
  onEditClick:()=>void
}

const AccountDisplay = ({ accountInfo, onEditClick }:AccountDisplayProps) => (
  <div className="flex flex-col flex-1">
    <div className="text-lg font-bold text-gray-700 mb-3 max-lg:text-base max-lg:mb-2">등록된 계좌</div>
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-lg:p-4">
      <p className="text-gray-800 font-medium max-lg:text-sm">
        {accountInfo?.bank} {accountInfo?.accountNumber}
      </p>
      <p className="text-gray-500 mt-2 max-lg:text-sm">예금주명: {accountInfo?.accountHolder}</p>
    </div>
    <div className="self-end mt-[364px]">
      <button
        onClick={onEditClick}
        className="py-[15px] px-[29px] bg-primary text-white text-[24px] font-bold rounded-[10px]">
        변경하기
      </button>
    </div>
  </div>
);

export default AccountDisplay;
