import React, { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  if (!isOpen) return null;

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    // 신고 내용 제출 로직 추가
    console.log('신고 내용:', selectedOption);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50 p-4">
      <div
        className="relative flex flex-col bg-white rounded-[16px] shadow-gradient"
        style={{ width: 758, height: 639 }}>
        {/* 닫기 버튼 */}
        <button
          className="absolute top-[20px] right-[20px] text-2xl font-bold text-[#121212]"
          onClick={onClose}
          aria-label="닫기">
          ×
        </button>

        {/* 헤더 */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold">프로젝트 신고하기</h2>
        </div>

        {/* 신고 내용 선택 */}
        <div className="px-8 mt-6">
          <div>
            <label className="block text-lg font-semibold">신고 사유를 선택해주세요:</label>
            <div className="mt-4">
              <label className="block">
                <input
                  type="radio"
                  name="reportOption"
                  value="허위 또는 과장된 콘텐츠"
                  checked={selectedOption === '허위 또는 과장된 콘텐츠'}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                허위 또는 과장된 콘텐츠
              </label>
              <label className="block mt-2">
                <input
                  type="radio"
                  name="reportOption"
                  value="저작권 및 지적재산권 침해"
                  checked={selectedOption === '저작권 및 지적재산권 침해'}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                저작권 및 지적재산권 침해
              </label>
              <label className="block mt-2">
                <input
                  type="radio"
                  name="reportOption"
                  value="불쾌하거나 부적절한 내용"
                  checked={selectedOption === '불쾌하거나 부적절한 내용'}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                불쾌하거나 부적절한 내용
              </label>
              <label className="block mt-2">
                <input
                  type="radio"
                  name="reportOption"
                  value="기타"
                  checked={selectedOption === '기타'}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                기타
              </label>
            </div>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-end gap-4 mt-6 px-8 mb-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100">
            취소
          </button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
