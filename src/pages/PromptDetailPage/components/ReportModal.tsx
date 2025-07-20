import React, { useState } from 'react';
import sendIcon from '../assets/BiSend.png';
import BiRadioCircle from '../assets/BiRadioCircle.png';
import BiRadioCircleMarked from '../assets/BiRadioCircleMarked.png';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal = ({ isOpen, onClose }: ReportModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setDescription('');
  };

  const handleSubmit = () => {
    if (!description.trim()) return;
    console.log('신고 항목:', selectedOption);
    console.log('신고 내용:', description);
    setIsSubmitted(true);
  };

  return (
    <div className=" bg-overlay fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="relative flex flex-col bg-white rounded-[16px] shadow-lg px-[42px] py-[45px] w-[758px] h-[635px] text-[#121212]">
        <div className="flex items-center mb-[40px]">
          <button onClick={onClose} className="text-2xl font-bold leading-none hover:opacity-70" aria-label="뒤로가기">
            &lt;
          </button>
          <h2 className="text-[24px] font-bold ml-[10px]">프롬프트 신고하기</h2>
        </div>

        {!isSubmitted ? (
          <div className="flex flex-col gap-[24px] px-[25px]">
            {/* 라디오 항목 */}
            <div className="flex flex-col gap-[24px]">
              {[
                {
                  value: '허위 또는 과장된 콘텐츠',
                  label: '허위 또는 과장된 콘텐츠',
                  desc: '프롬프트 및 프롬프트 설명에 허위 정보 포함 또는 지나치게 과장된 경우',
                },
                {
                  value: '저작권 및 지적재산권 침해',
                  label: '저작권 및 지적재산권 침해',
                  desc: '타인의 프롬프트를 무단 복제하거나 권리를 침해한 경우',
                },
                {
                  value: '불쾌하거나 부적절한 내용',
                  label: '불쾌하거나 부적절한 내용',
                  desc: '혐오, 차별, 음란, 폭력 등의 부적절한 내용이 포함된 경우',
                },
                {
                  value: '기타',
                  label: '기타',
                  desc: '',
                },
              ].map((item) => (
                <label key={item.value} className="flex flex-col gap-[6px] cursor-pointer">
                  <div className="flex items-start gap-[12px]  text-[#000000]">
                    <input
                      type="radio"
                      name="reportOption"
                      value={item.value}
                      checked={selectedOption === item.value}
                      onChange={handleOptionChange}
                      className="hidden"
                    />
                    {/*라디오 아이콘 */}
                    <img
                      src={selectedOption === item.value ? BiRadioCircleMarked : BiRadioCircle}
                      alt="radio"
                      onClick={() => setSelectedOption(item.value)}
                      className="w-[20px] h-[20px] mt-[6px] cursor-pointer"
                    />

                    <div>
                      <p className="text-[24px] font-bold">{item.label}</p>
                      {item.desc && <p className="font-medium text-[20px] mt-[4px]">{item.desc}</p>}
                    </div>
                  </div>

                  {/* 선택된 항목에만 textarea와 전송 버튼 표시 */}
                  {selectedOption === item.value && (
                    <div className="relative mt-[12px]">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="신고 내용을 입력하세요(구체적으로 작성)"
                        className="w-full h-[96px] bg-[#F5F5F5] border border-gray-300 rounded-[8px] p-4 resize-none focus:outline-none focus:ring-0 transition text-[14px]"
                      />

                      <button
                        onClick={handleSubmit}
                        disabled={!description.trim()}
                        className="absolute bottom-[12px] right-[12px] text-black opacity-100 transition-opacity">
                        <img src={sendIcon} alt="send" className="w-[20px] h-[20px]" />
                      </button>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[24px] font-bold text-center">
            신고가 완료되었습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportModal;
