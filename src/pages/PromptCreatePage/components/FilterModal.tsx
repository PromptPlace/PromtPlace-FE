import React, { useEffect, useState } from 'react';
import TagButton from '@/components/Button/TagButton';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModels: string[];
  setSelectedModels: (models: string[]) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
  initialTab?: 'model' | 'category';
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
  const [activeTab, setActiveTab] = useState<'model' | 'category'>('model');
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

  // 섹션 타이틀 매핑
  const sectionTitleMapping: Record<string, string> = {
    '글쓰기/문서 작성': '글쓰기•문서작성',
    '대본/스토리보드': '대본•스토리보드',
    '비즈니스/마케팅': '비즈니스•마케팅',
    '생활/엔터테인먼트': '생활•엔터테인먼트',
    아이디어: '아이디어',
    '음악/오디오': '음악•오디오',
    '이미지 생성': '이미지 생성',
    '코딩/개발': '코딩•개발',
    '학습/과제': '학습•과제',
  };

  // API 응답 기반 모델 데이터
  const modelData = {
    '언어모델(LLM)': ['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Grok', 'DeepSeek'],
    '이미지 생성 모델': ['DALL-E', 'Nano Banana', 'Midjourney', 'Stable Diffusion'],
    '동영상 생성 모델': ['Kling AI', 'Veo', 'Sora', 'Runway', 'Luma Dream Machine'],
  };

  // 카테고리 데이터 (label: 화면 표시, value: DB 저장 값)
  const categoryDataDB = {
    '글쓰기/문서 작성': [
      { label: '보고서•레포트', value: '보고서 / 레포트' },
      { label: '사업계획서•기획안', value: '사업계획서 / 기획안' },
      { label: '논문•학술자료', value: '논문 / 학술자료' },
      { label: '자기소개서•이력서', value: '자기소개서 / 이력서' },
      { label: '광고•카피라이팅', value: '광고 / 카피라이팅' },
      { label: '시•소설', value: '시 / 소설' },
    ],
    '대본/스토리보드': [
      { label: '숏폼 스크립트', value: '숏폼 스크립트' },
      { label: '광고 영상 콘셉트', value: '광고 영상 콘셉트' },
      { label: '애니메이션 장면', value: '애니메이션 장면' },
      { label: '스토리보드', value: '스토리보드' },
    ],
    '비즈니스/마케팅': [
      { label: '마케팅 캠페인 기획', value: '마케팅 캠페인 기획' },
      { label: 'SNS 콘텐츠 아이디어', value: 'SNS 콘텐츠 아이디어' },
      { label: '시장조사•분석', value: '시장조사/분석' },
      { label: '이메일•세일즈 카피', value: '이메일/세일즈 카피' },
    ],
    '생활/엔터테인먼트': [
      { label: '여행•일정', value: '여행 / 일정' },
      { label: '요리•레시피', value: '요리 / 레시피' },
      { label: '게임•시나리오', value: '게임 / 시나리오' },
      { label: '퀴즈•심리테스트', value: '취미 / 심리테스트' },
      { label: '상담', value: '상담' },
    ],
    아이디어: [
      { label: '아이데이션', value: '아이데이션' },
      { label: '브레인스토밍', value: '브레인스토밍' },
      { label: '비즈니스 아이디어', value: '비즈니스 아이디어' },
    ],
    '음악/오디오': [
      { label: '배경음악', value: '배경음악' },
      { label: '사운드 이펙트', value: '사운드 이펙트' },
      { label: '작곡•편곡 보조', value: '작곡/편곡 보조' },
      { label: '나레이션•보이스', value: '나레이션/보이스' },
    ],
    '이미지 생성': [
      { label: '일러스트', value: '일러스트' },
      { label: '로고', value: '로고' },
      { label: '포스터•배너', value: '포스터 / 배너' },
      { label: '캐릭터 디자인', value: '캐릭터 디자인' },
      { label: '사진 리터칭', value: '사진 리터칭' },
    ],
    '코딩/개발': [
      { label: '코드 자동화', value: '코드 자동화' },
      { label: '디버깅•리팩토링', value: '디버깅/리팩토링' },
      { label: 'API 설계', value: 'API 설계' },
      { label: 'SQL 쿼리', value: 'SQL 쿼리' },
      { label: '테스트 케이스', value: '테스트 케이스' },
    ],
    '학습/과제': [
      { label: '학습•과제 요약', value: '학습 / 과제 요약' },
      { label: '문제 풀이', value: '문제 풀이' },
      { label: '개념 설명', value: '개념 설명' },
      { label: '외국어 학습', value: '외국어 학습' },
    ],
  };

  const handleModelClick = (model: string) => {
    if (localSelectedModels.includes(model)) {
      setLocalSelectedModels(localSelectedModels.filter((m) => m !== model));
    } else {
      if (localSelectedModels.length < 5) {
        setLocalSelectedModels([...localSelectedModels, model]);
      }
    }
  };

  const handleCategoryClick = (item: { label: string; value: string }) => {
    const categoryDbValue = item.value;

    if (localSelectedCategories.includes(categoryDbValue)) {
      setLocalSelectedCategories(localSelectedCategories.filter((c) => c !== categoryDbValue));
    } else {
      if (localSelectedCategories.length < 5) {
        setLocalSelectedCategories([...localSelectedCategories, categoryDbValue]);
      }
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
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-[40px] border-b border-gray-200">
            <h3 className="text-[18px] font-medium mb-4">필터</h3>
          </div>

          {/* 탭 버튼 */}
          <div className="h-[46px] flex gap-[10px] mt-[20px] mb-[20px]">
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
                {Object.entries(modelData).map(([sectionTitle, models]) => {
                  // 섹션별 너비 설정
                  const sectionWidth = sectionTitle === '이미지 생성 모델' ? '286px' : '260px';

                  return (
                    <div key={sectionTitle}>
                      <h4 className="text-[12px] font-medium text-primary mb-[12px]">{sectionTitle}</h4>
                      <div className="flex flex-wrap gap-[16px]" style={{ maxWidth: sectionWidth }}>
                        {models.map((model) => (
                          <button
                            key={model}
                            className={`h-[30px] px-[12px] py-[3px] rounded-[16px] text-[12px] font-medium transition-all text-center ${
                              localSelectedModels.includes(model)
                                ? 'bg-secondary-pressed text-primary border border-primary'
                                : 'bg-white text-primary border border-primary hover:bg-blue-50'
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
              <div className="flex flex-col gap-[16px]  overflow-y-auto mb-[40px]">
                {Object.entries(categoryDataDB).map(([sectionTitle, items]) => (
                  <div key={sectionTitle}>
                    <h4 className="text-[12px] font-medium text-primary mb-[12px]">
                      {sectionTitleMapping[sectionTitle] || sectionTitle}
                    </h4>
                    <div className="flex flex-wrap gap-[16px]">
                      {items.map((item) => {
                        const isSelected = localSelectedCategories.includes(item.value);
                        const isDisabled = isCategoryDisabled(item);

                        return (
                          <span
                            key={item.value}
                            className={`${isDisabled ? '' : ''} ${
                              isSelected ? 'rounded-[50px] border-primary border-[0.8px]' : ''
                            }`}
                            onClick={() => !isDisabled && handleCategoryClick(item)}>
                            <TagButton
                              hasActive={!isSelected}
                              text={item.label}
                              onClick={() => !isDisabled && handleCategoryClick(item)}
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
              className="flex-1 py-[10px]  rounded-[16px] text-[16px] font-medium bg-white text-gray-700 border border-gray-400  transition-all"
              onClick={handleReset}>
              선택 초기화
            </button>
            <button
              className={`flex-1 py-[10px]  rounded-[16px] text-[16px] font-medium transition-all ${
                isConfirmDisabled() ? 'bg-primary text-white opacity-40 cursor-not-allowed' : 'bg-primary text-white '
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
