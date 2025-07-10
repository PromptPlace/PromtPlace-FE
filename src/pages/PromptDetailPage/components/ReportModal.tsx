import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi'; // 전송 아이콘

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  if (!isOpen) return null;

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setDescription(''); // 항목 바꾸면 내용 초기화
  };

  const handleSubmit = () => {
    if (!description.trim()) return;
    console.log('신고 항목:', selectedOption);
    console.log('신고 내용:', description);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative flex flex-col bg-white rounded-[16px] shadow-lg px-[64px] py-[48px] w-[758px] h-[639px] text-[#121212]">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-[20px] right-[20px] text-[28px] font-bold hover:opacity-60"
          onClick={onClose}
          aria-label="닫기">
          ×
        </button>

        {/* 헤더 */}
        <h2 className="text-[24px] font-bold mb-[40px]">프롬프트 신고하기</h2>

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
              <div className="flex items-start gap-[12px]">
                <input
                  type="radio"
                  name="reportOption"
                  value={item.value}
                  checked={selectedOption === item.value}
                  onChange={handleOptionChange}
                  className="mt-[6px]"
                />
                <div>
                  <p className="font-semibold text-[18px]">{item.label}</p>
                  {item.desc && <p className="text-[14px] text-gray-500 mt-[4px]">{item.desc}</p>}
                </div>
              </div>

              {/* 선택된 항목에만 textarea와 전송 버튼 표시 */}
              {selectedOption === item.value && (
                <div className="relative mt-[12px]">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="신고 내용을 입력하세요(구체적으로 작성)"
                    className="w-full h-[96px] bg-[#F5F5F5] border border-gray-300 rounded-[8px] p-4 resize-none focus:outline-blue-500 focus:ring-2 focus:ring-blue-300 transition text-[14px]"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!description.trim()}
                    className="absolute bottom-[12px] right-[12px] text-gray-700 hover:text-black disabled:opacity-30">
                    <FiSend className="text-[20px]" />
                  </button>
                </div>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
