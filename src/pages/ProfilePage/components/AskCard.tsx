import CircleButton from '@/components/Button/CircleButton';
import DotsIcon from '@assets/icon-dot.svg?react';
import { useState } from 'react';

type promptsType = {
  prompt_id: number;
  title: string;
  model: string;
  purchased_at: string;
  tags: {
    tag_id: number;
    name: string;
  }[];
};

interface AskCardProps {
  prompts: promptsType[];
  isMyProfile: boolean;
}

const AskCard = ({ prompts, isMyProfile }: AskCardProps) => {
  const [isListClicked, setIsListClicked] = useState(false);
  const [prompt, setPrompt] = useState<promptsType>(prompts[0]);

  const [isClicked, setIsClicked] = useState(false);
  const [type, setType] = useState<'buyer' | 'nonBuyer'>('nonBuyer');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('문의 완료');
  };

  return (
    <>
      {!isMyProfile && (
        <form onSubmit={handleSubmit}>
          <div className="relative bg-white border-b border-b-white-stroke px-[65px] pt-[55px] text-text-on-white text-[20px] font-medium leading-[25px]">
            <textarea
              placeholder="문의할 내용을 입력하세요"
              className="text-text-on-background text-[20px] font-medium leading-[25px] w-full min-h-[409px] outline-none resize-none"
            />

            <div className="flex gap-[32px] items-center justify-end w-full absolute right-[32px] bottom-[34px]">
              <div className="relative bg-primary rounded-[4px] py-[5px] px-[10px] flex justify-between h-[34px] max-w-[631px] w-full">
                <p className="text-white text-[18px] font-normal leading-[23px] truncate">
                  [{prompt.title}] {type === 'buyer' && `${prompt.purchased_at.slice(0, 10).replaceAll('-', '.')}구매`}
                </p>
                <div
                  onClick={() => setIsListClicked((prev) => !prev)}
                  className="group w-[24px] h-[24px] cursor-pointer flex items-center justify-center hover:bg-secondary-pressed rounded-full">
                  <DotsIcon className="text-white group-hover:text-text-on-white" />
                </div>
                {isListClicked && (
                  <div className="absolute top-[34px] left-0 right-0 rounded-[4px] flex flex-col">
                    {prompts.map((p) => (
                      <div
                        key={p.prompt_id}
                        className="bg-secondary shadow-button-hover text-center cursor-pointer py-[5px] px-[10px] h-[34px]">
                        <p
                          onClick={() => {
                            setPrompt(p);
                            setIsListClicked(false);
                          }}
                          className="text-text-on-white text-[18px] font-normal leading-[23px]">
                          [{p.title}]
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="py-[5px] px-[10px] rounded-[4px] flex items-center justify-between gap-[5px] bg-primary w-[203px] h-[34px] relative">
                  <p className="text-white text-[18px] font-normal leading-[23px]">
                    {type === 'nonBuyer' && '비구매자로 문의하기'}
                    {type === 'buyer' && '구매자로 문의하기'}
                  </p>
                  <div
                    onClick={() => setIsClicked((prev) => !prev)}
                    className="group w-[24px] h-[24px] cursor-pointer flex items-center justify-center hover:bg-secondary-pressed rounded-full">
                    <DotsIcon className="text-white group-hover:text-text-on-white" />
                  </div>

                  {isClicked && (
                    <div
                      onClick={() => {
                        setType((prev) => (prev === 'nonBuyer' ? 'buyer' : 'nonBuyer'));
                        setIsClicked(false);
                      }}
                      className="absolute inset-0 top-[34px] py-[5px] px-[10px] rounded-[4px] bg-secondary shadow-button-hover h-[34px] cursor-pointer text-center">
                      <p className="text-text-on-white text-[18px] font-normal leading-[23px]">
                        {type === 'buyer' && '비구매자로 문의하기'}
                        {type === 'nonBuyer' && '구매자로 문의하기'}
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
    </>
  );
};

export default AskCard;
