import { Link } from 'react-router-dom';
import CloseIcon from '@assets/icon-close.svg';

interface RefundModalProps {
  onClickRefund: () => void;
  onClose: () => void;
}

const RefundModal = ({ onClickRefund, onClose }: RefundModalProps) => {
  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50 max-lg:px-[40px] max-phone:px-[20px]">
      <div className="max-w-[677px] w-full px-[60px] max-lg:px-[40px] max-phone:px-[20px] py-[48px] relative bg-white rounded-[13px] shadow-gradient z-10 flex flex-col items-center gap-[16px] text-center">
        <div onClick={onClose} className="absolute top-[20px] right-[20px] cursor-pointer">
          <img src={CloseIcon} alt="닫기" className="w-[14px] h-[14px]" />
        </div>

        <p className="custom-h2 max-phone:text-[22px] text-text-on-white">환불하시겠습니까?</p>
        <p className="custom-body1 text-gray-600 max-phone:text-[14px]">
          구매 후 7일 이내면서 열람하지 않은 프롬프트의 경우 환불처리됩니다.
        </p>
        <Link to="/guide/notice/26" className="custom-body2 text-primary underline underline-offset-2">
          환불 정책 확인하기 →
        </Link>

        <div className="flex gap-[16px] w-full mt-[8px]">
          <button
            className="flex-1 py-[14px] bg-white text-gray-600 rounded-[12px] border-[0.8px] border-gray-300 custom-button1 hover:bg-gray-50 transition-colors"
            onClick={onClose}>
            취소
          </button>
          <button
            className="flex-1 py-[14px] bg-primary text-white rounded-[12px] custom-button1 hover:bg-primary-pressed transition-colors"
            onClick={onClickRefund}>
            환불하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;
