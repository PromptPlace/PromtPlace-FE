import React, { useEffect, useState } from 'react';
import TagButton from '@/components/Button/TagButton';
import { CATEGORY_DATA } from '@/constants/PromptCreatePage/categoryLabels';
import { MODEL_DATA } from '@/constants/PromptCreatePage/modelLabels';
import type { FilterModalType } from '@/types/PromptCreatePage/filterModal';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModels: string[];
  setSelectedModels: (models: string[]) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
  initialTab?: FilterModalType;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedModels,
  setSelectedModels,
  categories,
  setCategories,
  initialTab = 'model',
}) => {
  const [activeTab, setActiveTab] = useState<FilterModalType>('model');
  const [localSelectedModels, setLocalSelectedModels] = useState<string[]>(selectedModels);
  const [localSelectedCategories, setLocalSelectedCategories] = useState<string[]>(categories);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    setLocalSelectedModels(selectedModels);
    setLocalSelectedCategories(categories);
  }, [selectedModels, categories, isOpen]);

  const handleModelClick = (model: string) => {
    if (localSelectedModels.includes(model)) {
      setLocalSelectedModels(localSelectedModels.filter((m) => m !== model));
    } else {
      if (localSelectedModels.length < 5) {
        setLocalSelectedModels([...localSelectedModels, model]);
      }
    }
  };

  const handleCategoryClick = (item: { value: string }) => {
    if (localSelectedCategories.includes(item.value)) {
      setLocalSelectedCategories(localSelectedCategories.filter((c) => c !== item.value));
    } else if (localSelectedCategories.length < 5) {
      setLocalSelectedCategories([...localSelectedCategories, item.value]);
    }
  };

  const handleConfirm = () => {
    setSelectedModels(localSelectedModels);
    setCategories(localSelectedCategories);
    onClose();
  };

  const handleReset = () => {
    setLocalSelectedModels([]);
    setLocalSelectedCategories([]);
  };

  const isModelDisabled = (model: string) => {
    return !localSelectedModels.includes(model) && localSelectedModels.length >= 5;
  };

  const isCategoryDisabled = (item: { label: string; value: string }) => {
    return !localSelectedCategories.includes(item.value) && localSelectedCategories.length >= 5;
  };

  const isConfirmDisabled = () => {
    if (activeTab === 'model') {
      return localSelectedModels.length === 0;
    } else {
      return localSelectedCategories.length === 0;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(18, 18, 18, 0.4)' }}
      onClick={onClose}>
      <div
        className="bg-white rounded-[16px] w-[392px] h-[664px] flex flex-col p-[32px]"
        onClick={(e) => e.stopPropagation()}>
        {/* 메인 콘텐츠 */}
        <div className="flex flex-col gap-[20px] flex-1 overflow-hidden">
          <div className="border-b border-gray-200 pb-[16px]">
            <h3 className="custom-h4">필터</h3>
          </div>

          {/* 탭 버튼 */}
          <div className="flex gap-[10px] pb-[16px]">
            <button
              className={`w-[99px] h-[30px] py-[6px] px-[12px] rounded-[8px] text-[12px] font-medium transition-all border ${
                activeTab === 'model'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-primary border-primary '
              }`}
              onClick={() => setActiveTab('model')}>
              모델
            </button>
            <button
              className={`w-[99px] h-[30px] py-[6px] px-[12px] rounded-[8px] text-[12px] font-medium transition-all border ${
                activeTab === 'category'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-primary border-primary '
              }`}
              onClick={() => setActiveTab('category')}>
              카테고리
            </button>
          </div>

          {/* 스크롤 가능 영역 */}
          <div className="flex-1 overflow-y-auto">
            {/* 모델 탭 */}
            {activeTab === 'model' && (
              <div className="flex flex-col gap-[16px] mb-[40px]">
                {Object.entries(MODEL_DATA).map(([sectionTitle, models]) => {
                  // 섹션별 너비 설정
                  const sectionWidth = sectionTitle === '이미지 생성 모델' ? '286px' : '260px';

                  return (
                    <div key={sectionTitle} className="flex flex-col gap-[12px]">
                      <h4 className="custom-button2 text-primary">{sectionTitle}</h4>
                      <div className="flex flex-wrap gap-[16px]" style={{ maxWidth: sectionWidth }}>
                        {models.map((model) => (
                          <button
                            key={model}
                            className={`custom-button2 h-[30px] px-[12px] py-[3px] rounded-[50px] transition-all text-center text-primary border border-primary ${
                              localSelectedModels.includes(model) ? 'bg-secondary-pressed' : 'bg-white'
                            } ${isModelDisabled(model) ? ' cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => handleModelClick(model)}
                            disabled={isModelDisabled(model)}>
                            {model}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 카테고리 탭 */}
            {activeTab === 'category' && (
              <div className="flex flex-col gap-[16px] overflow-y-auto mb-[40px]">
                {Object.entries(CATEGORY_DATA).map(([sectionTitle, items]) => (
                  <div key={sectionTitle} className="flex flex-col gap-[12px]">
                    <h4 className="custom-button2 text-primary">{sectionTitle}</h4>

                    <div className="flex flex-wrap gap-[16px]">
                      {items.map((item) => {
                        const isSelected = localSelectedCategories.includes(item.value);
                        const isDisabled = isCategoryDisabled(item);

                        return (
                          <span
                            key={item.value}
                            className={`rounded-[50px] border-primary border-[0.8px]`}
                            onClick={() => !isDisabled && handleCategoryClick(item)}>
                            <TagButton
                              hasActive={!isSelected}
                              text={item.label}
                              onClick={() => !isDisabled && handleCategoryClick(item)}
                              className={`${isDisabled ? '!cursor-not-allowed' : 'cursor-pointer'}`}
                            />
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="h-[77px] flex gap-[20px] pt-[30px] border-t border-gray-200">
            <button
              className="flex-1 py-[10px] rounded-[12px] bg-white text-gray-700 border border-gray-400 transition-all text-custom-button1"
              onClick={handleReset}>
              선택 초기화
            </button>
            <button
              className={`flex-1 py-[10px] rounded-[12px] transition-all text-custom-button1 ${
                isConfirmDisabled() ? 'bg-primary text-white opacity-40 cursor-not-allowed' : 'bg-primary text-white'
              }`}
              onClick={handleConfirm}
              disabled={isConfirmDisabled()}>
              선택 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
