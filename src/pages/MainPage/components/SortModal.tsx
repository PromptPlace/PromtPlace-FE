import React from 'react';

const SortModal = () => {
  return (
    <div className="w-36 p-2.5 bg-white rounded-lg shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)] outline-1 outline-offset-[-1px] outline-white-stroke inline-flex flex-col justify-center items-center">
      <div className="w-28 p-2.5 bg-white rounded-tl rounded-tr inline-flex justify-center items-center gap-2.5">
        <div className="justify-start text-text-on-background text-xs font-light leading-4">조회순</div>
      </div>
      <div className="w-28 p-2.5 bg-white inline-flex justify-center items-center gap-2.5">
        <div className="justify-start text-text-on-background text-xs font-light leading-4">별점순</div>
      </div>
      <div className="w-28 p-2.5 bg-white rounded-bl rounded-br inline-flex justify-center items-center gap-2.5">
        <div className="justify-start text-text-on-background text-xs font-light leading-4">다운로드순</div>
      </div>
    </div>
  );
};

export default SortModal;
