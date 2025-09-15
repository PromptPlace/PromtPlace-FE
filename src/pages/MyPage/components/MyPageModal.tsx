import IconButton from '@/components/Button/IconButton';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import sendIcon from '@/assets/icon-send-primary.svg';
import sendIconPressed from '@/assets/icon-send-primary-pressed.svg';
import sendIconHover from '@/assets/icon-send-primary-hover.svg';
import checkBox from '@/assets/icon-square-checkbox-unchecked.svg';
import checkBoxMarked from '@/assets/icon-square-checkbox-checked.svg';
import { isAxiosError } from 'axios';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import { type ReportType } from '@/hooks/mutations/PromptDetailPage/useReportPrompt';
import Back from '@/pages/PromptDetailPage/assets/back.svg';

/**
 * 예 아니오 버튼을 통해 열고 닫을 수 있는 모달 컴포넌트입니다.
 *
 * @param {string|ReactNode} text -- 모달에 들어갈 내용
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 *
 *
 * @example
 * <DualModal text="업로드 하시겠습니까?" onClickYes={() => alert('예')} onClickNo={() => setShowModal3(false)} />
 *
 * @author 류동현
 * **/

interface SingleModalProps {
  text: string | ReactNode;
  onClick: () => void;
}

export const SingleModal = ({ text, onClick }: SingleModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 max-lg:px-[57px]">
      <div className="absolute inset-0 bg-overlay"></div>

      <div className="relative px-[150px] max-lg:px-[20px] py-[64px] max-lg:py-[20px] bg-white rounded-[16px] max-lg:rounded-[8px] shadow-gradient z-10 flex flex-col items-center justify-center gap-[24px] max-lg:gap-[12px] text-center max-lg:w-full">
        <p className="text-[32px] max-lg:text-[12px] font-bold leading-[40px] max-lg:leading-[15px] text-text-on-white">
          {text}
        </p>

        <IconButton
          buttonType="round"
          style="fill"
          imgType="none"
          textButton="blue"
          text="메인으로"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext:()=>void;
}

export const ReportModal = ({ isOpen, onClose, onNext }: ReportModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  //const { mutateAsync: report, isPending } = useReportPrompt(); 탈퇴 사유 제출 api로 변경
  const { handleShowLoginModal } = useShowLoginModal();

  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  if (!isOpen) return null;

  const OPTIONS: { value: string; label: string }[] = [
    // value 타입 정의를 탈퇴사유 수집 ReportType 으로 변경 필요
    {
      value: 'NFALSE_OR_EXAGGERATED',
      label: '원하는 프롬프트(콘텐츠)를 찾을 수 없어서',
    },
    {
      value: 'dCOPYRIGHT_INFRINGEMENT',
      label: '서비스 이용 방법(플랫폼 구조)이 복잡해서',
    },

    {
      value: 'ffINAPPROPRIATE_OR_HARMFUL',
      label: '고객 지원/문의 대응이 만족스럽지 않아서',
    },
    { value: 'lINAPPROPRIATE_OR_HARMFUL', label: '비슷한 서비스를 이용하고 있어서' },

    {
      value: 'sdfINAPPROPRIATE_OR_HARMFUL',
      label: '개인적인 사정(시간 부족,관심사 변화 등)',
    },

    { value: 'ETC', label: '기타(직접 입력)' },
  ];

  const handleSubmit = async () => {
    //if (!description.trim() || !selectedOption || !Number.isFinite(promptId) || isPending) return;
    try {
      //await report({ prompt_id: promptId, report_type: selectedOption, description: description.trim() }); 탈퇴 사유 제출 api로 변경
      setIsSubmitted(true);
      setTimeout(onClose, 1200);
    } catch (e) {
      if (isAxiosError(e) && (e.response?.status ?? 0) === 401) {
        handleShowLoginModal(handleSubmit);
        return;
      }
      alert('신고 처리에 실패했습니다.');
    }
  };

  return (
    <div className="bg-overlay fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="relative flex flex-col bg-white rounded-[16px] shadow-lg px-[42px] py-[55px] w-[758px]  max-lg:w-[280px] max-lg:h-[350px] max-lg:pt-0 max-lg:pb-0 max-lg:px-0 text-[#121212]">
        {/* 제목 */}
        <div className="flex items-center mb-[30px] max-lg:m-0 max-lg:pl-[8px] max-lg:h-[40px] max-lg:pt-[20px] max-lg:pr-[20px]">
          <img
            src={Back}
            alt="뒤로가기"
            className="text-2xl font-bold leading-none hover:opacity-70 max-lg:w-[16px] max-lg:h-[16px] max-lg:text-[16px] max-lg:leading-[16px]"
            onClick={onClose}
          />

          <div className="text-[24px] font-bold ml-[10px] max-lg:text-[16px] max-lg:ml-[10px] max-lg:leading-[16px]">
            탈퇴 사유 수집
          </div>
        </div>
        <div className="flex justify-center text-[24px] font-bold mb-[60px]">탈퇴 사유를 선택해 주세요</div>

        <div>
          <div className="flex flex-col gap-[24px] px-[25px] max-lg:pt-[20px] max-lg:px-[20px] max-lg:h-[310px]">
            <div className="flex flex-col gap-[30px] max-lg:gap-[12px]">
              {OPTIONS.map((item) => (
                <label key={item.value} className="flex flex-col gap-[6px] max-lg:gap-[2px] cursor-pointer">
                  <div className="flex items-start max-lg:gap-[12px] gap-[16px] max-lg:text-[#000000]">
                    <input
                      type="radio"
                      name="reportOption"
                      value={item.value}
                      checked={selectedOption === item.value}
                      onChange={(e) => setSelectedOption(e.target.value as ReportType)}
                      className="hidden"
                    />
                    <img
                      src={selectedOption === item.value ? checkBoxMarked : checkBox}
                      alt="radio"
                      onClick={() => setSelectedOption(item.value)}
                      className="w-[20px] h-[20px] max-lg:w-[16px] max-lg:h-[16px] mt-[6px] max-lg:mt-[2px] cursor-pointer"
                    />
                    <div>
                      <p className="text-[20px] text-text-on-white font-medium max-lg:text-[14px]">{item.label}</p>
                    </div>
                  </div>

                  {selectedOption === 'ETC' && item.value === 'ETC' && (
                    <div className="relative mt-[12px] ml-[36px] max-lg:pl-[28px] max-lg:m-0 max-lg:h-[68px]">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="신고 내용을 입력하세요(구체적으로 작성)"
                        className="w-full h-[96px] bg-[#F5F5F5] border-none rounded-[8px] p-4 resize-none focus:outline-none focus:ring-0 transition text-[14px] max-lg:p-[8px] max-lg:text-[10px] max-lg:w-[212px] max-lg:h-[68px]"
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={!description.trim() || !selectedOption}
                        className="absolute bottom-[12px] right-[12px] text-black opacity-100 transition-opacity"
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => {
                          setIsHover(false);
                          setIsPressed(false);
                        }}
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}>
                        <img
                          src={isPressed ? sendIconPressed : isHover ? sendIconHover : sendIcon}
                          alt="send"
                          className="w-[20px] h-[20px] max-lg:w-[16px] max-lg:h-[16px]"
                        />
                      </button>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-[32px] justify-end mt-[30px]">
            <IconButton
              buttonType="round"
              style="fill"
              imgType="none"
              textButton="blue"
              text="돌아가기"
              onClick={onClose}
            />
            <IconButton
              buttonType="round"
              style="outline"
              imgType="none"
              textButton="white"
              text="탈퇴하기"
              onClick={onNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
