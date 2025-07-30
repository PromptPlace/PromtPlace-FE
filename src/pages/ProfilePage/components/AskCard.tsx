import { useState } from 'react';

import CircleButton from '@components/Button/CircleButton';
import DotsIcon from '@assets/icon-dot-white.svg';
import clsx from 'clsx';

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
          <div className="relative bg-white border-b border-b-white-stroke px-[65px] pt-[55px] max-lg:p-[12px] text-text-on-white text-[20px] font-medium leading-[25px] max-lg:min-h-[214px]">
            <textarea
              placeholder="문의할 내용을 입력하세요"
              className="text-text-on-background text-[20px] font-medium leading-[25px] w-full min-h-[409px] max-lg:min-h-[190px] outline-none resize-none max-lg:pt-[38px] max-lg:text-[10px] max-lg:font-normal max-lg:leading-[13px]"
            />

            <div className="flex gap-[32px] items-center justify-end w-full absolute right-[32px] bottom-[34px] max-lg:static">
              <div className="relative bg-primary rounded-[4px] py-[5px] max-lg:py-[6px] px-[10px] max-lg:px-[8px] flex justify-between lg:max-h-[34px] lg:truncate max-lg:h-auto max-w-[631px] max-lg:max-w-none max-lg:w-[calc(100%-24px)] w-full max-lg:absolute max-lg:top-[24px] max-lg:left-1/2 max-lg:-translate-1/2">
                <p className="text-white text-[18px] font-normal leading-[23px] max-lg:text-[12px] max-lg:leading-[15px] lg:truncate">
                  [{prompt.title}] {type === 'buyer' && `${prompt.purchased_at.slice(0, 10).replaceAll('-', '.')}구매`}
                </p>
                <div
                  onClick={() => setIsListClicked((prev) => !prev)}
                  className="group w-[24px] h-[24px] max-lg:w-[16px] max-lg:h-[16px] max-lg:py-[2px] max-lg:px-[6px] cursor-pointer flex items-center justify-center hover:bg-secondary-pressed rounded-full">
                  <img src={DotsIcon} className="text-white group-hover:text-text-on-white" />
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
                          className="text-text-on-white text-[18px] font-normal leading-[23px] max-lg:text-[12px] max-lg:leading-[15px]">
                          [{p.title}]
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="lg:hidden flex fixed top-[214px] left-1/2 max-[373px]:left-1/3 max-[373px]:translate-x-[30px]">
                  <div
                    onClick={() => setType('buyer')}
                    className={clsx(
                      'cursor-pointer rounded-[4px] py-[6px] w-[90px] text-[10px] font-normal leading-[13px] flex justify-center',
                      type === 'buyer' && 'bg-primary-hover text-white',
                      type === 'nonBuyer' && 'bg-white text-text-on-white',
                    )}>
                    구매자 문의
                  </div>
                  <div
                    onClick={() => setType('nonBuyer')}
                    className={clsx(
                      'cursor-pointer rounded-[4px] py-[6px] w-[90px] text-[10px] font-normal leading-[13px] flex justify-center',
                      type === 'nonBuyer' && 'bg-primary-hover text-white',
                      type === 'buyer' && 'bg-white text-text-on-white',
                    )}>
                    비구매자 문의
                  </div>
                </div>
                <div className="py-[5px] px-[10px] rounded-[4px] flex items-center justify-between gap-[5px] bg-primary w-[203px] h-[34px] relative max-lg:hidden">
                  <p className="text-white text-[18px] font-normal leading-[23px]">
                    {type === 'nonBuyer' && '비구매자로 문의하기'}
                    {type === 'buyer' && '구매자로 문의하기'}
                  </p>
                  <div
                    onClick={() => setIsClicked((prev) => !prev)}
                    className="group w-[24px] h-[24px] max-lg:w-[16px] max-lg:h-[16px] cursor-pointer flex items-center justify-center hover:bg-secondary-pressed rounded-full">
                    <img src={DotsIcon} className="text-white group-hover:text-text-on-white" />
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
