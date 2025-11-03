import CloseIcon from '@assets/icon-close.svg';
import clsx from 'clsx';

/**
 * 엑스 버튼으로 닫을 수 있는 모달 컴포넌트입니다.
 *
 * @param {string} text -- 모달에 들어갈 내용
 * @param {function} onClick -- 엑스 버튼 클릭 시 실행될 함수
 * @param {string} size -- 모달 가로 길이 lg는 940px, sm은 830px
 *
 * @example
 * <TextModal text="업로드 세부 설정을 완료해 주세요." onClick={() => setShowModal(false)} size="lg"/>
 *
 * @author 김진효
 * **/

interface TextModalProps {
  text: string;
  onClick: () => void;
  size: 'lg' | 'sm';
}

const TextModal = ({ text, onClick, size }: TextModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-100 max-lg:px-[40px] max-phone:px-[27px]">
      <div className="absolute inset-0 bg-overlay"></div>

      <div
        className={clsx(
          'relative w-full py-[51.5px] max-lg:py-[54.5px] max-lg:px-[102px] max-phone:px-[78px] max-lg:text-center bg-white rounded-[16px] shadow-gradient z-10 flex items-center justify-center',
          `${size === 'lg' && 'max-w-[940px]'}`,
          `${size === 'sm' && 'max-w-[830px]'}`,
        )}>
        <p className="lg:text-[32px] lg:leading-[40px] lg:font-bold max-lg:text-[24px] max-phone:text-[20px]! max-lg:leading-[33.6px] max-phone:leading-[28px]! max-lg:tracking-[-0.24px] max-phone:tracking-[-0.2px]! max-phone:font-medium text-text-on-white">
          {text}
        </p>
        <div
          onClick={onClick}
          className="absolute top-[20px] right-[20px] cursor-pointer max-phone:w-[16px] max-phone:h-[16px]">
          <img src={CloseIcon} alt="닫기" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default TextModal;
