import { useState } from 'react';

import CircleButton from '@components/Button/CircleButton';
import TextModal from '@/components/Modal/TextModal';

import DotsIcon from '@assets/icon-dot-white.svg';
import type { RequestGetInquiriesDto, RequestInquiriesDto } from '@/types/ProfilePage/inquiry';
import type { ResponsePromptsDto } from '@/types/ProfilePage/profile';
import type { InfiniteData } from '@tanstack/react-query';

interface AskCardProps {
  prompts: InfiniteData<ResponsePromptsDto, unknown> | undefined;
  isMyProfile: boolean;
  type: RequestGetInquiriesDto;
  setType: React.Dispatch<React.SetStateAction<RequestGetInquiriesDto>>;
  member_id: number;
  mutatePostInquiries: ({ receiver_id, type, title, content }: RequestInquiriesDto) => void;
}

const AskCard = ({ prompts, isMyProfile, type, setType, member_id, mutatePostInquiries }: AskCardProps) => {
  const [isListClicked, setIsListClicked] = useState(false);
  const [prompt, setPrompt] = useState(prompts?.pages[0]?.data.prompts[0].title);
  const [content, setContent] = useState('');

  const [isClicked, setIsClicked] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim()) {
      mutatePostInquiries({ receiver_id: member_id, type: type.type!, title: prompt!, content });
      setShowModal(true);
    }
  };

  return (
    <>
      {!isMyProfile && (
        <form onSubmit={handleSubmit}>
          <div className="relative bg-white border-b border-b-white-stroke px-[65px] pt-[55px] max-lg:p-[12px] text-text-on-white text-[20px] font-medium leading-[25px] max-lg:min-h-[214px] max-lg:mt-[-30px]">
            <textarea
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              placeholder="문의할 내용을 입력하세요"
              className="placeholder:font-SpoqaHanSansNeo placeholder:text-text-on-background text-[20px] font-medium leading-[25px] w-full min-h-[409px] max-lg:min-h-[190px] outline-none resize-none max-lg:pt-[38px] max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px]"
            />

            <div className="flex gap-[32px] items-center justify-end w-full absolute right-[32px] bottom-[34px] max-lg:static">
              <div className="relative bg-primary rounded-[4px] py-[5px] max-lg:py-[6px] px-[10px] max-lg:px-[8px] flex justify-between lg:max-h-[34px] max-lg:h-auto max-w-[631px] max-lg:max-w-none max-lg:w-[calc(100%-24px)] w-full max-lg:absolute max-lg:top-[24px] max-lg:left-1/2 max-lg:-translate-1/2">
                <p className="text-white text-[18px] font-normal leading-[23px] max-lg:text-[12px] max-lg:leading-[15px] lg:truncate">
                  [{prompt}]
                  {/* {type.type === 'buyer' && `${prompt.purchased_at.slice(0, 10).replaceAll('-', '.')}구매`} */}
                </p>
                <div
                  onClick={() => setIsListClicked((prev) => !prev)}
                  className="group w-[24px] h-[24px] max-lg:w-[16px] max-lg:h-[16px] max-lg:py-[2px] max-lg:px-[6px] cursor-pointer flex items-center justify-center hover:bg-secondary-pressed rounded-full">
                  <img src={DotsIcon} className="text-white group-hover:text-text-on-white" />
                </div>
                {isListClicked && (
                  <>
                    <div className="absolute top-[34px] left-0 right-0 rounded-[4px] max-h-[200px] overflow-auto">
                      {prompts?.pages.map((page) =>
                        page.data.prompts.map((prompt) => {
                          return (
                            <div
                              key={prompt.prompt_id}
                              className="bg-secondary shadow-button-hover text-center cursor-pointer py-[5px] px-[10px] h-[34px] flex justify-center align-center items-center">
                              <p
                                onClick={() => {
                                  setPrompt(prompt.title);
                                  setIsListClicked(false);
                                }}
                                className="text-text-on-white text-[18px] font-normal leading-[23px] max-lg:text-[12px] max-lg:leading-[15px]">
                                [{prompt.title}]
                              </p>
                            </div>
                          );
                        }),
                      )}
                    </div>
                  </>
                )}
              </div>

              <div>
                <div className="py-[5px] px-[10px] rounded-[4px] flex items-center justify-between gap-[5px] bg-primary w-[203px] h-[34px] relative max-lg:hidden">
                  <p className="text-white text-[18px] font-normal leading-[23px]">
                    {type.type === 'non_buyer' && '비구매자로 문의하기'}
                    {type.type === 'buyer' && '구매자로 문의하기'}
                  </p>
                  <div
                    onClick={() => setIsClicked((prev) => !prev)}
                    className="group w-[24px] h-[24px] max-lg:w-[16px] max-lg:h-[16px] cursor-pointer flex items-center justify-center hover:bg-secondary-pressed rounded-full">
                    <img src={DotsIcon} className="text-white group-hover:text-text-on-white" />
                  </div>

                  {isClicked && (
                    <div
                      onClick={() => {
                        setType((prev) => (prev.type === 'non_buyer' ? { tpye: 'buyer' } : { type: 'non_buyer' }));
                        setIsClicked(false);
                      }}
                      className="absolute inset-0 top-[34px] py-[5px] px-[10px] rounded-[4px] bg-secondary shadow-button-hover h-[34px] cursor-pointer text-center">
                      <p className="text-text-on-white text-[18px] font-normal leading-[23px]">
                        {type.type === 'buyer' && '비구매자로 문의하기'}
                        {type.type === 'non_buyer' && '구매자로 문의하기'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                <CircleButton type="submit" buttonType="send" size="md" onClick={() => {}} />
              </div>
            </div>
          </div>
        </form>
      )}

      {showModal && !isMyProfile && (
        <TextModal
          text="문의가 등록되었습니다."
          onClick={() => {
            setShowModal((prev) => !prev);
            setContent('');
          }}
          size="lg"
        />
      )}
    </>
  );
};

export default AskCard;
