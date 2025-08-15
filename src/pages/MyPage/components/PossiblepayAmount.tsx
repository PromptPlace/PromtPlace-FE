import GradientButton from '@/components/Button/GradientButton';

interface PossiblepayAmountProps {
  nickname?: string;
  balance?: number;
  onWithdraw: () => void;
}

const PossiblepayAmount: React.FC<PossiblepayAmountProps> = ({ nickname, balance, onWithdraw }) => {
  return (
    <div className="flex items-center justify-between  h-[126px] rounded-[20px] bg-white border-[1px] border-primary-hover mb-[27px] max-lg:h-[58px] max-lg:rounded-[8px] max-lg:border-[0.5px] max-lg:mb-[12px]">
      <div className="flex items-center">
        <p className="text-[32px] font-bold text-primary-hover border-r-[3px] border-primary-hover pr-[40px] py-[10px] ml-[50px] max-lg:hidden">
          {nickname}님의 출금 가능 금액
        </p>

        <p className="text-[32px] font-bold text-primary-hover pl-[40px]  max-lg:text-[14px] max-lg:pl-[20px] ">
          {balance?.toLocaleString()}원
        </p>
      </div>
      <div className="pr-[93px] max-lg:pr-[20px]">
        <GradientButton buttonType="textButton" text="출금하기" onClick={onWithdraw} />
      </div>
    </div>
  );
};

export default PossiblepayAmount;
