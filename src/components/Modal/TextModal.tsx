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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-overlay"></div>

      <div
        className={clsx(
          'relative w-full py-[51.5px] bg-white rounded-[16px] shadow-gradient z-10  flex items-center justify-center',
          `${size === 'lg' && 'max-w-[940px]'}`,
          `${size === 'sm' && 'max-w-[830px]'}`,
        )}>
        <p className="text-[32px] font-bold leading-[40px] text-text-on-white">{text}</p>
        <div onClick={onClick} className="absolute top-[20px] right-[20px] cursor-pointer">
          <img src={CloseIcon} alt="닫기" />
        </div>
      </div>
    </div>
  );
};

export default TextModal;
