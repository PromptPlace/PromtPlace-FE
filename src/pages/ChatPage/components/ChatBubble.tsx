interface ChatBubbleProps {
  text: string;
}

const ChatBubble = ({ text }: ChatBubbleProps) => {
  return (
    <div className="bg-background px-[20px] py-[16px] custom-body1 rounded-r-[32px] rounded-bl-[32px] max-w-[316px] w-full">
      {text}
    </div>
  );
};

export default ChatBubble;
