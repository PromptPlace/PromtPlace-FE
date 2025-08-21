import React, { useState } from 'react';
import sendIcon from '@assets/icon-send-primary.svg';
import sendIconPressed from '@assets/icon-send-primary-pressed.svg';
import sendIconHover from '@assets/icon-send-primary-hover.svg';
import BiRadioCircle from '../assets/BiRadioCircle.png';
import BiRadioCircleMarked from '../assets/BiRadioCircleMarked.png';
import { isAxiosError } from 'axios';
import { useShowLoginModal } from '@/hooks/useShowLoginModal';
import useReportPrompt, { type ReportType } from '@/hooks/mutations/PromptDetailPage/useReportPrompt';
import Back from '../assets/back.svg';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptId: number;
}

const ReportModal = ({ isOpen, onClose, promptId }: ReportModalProps) => {
  const [selectedOption, setSelectedOption] = useState<ReportType | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutateAsync: report, isPending } = useReportPrompt();
  const { handleShowLoginModal } = useShowLoginModal();

  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  if (!isOpen) return null;

  const OPTIONS: { value: ReportType; label: string; desc?: string }[] = [
    { value: 'FALSE_OR_EXAGGERATED', label: '허위 또는 과장된 콘텐츠', desc: '프롬프트 및 설명에 허위/과장 정보 포함' },
    { value: 'COPYRIGHT_INFRINGEMENT', label: '저작권 및 지적재산권 침해', desc: '타인의 프롬프트를 무단 복제/침해' },
    { value: 'INAPPROPRIATE_OR_HARMFUL', label: '불쾌하거나 부적절한 내용', desc: '혐오, 차별, 음란, 폭력 등' },
    { value: 'ETC', label: '기타' },
  ];

  const handleSubmit = async () => {
    if (!description.trim() || !selectedOption || !Number.isFinite(promptId) || isPending) return;
    try {
      await report({ prompt_id: promptId, report_type: selectedOption, description: description.trim() });
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
      <div className="relative flex flex-col bg-white rounded-[16px] shadow-lg px-[42px] py-[45px] w-[758px] h-[635px] max-lg:w-[280px] max-lg:h-[350px] max-lg:pt-0 max-lg:pb-0 max-lg:px-0 text-[#121212]">
        {/* 제목 */}
        <div className="flex items-center mb-[40px] max-lg:m-0 max-lg:pl-[8px] max-lg:h-[40px] max-lg:pt-[20px] max-lg:pr-[20px]">
          <img
            src={Back}
            alt="뒤로가기"
            className="text-2xl font-bold leading-none hover:opacity-70 max-lg:w-[16px] max-lg:h-[16px] max-lg:text-[16px] max-lg:leading-[16px]"
            onClick={onClose}
          />

          <h2 className="text-[24px] font-bold ml-[10px] max-lg:text-[16px] max-lg:ml-[10px] max-lg:leading-[16px]">
            프롬프트 신고하기
          </h2>
        </div>

        {!isSubmitted ? (
          <div className="flex flex-col gap-[24px] px-[25px] max-lg:pt-[20px] max-lg:px-[20px] max-lg:h-[310px]">
            <div className="flex flex-col gap-[24px] max-lg:gap-[12px]">
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
                      src={selectedOption === item.value ? BiRadioCircleMarked : BiRadioCircle}
                      alt="radio"
                      onClick={() => setSelectedOption(item.value)}
                      className="w-[20px] h-[20px] max-lg:w-[16px] max-lg:h-[16px] mt-[6px] max-lg:mt-[2px] cursor-pointer"
                    />
                    <div>
                      <p className="text-[24px] font-bold max-lg:text-[14px]">{item.label}</p>
                      {item.desc && (
                        <p className="font-medium text-[20px] mt-[4px] max-lg:mt-0 max-lg:text-[10px]">{item.desc}</p>
                      )}
                    </div>
                  </div>

                  {selectedOption === item.value && (
                    <div className="relative mt-[12px] ml-[36px] max-lg:pl-[28px] max-lg:m-0 max-lg:h-[68px]">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="신고 내용을 입력하세요(구체적으로 작성)"
                        className="w-full h-[96px] bg-[#F5F5F5] border-none rounded-[8px] p-4 resize-none focus:outline-none focus:ring-0 transition text-[14px] max-lg:p-[8px] max-lg:text-[10px] max-lg:w-[212px] max-lg:h-[68px]"
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={!description.trim() || !selectedOption || isPending}
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
        ) : (
          <div className="flex-1 flex items-center justify-center text-[24px] max-lg:text-[12px] font-bold text-center">
            신고가 완료되었습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportModal;
