import XIcon from '@assets/icon-x-button.svg?react';
import AttachIcon from '@assets/chat/icon-attach.svg?react';
import DownloadIcon from '@assets/icon-download-gray.svg?react';
import clsx from 'clsx';
import { downloadFile } from '@/utils/download';

interface PreviewItemProps {
  imageURL: string;
  fileSize: string;
  type: string;
  name: string;
  handleDeleteImage?: () => void;
}

const PreviewItem = ({ imageURL, fileSize, type, name, handleDeleteImage }: PreviewItemProps) => {
  return (
    <div
      className={clsx(
        'bg-white p-[8px] border border-gray300 rounded-[12px] w-full flex gap-[16px] items-center justify-between',
        type.startsWith('image/') ? 'max-w-[150px]' : 'lg:w-full max-lg:max-w-[223px] h-[56px]',
      )}>
      {/* 이미지 */}
      {type.startsWith('image/') && (
        <div className="size-[40px] rounded-[4px] overflow-hidden">
          <img src={imageURL} alt="이미지 미리보기" className="w-full h-full object-cover" />
        </div>
      )}

      {/* 파일 */}
      {!type.startsWith('image/') && (
        <div className="flex gap-[10px] items-center w-full">
          <AttachIcon className="text-black" />
          <p
            className={clsx(
              'custom-button2 max-lg:truncate text-black',
              handleDeleteImage ? 'max-lg:max-w-[81px]' : '',
            )}>
            {name}
          </p>
        </div>
      )}

      {/* 파일 및 이미지 선택 시 파일 사이즈 */}
      {handleDeleteImage && <p className="custom-button3">{fileSize}</p>}

      {/* 파일 및 이미지 삭제 */}
      {handleDeleteImage && <XIcon onClick={handleDeleteImage} className="cursor-pointer shrink-0 text-gray500" />}

      {/* 파일의 경우 다운로드 아이콘 */}
      {!handleDeleteImage && (
        <DownloadIcon className="cursor-pointer shrink-0 text-gray500" onClick={() => downloadFile(imageURL, name)} />
      )}
    </div>
  );
};

export default PreviewItem;
