import type { Attachment } from '@/types/ChatPage/chat';
import clsx from 'clsx';
import { useState } from 'react';

import Download from '@assets/icon-download-gray.svg?react';
import X from '@assets/icon-x-button.svg?react';
import PreviewItem from './PreviewItem';
import { downloadFile } from '@/utils/download';

interface ChatBubbleProps {
  text: string;
  files: Attachment[];
  isMine: boolean;
  popup?: boolean;
  date: string;
  showTime?: boolean;
}

const ChatBubble = ({ text, files, isMine, popup, date, showTime }: ChatBubbleProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selected, setSelected] = useState<Attachment | null>(null);
  const hasFile = files.some((file) => file.type === 'FILE');

  const formatTime = (date: string) => {
    const d = new Date(date);

    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  };

  return (
    <div className={clsx('flex gap-2', isMine ? 'justify-end' : 'justify-end flex-row-reverse')}>
      {showTime && <div className={clsx('custom-body3 text-gray700 self-end')}>{formatTime(date)}</div>}

      <div
        className={clsx(
          'px-[20px] py-[16px] custom-body1 max-w-[316px] w-fit',
          isMine
            ? 'bg-primary text-white rounded-l-[32px] rounded-tr-[32px]'
            : 'bg-background rounded-r-[32px] rounded-bl-[32px]',
          hasFile && 'flex flex-col gap-[16px]',
        )}>
        {text}

        <div
          className={clsx(
            hasFile && 'flex flex-col gap-[8px]',
            !hasFile && 'grid gap-[16px]',
            files.length === 1 && 'grid-cols-1',
            files.length === 2 && 'grid-cols-2',
            files.length >= 3 && 'grid-cols-3',
          )}>
          {files?.map((file) => {
            const isImage = file.type === 'IMAGE';

            return isImage ? (
              <img
                key={file.url}
                src={file.url}
                onClick={() => {
                  setPreview(file.url);
                  setSelected(file);
                }}
                className={clsx('w-full object-cover rounded-md', popup ? 'h-[80px]' : 'h-full')}
              />
            ) : (
              <PreviewItem
                key={file.url}
                imageURL={file.url}
                fileSize={String(file.size)}
                type={file.type}
                name={file.original_name}
              />
            );
          })}
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 bg-overlay flex flex-col items-center justify-center z-50 flex-col gap-[20px]"
          onClick={() => setPreview(null)}>
          <div className="flex flex-col items-center gap-[20px]">
            <div className="flex gap-[20px] justify-end w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadFile(preview, selected?.original_name);
                }}
                className="bg-white size-[40px] rounded-full flex items-center justify-center">
                <Download className="text-black" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                }}
                className="bg-white size-[40px] rounded-full flex items-center justify-center">
                <X className="text-black" />
              </button>
            </div>

            <img src={preview} className="max-w-[400px] w-full object-contain" onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
