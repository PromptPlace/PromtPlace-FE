import CloseIcon from '@assets/icon-close.svg';

/**
 * 엑스 버튼으로 닫을 수 있는 모달 컴포넌트입니다.
 *
 * @param {string} text -- 모달에 들어갈 내용
 * @param {function} onClick -- 엑스 버튼 클릭 시 실행될 함수
 *
 * @example
 * <TextModal text="업로드 세부 설정을 완료해 주세요." onClick={() => setShowModal(false)} />
 *
 *
 * @author 김진효
 * **/

interface TextModalProps {
  text: string;
  onClick: () => void;
}

const TextModal = ({ text, onClick }: TextModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-overlay"></div>

      <div className="relative max-w-[940px] w-full h-[143px] bg-white rounded-[16px] shadow-gradient z-10  flex items-center justify-center">
        <p className="text-[32px] font-bold leading-[40px] text-text-on-white">{text}</p>
        <div onClick={onClick} className="absolute top-[20px] right-[20px] cursor-pointer">
          <img src={CloseIcon} alt="닫기" />
        </div>
      </div>
    </div>
  );
};

export default TextModal;
