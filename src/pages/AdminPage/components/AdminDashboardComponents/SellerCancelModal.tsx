import React from 'react';

const SellerCancelModal = () => {
  return (
    <div className="px-8 py-10 w-[940px] h-[213px] bg-white">
      <div className="flex text-center justify-center text-2xl">000님의 판매자 등록을 취소하겠습니까?</div>
      <div className="flex mt-3 font-light tracking-tight items-center justify-center">
        판매자 등록 취소 시, 해당 사용자의 폼은 삭제됩니다.
      </div>
      <div className="mt-5 gap-3 flex">
        <div className="flex w-[432px] h-[57px] px-5 py-4 text-lg text-primary rounded-xl outline outline-primary items-center justify-center">
          뒤로 가기
        </div>
        <div className="w-[432px] h-[57px] bg-primary text-white items-center justify-center rounded-xl flex">
          등록 취소
        </div>
      </div>
    </div>
  );
};

export default SellerCancelModal;
