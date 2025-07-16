import IconButton from '@components/Button/IconButton';

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
    <div className=" bg-overlay fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="relative w-[1056px] h-[745px] bg-white rounded-[16px] px-[64px] py-[48px] shadow-lg overflow-y-auto text-[#121212]">
        <button className="absolute top-[20px] right-[20px] text-[28px] font-bold hover:opacity-60" onClick={onClose}>
          ×
        </button>

        <h2 className="text-[32px] font-bold mb-[32px]">{title} 이미지 생성</h2>
        <div className="h-[1px] bg-[#CCCCCC] w-full mb-[30px]" />

        <div className="ml-[790px]">
          <IconButton
            buttonType="squareMini"
            style="fill"
            imgType="copy"
            text="복사하기"
            onClick={() => {
              navigator.clipboard.writeText(content);
              alert('복사되었습니다!');
            }}
          />
        </div>

        <div className="text-[20px] pt-[40px] font-medium whitespace-pre-wrap leading-relaxed">{content}</div>
      </div>
    </div>
  );
};

export default DownloadModal;
