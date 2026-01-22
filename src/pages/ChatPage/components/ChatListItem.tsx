import formatDate from '@/utils/formatDate';
import Default from '@assets/icon-profile-image-default.svg';

interface ChatListItemProps {
  partner: {
    nickname: string;
    profile_image_url: string | null;
  };
  last_message: {
    content: string;
    sent_at: Date | string;
    has_attachments: boolean;
  };
  unread_count: number;
  is_pinned: boolean;
}

const ChatListItem = ({ partner, last_message, unread_count }: ChatListItemProps) => {
  return (
    <div className="p-[16px] flex gap-[16px] items-center max-w-[317px] w-full cursor-pointer hover:bg-background rounded-[8px]">
      <div className="size-[48px] shrink-0">
        <img
          src={partner.profile_image_url || Default}
          alt="사용자 프로필 이미지"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <h2 className="custom-button1 text-text-on-white">{partner.nickname}</h2>
          <p className="custom-body3 text-gray700">{formatDate(last_message.sent_at)}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="custom-body3 text-gray700 truncate">{last_message.content}</p>

          {unread_count > 0 && (
            <button className="rounded-[200px] py-[2px] px-[6px] h-[19px] bg-alert custom-button3 text-white text-center">
              {unread_count}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
