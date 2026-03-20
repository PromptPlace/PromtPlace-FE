import type { Attachment } from '@/types/ChatPage/chat';
import clsx from 'clsx';
import { useState } from 'react';

import Download from '@assets/icon-download-gray.svg?react';
import X from '@assets/icon-x-button.svg?react';

interface ChatBubbleProps {
  text: string;
  files: Attachment[];
  isMine: boolean;
}

const ChatBubble = ({ text, files, isMine }: ChatBubbleProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleDownload = async (url: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'image';
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('다운로드 실패', err);
    }
  };

  return (
    <div className={clsx('flex', isMine ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'px-[20px] py-[16px] custom-body1 max-w-[316px] w-fit',
          isMine
            ? 'bg-primary text-white rounded-l-[32px] rounded-tr-[32px]'
            : 'bg-background rounded-r-[32px] rounded-bl-[32px]',
        )}>
        {text}

        <div
          className={clsx(
            'grid gap-[16px]',
            files.length === 1 && 'grid-cols-1',
            files.length === 2 && 'grid-cols-2',
            files.length >= 3 && 'grid-cols-3',
          )}>
          {files?.map((file) => (
            <img
              onClick={() => setPreview(file.url)}
              key={file.url}
              src={file.url}
              className="w-full h-[80px] object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 bg-overlay flex items-center justify-center z-50 flex-col gap-[20px]"
          onClick={() => setPreview(null)}>
          <div className="flex justify-end pr-[40px] w-full gap-[20px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(preview);
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
      )}
    </div>
  );
};

export default ChatBubble;
