import IconButton from '@components/Button/IconButton';
import type { ReactNode } from 'react';

/**
 * 예 아니오 버튼을 통해 열고 닫을 수 있는 모달 컴포넌트입니다.
 *
 * @param {string|ReactNode} text -- 모달에 들어갈 내용
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 *
 *
 * @example
 * <DualModal text="업로드 하시겠습니까?" onClickYes={() => alert('예')} onClickNo={() => setShowModal3(false)} />
 *
 * @author 류동현
 * **/

interface SingleModalProps {
  text: string | ReactNode;
  onClick: () => void;
}

export const SingleModal = ({ text, onClick }: SingleModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 max-lg:px-[57px]">
      <div className="absolute inset-0 bg-overlay"></div>

      <div className="relative px-[150px] max-lg:px-[20px] py-[64px] max-lg:py-[20px] bg-white rounded-[16px] max-lg:rounded-[8px] shadow-gradient z-10 flex flex-col items-center justify-center gap-[24px] max-lg:gap-[12px] text-center max-lg:w-full">
        <p className="text-[32px] max-lg:text-[12px] font-bold leading-[40px] max-lg:leading-[15px] text-text-on-white">
          {text}
        </p>

        <IconButton
          buttonType="round"
          style="fill"
          imgType="none"
          textButton="blue"
          text="메인으로"
          onClick={onClick}
        />
      </div>
    </div>
  );
};
