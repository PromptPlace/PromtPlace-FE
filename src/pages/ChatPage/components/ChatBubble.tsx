import type { Attachment } from '@/types/ChatPage/chat';
import clsx from 'clsx';

interface ChatBubbleProps {
  text: string;
  files: Attachment[];
  isMine: boolean;
}

const ChatBubble = ({ text, files, isMine }: ChatBubbleProps) => {
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
            <img key={file.url} src={file.url} className="w-full h-[80px] object-cover rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
