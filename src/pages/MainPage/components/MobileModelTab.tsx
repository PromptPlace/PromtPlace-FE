import React from 'react';

type Props = {
  selectedModels: string[]; // ✅ 배열로 변경
  setSelectedModels: (models: string[]) => void;
};

const modelList = ['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Midjourney', '기타'];

const MobileModelTab = ({ selectedModels, setSelectedModels }: Props) => {
  const toggleModel = (model: string) => {
    if (selectedModels.includes(model)) {
      // 이미 선택되어 있으면 제거
      setSelectedModels(selectedModels.filter((m) => m !== model));
    } else {
      // 선택되어 있지 않으면 추가
      setSelectedModels([...selectedModels, model]);
    }
  };

  return (
    <>
      {modelList
        .reduce((rows: string[][], label, i) => {
          const rowIndex = Math.floor(i / 2);
          if (!rows[rowIndex]) rows[rowIndex] = [];
          rows[rowIndex].push(label);
          return rows;
        }, [])
        .map((row, idx) => (
          <div key={idx} className="flex gap-5">
            {row.map((label) => (
              <button
                key={label}
                onClick={() => toggleModel(label)}
                className={`w-32 px-4 py-2 rounded ${
                  selectedModels.includes(label)
                    ? 'bg-secondary text-primary'
                    : 'bg-white border border-gray-300 text-gray-400'
                }`}>
                {label}
              </button>
            ))}
          </div>
        ))}
    </>
  );
};

export default MobileModelTab;
