import IconButton from '@components/Button/IconButton';
import type { ReactNode } from 'react';

/**
 * 예 아니오 버튼을 통해 열고 닫을 수 있는 모달 컴포넌트입니다.
 *
 * @param {string|ReactNode} text -- 모달에 들어갈 내용
 * @param {function} onClickYes -- 예 버튼 클릭 시 실행될 함수
 * @param {function} onClickNo -- 아니오 버튼 클릭 시 실행될 함수
 * @param {string} colorYesText -- 예 버튼 버튼 색. 값 넘기지 않을 경우 기본은 예 버튼이 blue 버튼
 * @param {string} colorNoText -- 아니오 버튼 버튼 색. 값 넘기지 않을 경우 기본은 아니오 버튼이 white 버튼
 *
 * @example
 * <DualModal text="업로드 하시겠습니까?" onClickYes={() => alert('예')} onClickNo={() => setShowModal3(false)} />
 *
 * @author 김진효
 * **/

interface DualModalProps {
  text: string | ReactNode;
  onClickYes: () => void;
  onClickNo: () => void;
  colorYesText?: 'blue' | 'white';
  colorNoText?: 'blue' | 'white';
}

const DualModal = ({ text, onClickYes, onClickNo, colorYesText = 'blue', colorNoText = 'white' }: DualModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-overlay"></div>

      <div className="relative px-[150px] pt-[86.5px] pb-[41.5px] bg-white rounded-[16px] shadow-gradient z-10 flex flex-col items-center justify-center gap-[40px] text-center">
        <p className="text-[32px] font-bold leading-[40px] text-text-on-white">{text}</p>
        <div className="flex gap-[41px]">
          <IconButton
            buttonType="round"
            style={colorYesText === 'blue' ? 'fill' : 'outline'}
            imgType="none"
            textButton={colorYesText}
            text="예"
            onClick={onClickYes}
          />
          <IconButton
            buttonType="round"
            style={colorNoText === 'white' ? 'outline' : 'fill'}
            imgType="none"
            textButton={colorNoText}
            text="아니오"
            onClick={onClickNo}
          />
        </div>
      </div>
    </div>
  );
};

export default DualModal;
