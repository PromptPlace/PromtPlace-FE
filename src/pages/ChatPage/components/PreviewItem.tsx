import XIcon from '@assets/icon-x-button.svg?react';

interface PreviewItemProps {
  imageURL: string;
  fileSize: string;
  handleDeleteImage: () => void;
}

const PreviewItem = ({ imageURL, fileSize, handleDeleteImage }: PreviewItemProps) => {
  return (
    <div className="p-[8px] border border-gray300 rounded-[12px] max-w-[150px] w-full flex gap-[16px] items-center justify-between">
      <div className="size-[40px] rounded-[4px] overflow-hidden">
        <img src={imageURL} alt="이미지 미리보기" className="w-full h-full object-cover" />
      </div>

      <p>{fileSize}</p>

      <XIcon onClick={handleDeleteImage} className="cursor-pointer" />
    </div>
  );
};

export default PreviewItem;
