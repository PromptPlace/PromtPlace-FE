import clsx from 'clsx';

interface ChatBubbleProps {
  text: string;
  isMine: boolean;
}

const ChatBubble = ({ text, isMine }: ChatBubbleProps) => {
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
      </div>
    </div>
  );
};

export default ChatBubble;
