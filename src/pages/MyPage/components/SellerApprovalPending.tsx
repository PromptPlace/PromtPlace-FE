import ClockIcon from '@assets/icon-clock.svg';

const SellerApprovalPending = () => {
  return (
    <section className="flex min-h-[360px] w-full items-center justify-center rounded-[12px] bg-[#F3F4F6] px-[24px] py-[48px]">
      <div className="flex flex-col items-center gap-[24px] text-center">
        <img src={ClockIcon} alt="승인 대기" className="h-[50px] w-[56px]" />
        <div className="flex w-full max-w-[272px] flex-col items-center gap-[8px]">
          <h3 className="text-[18px] font-medium leading-[1.4] tracking-[-0.18px] text-gray-600">
            판매자 등록 승인 대기 중이에요!
          </h3>
          <p className="text-[16px] font-medium leading-[1.4] tracking-[-0.16px] text-gray-500">
            영업일 기준 1~3일 소요됩니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SellerApprovalPending;
