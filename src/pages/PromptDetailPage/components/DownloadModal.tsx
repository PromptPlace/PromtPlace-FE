import IconButton from '@components/Button/IconButton';
import CloseIcon from '@assets/icon-close.svg';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  downloadUrl: string;
  content: string;
}

const DownloadModal = ({ isOpen, onClose, title, downloadUrl, content }: DownloadModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="bg-overlay fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div
        className="
          relative bg-white rounded-[16px] shadow-lg overflow-y-auto text-[#121212]
          w-[1056px] h-[745px] px-[64px] py-[48px]
          max-lg:w-[280px] max-lg:h-[356px] max-lg:p-5
        ">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-[20px] right-[20px] max-lg:w-[10px] max-lg:h-[10px] hover:opacity-60 max-lg:top-[12px] max-lg:right-[12px]">
          <img src={CloseIcon} alt="삭제" className="w-full h-full object-contain" />
        </button>

        {/* 제목 */}
        <h2 className="text-[32px] font-bold mb-[32px] max-lg:text-[16px] max-lg:mb-[12px]">{title}</h2>

        {/* 구분선 */}
        <div className="h-[1px] bg-[#CCCCCC] w-full mb-[30px] max-lg:mb-[16px]" />

        {/* 복사 버튼 */}
        <div className="flex justify-end ml-[790px] max-lg:ml-0 max-lg:text-[10px]">
          <IconButton
            buttonType="squareMini"
            style="fill"
            imgType="copy"
            text="복사하기"
            onClick={() => {
              navigator.clipboard.writeText(content);
              alert('복사되었습니다!');
              if (window.innerWidth >= 1024) {
                onClose();
              }
            }}
          />
        </div>

        {/* 본문 */}
        <div className="text-[20px] pt-[40px] font-medium whitespace-pre-wrap leading-relaxed max-lg:text-[10px] max-lg:pt-[12px]">
          {content}
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
