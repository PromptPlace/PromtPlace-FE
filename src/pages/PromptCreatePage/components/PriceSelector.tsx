import arrowdown from '@assets/promptCreate/icon_arrow.svg';

interface PriceSelectorProps {
  isPaid: boolean;
  setIsPaid: (v: boolean) => void;

  price: number | null;
  setPrice: (v: number | null) => void;
  onOpen: () => void;
}

const PriceSelector = ({ isPaid, price, setPrice, onOpen }: PriceSelectorProps) => {
  return (
    <div className="flex flex-col gap-[12px]">
      <div
        className="max-w-[75px] w-full px-[8px] py-[6px] flex justify-between items-center gap-[16px] cursor-pointer flex-shrink-0 bg-gray50 rounded-[8px]"
        onClick={onOpen}>
        <p className="text-[14px] font-light max-phone:text-[12px]">{isPaid ? '유료' : '무료'}</p>
        <img className="w-[16px] h-[16px] flex-shrink-0" src={arrowdown} alt="down-arrow" />
      </div>

      {/* 유료인 경우 */}
      {isPaid && (
        <div className="w-full py-[8px] px-[16px] bg-gray50 rounded-[8px] items-center">
          <input
            value={price ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              setPrice(value === '' ? null : Number(value));
            }}
            placeholder="예) 1,000원"
            className="w-full h-[46px] bg-gray50 rounded-[8px] outline-none text-sm font-light"
          />
        </div>
      )}
    </div>
  );
};

export default PriceSelector;
