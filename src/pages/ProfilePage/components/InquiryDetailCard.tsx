import { useState } from 'react';
import { motion } from 'motion/react';

import CircleButton from '@/components/Button/CircleButton';
import TextModal from '@/components/Modal/TextModal';
import CloseIcon from '@assets/icon-arrow-left-black.svg';
import MobileButton from '@/components/Button/MobileButton';

type Inquiry = {
  inquiry_id: number;
  sender_id: number;
  sender_nickname: string;
  type: string;
  status: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

interface InquiryDetailCardProps {
  inquiry: Inquiry;
  onClick: () => void;
  setShowMsgMoldal?: (show: boolean) => void;
}

const InquiryDetailCard = ({ inquiry, onClick, setShowMsgMoldal }: InquiryDetailCardProps) => {
  const [replyInput, setReplyInput] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-white pb-[30px] px-[80px] max-lg:hidden">
        <div className="pt-[24px] pl-[30px] pr-[10px] bg-background flex items-center justify-between">
          <div className="flex gap-[10px] items-center w-full">
            <div onClick={onClick} className="cursor-pointer">
              <img src={CloseIcon} alt="닫기" />
            </div>
            <div className="text-text-on-background text-[20px] font-medium leading-[25px] truncate">
              {inquiry.title}
            </div>
          </div>
          <div className="text-text-on-background text-[20px] font-medium leading-[25px] max-w-[180px] w-full truncate text-center">
            작성자: {inquiry.sender_nickname}
          </div>
          <div className="text-text-on-background text-[20px] font-medium leading-[25px] max-w-[354px] w-full truncate text-center">
            등록일:{new Date(inquiry.created_at).toLocaleDateString().slice(0, 11)}{' '}
            {new Date(inquiry.created_at)
              .toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Seoul',
              })
              .replace(/(\d+:\d+) (\w+)/, '$2 $1')}
          </div>
        </div>
        <div className="bg-background py-[24px] px-[64px]">
          <div className="min-h-[191px] text-text-on-white text-[18px] font-normal leading-[23px]">
            {inquiry.content}
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-[8px] border border-primary bg-white py-[22.8px] pl-[46.43px] pr-[14px] flex justify-between items-center h-[76px]">
            <input
              placeholder="답변을 입력하세요"
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              className="flex-1 outline-none placeholder:text-text-on-background text-[18px] font-normal leading-[23px] placeholder:font-SpoqaHanSansNeo text-text-on-white"
            />
            <CircleButton buttonType="send" size="md" onClick={() => {}} type="submit" />
          </form>
        </div>
      </div>

      <div className="lg:hidden">
        <motion.div
          className="lg:hidden fixed z-200 inset-0 bg-overlay max-w-[425px] w-full m-auto"
          onClick={onClick}
        />

        <div className="lg:hidden fixed left-0 right-0 bottom-0 z-200 max-w-[425px] w-full mx-auto">
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 50 }}
            dragElastic={false}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            onDragEnd={(_, info) => {
              if (info.point.y > window.innerHeight - 210 && setShowMsgMoldal) {
                setShowMsgMoldal(false);
              }
            }}>
            <div className="pt-[14px] pb-[10px] rounded-t-[24px] bg-white cursor-grab flex justify-center">
              <div className="w-[40px] h-[4px] rounded-[50px] bg-white-stroke"></div>
            </div>

            <div className="flex flex-col p-[20px] gap-[8px] bg-white">
              <div className="py-[6px] border-b-[0.5px] border-white-stroke flex justify-between truncate">
                <p className="text-text-on-white text-[12px] font-medium leading-[15px]  w-full truncate">
                  {inquiry.title}
                </p>
                <p className="text-text-on-white text-[10px] font-normal leading-[13px] max-w-[82px] w-full truncate text-end">
                  작성자: {inquiry.sender_id}
                </p>
              </div>
              <div className="h-[45px] overflow-auto text-text-on-white text-[10px] font-normal leading-[13px]">
                {inquiry.content}
              </div>
              <form onSubmit={handleSubmit}>
                <textarea
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="답변을 입력하세요"
                  className="w-full h-[59px] p-[6px] rounded-[2px] bg-background placeholder:text-text-on-background text-text-on-white text-[10px] font-normal leading-[13px] outline-none resize-none"
                />
              </form>
            </div>

            <div className="pb-[20px] bg-white">
              <MobileButton text="전송하기" onClick={() => {}} type="submit" />
            </div>
          </motion.div>
        </div>
      </div>

      {showModal && <TextModal text="답변 등록이 완료되었습니다." onClick={onClick} size="lg" />}
    </>
  );
};

export default InquiryDetailCard;
