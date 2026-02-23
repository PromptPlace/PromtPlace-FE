import React, { useState } from 'react';

interface ModelModalProps {
  selectedModels: string[];
  onConfirm: (models: string[]) => void;
}

const ModelModal = ({ selectedModels: initialSelectedModels, onConfirm }: ModelModalProps) => {
  const [selectedModels, setSelectedModels] = useState<string[]>(initialSelectedModels);

  const modelData = {
    '언어모델(LLM)': ['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'Grok', 'DeepSeek'],
    '이미지 생성 모델': ['DALL-E', 'Nano Banana', 'Midjourney', 'Stable Diffusion'],
    '동영상 생성 모델': ['Kling AI', 'Veo', 'Sora', 'Runway', 'Luma Dream Machine'],
    '음악 생성 모델': ['Suno', 'Udio'],
  };

  const toggleSelect = (model: string) => {
    setSelectedModels((prev) => (prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]));
  };

  const resetSelection = () => setSelectedModels([]);
  const confirmSelection = () => {
    onConfirm(selectedModels);
  };

  return (
    <div className="w-96 p-8 bg-white rounded-2xl shadow-[2px_2px_30px_0px_rgba(0,0,0,0.25)] outline-1 outline-offset-[-1px] outline-gray-300 inline-flex flex-col justify-center items-center gap-6 overflow-hidden">
      {/* 상단 타이틀 */}
      <div className="pb-4 border-b-[0.88px] border-gray-200 inline-flex gap-2.5 w-full">
        <div className="self-stretch justify-center text-lg text-text-on-white leading-6">모델</div>
      </div>

      {/* 섹션 반복 */}
      <div className="w-full flex flex-col gap-6">
        {Object.entries(modelData).map(([category, models]) => (
          <div key={category} className="flex flex-col gap-2">
            <div className="text-xs text-primary">{category}</div>
            <div className="flex flex-wrap gap-[16px]">
              {models.map((model) => (
                <button
                  key={model}
                  onClick={() => toggleSelect(model)}
                  className={`px-3 py-1.5 rounded-[50px] outline-[0.80px] outline-offset-[-0.80px] inline-flex justify-center items-center gap-2 transition
                    ${
                      selectedModels.includes(model)
                        ? 'bg-primary text-white outline-primary'
                        : 'bg-white text-primary outline-primary'
                    }`}>
                  <span className="text-center text-xs font-medium font-['S-Core_Dream'] leading-4">{model}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="w-full flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={resetSelection}
          className="px-4 py-2 rounded-lg text-gray-500 text-sm font-medium hover:bg-gray-100 transition">
          선택 초기화
        </button>
        <button
          onClick={confirmSelection}
          className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition">
          선택 완료
        </button>
      </div>
    </div>
  );
};

export default ModelModal;
