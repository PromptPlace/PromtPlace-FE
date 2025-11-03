import React, { useState, useEffect } from 'react';

const categoryData = [
  {
    id: 1,
    name: '글쓰기/문서 작성',
    subcategories: [
      '보고서/레포트',
      '사업계획서/기획안',
      '논문/학술자료',
      '자기소개서/이력서',
      '광고/카피라이팅',
      '시/소설',
    ],
    image: '/src/assets/icon-category-write.svg',
  },
  {
    id: 2,
    name: '이미지 생성',
    subcategories: ['일러스트', '로고', '포스터/배너', '캐릭터 디자인', '사진 리터칭'],
    image: '/src/assets/icon-category-image.svg',
  },
  {
    id: 3,
    name: '대본/스토리보드',
    subcategories: ['숏폼 스크립트', '광고 영상 콘셉트', '애니메이션 장면', '스토리보드'],
    image: '/src/assets/icon-category-script.svg',
  },
  {
    id: 4,
    name: '코딩/개발',
    subcategories: ['코드 자동화', '디버깅/리팩토링', 'API 설계', 'SQL 쿼리', '테스트 케이스'],
    image: '/src/assets/icon-category-develop.svg',
  },
  {
    id: 5,
    name: '비즈니스/마케팅',
    subcategories: ['마케팅 캠페인 기획', 'SNS 콘텐츠 아이디어', '시장조사/분석', '이메일/세일즈 카피'],
    image: '/src/assets/icon-category-marketing.svg',
  },
  {
    id: 6,
    name: '학습/과제',
    subcategories: ['학습/과제 요약', '문제 풀이', '개념 설명', '외국어 학습'],
    image: '/src/assets/icon-category-workbook.svg',
  },
  {
    id: 7,
    name: '생활/엔터테인먼트',
    subcategories: ['여행/일정', '요리/레시피', '게임/시나리오', '퀴즈/심리테스트', '상담'],
    image: '/src/assets/icon-category-game.svg',
  },
  {
    id: 8,
    name: '음악/오디오',
    subcategories: ['배경음악', '사운드 이펙트', '작곡/편곡 보조', '나레이션/보이스'],
    image: '/src/assets/icon-category-music.svg',
  },
  {
    id: 9,
    name: '아이디어',
    subcategories: ['아이디에이션', '브레인스토밍', '비즈니스 아이디어'],
    image: '/src/assets/icon-category-idea.svg',
  },
];

interface CategorySectionProps {
  onCategorySelect?: (categoryId: number | null, categoryName: string | null) => void;
  onSubcategorySelect?: (subcategory: string | null) => void;
  initialCategoryId?: number;
}

const CategorySection = ({
  onCategorySelect,
  onSubcategorySelect,
  initialCategoryId = 1,
}: CategorySectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategoryId);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>('전체');

  // 초기 카테고리 및 서브카테고리
  useEffect(() => {
    if (initialCategoryId !== null) {
      const categoryName = categoryData.find((cat) => cat.id === initialCategoryId)?.name || null;
      onCategorySelect?.(initialCategoryId, categoryName);
      onSubcategorySelect?.('전체'); // 초기 서브카테고리는 "전체"
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  const handleSelectCategory = (categoryId: number) => {
    const newCategoryId = selectedCategory === categoryId ? null : categoryId;
    const categoryName =
      newCategoryId !== null ? categoryData.find((cat) => cat.id === newCategoryId)?.name || null : null;

    setSelectedCategory(newCategoryId);
    setSelectedSubcategory(newCategoryId !== null ? '전체' : null); // 카테고리 선택 시 서브카테고리를 "전체"로
    onCategorySelect?.(newCategoryId, categoryName);
    onSubcategorySelect?.(newCategoryId !== null ? '전체' : null);
  };

  const handleSelectSubcategory = (subcategory: string) => {
    const newSubcategory = selectedSubcategory === subcategory ? '전체' : subcategory;
    setSelectedSubcategory(newSubcategory);
    onSubcategorySelect?.(newSubcategory);
  };

  return (
    <div className="overflow-hidden scroll-m-0">
      <div
        className="w-full max-w-[1185px] mx-auto flex overflow-x-scroll gap-[20px] justify-start snap-x snap-mandatory px-0 hide-scrollbar"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {categoryData.map((category) => (
          <div className="flex flex-col flex-shrink-0 snap-start" key={category.id}>
            <div
              onClick={() => handleSelectCategory(category.id)}
              className={`w-28 px-2 py-3 rounded-xl inline-flex flex-col justify-center items-center gap-4 cursor-pointer transition-all ${
                selectedCategory === category.id ? 'bg-gray-200' : ''
              }`}>
              <div
                className={`w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]`}>
                <img src={category.image} alt={category.name} className="object-cover w-12 h-12" />
              </div>
              <div
                className={`text-center text-xs leading-4 ${
                  selectedCategory === category.id ? 'font-medium' : 'font-light'
                }`}>
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory !== null && (
        <div className="w-[1237px] h-[62px] inline-flex justify-start itmes-start gap-[20px] mt-[56px]">
          <div className="text-center justify-center text-text-on-white text-2xl pr-[20px]">
            {categoryData.find((cat) => cat.id === selectedCategory)?.name}
          </div>
          <div
            onClick={() => handleSelectSubcategory('전체')}
            className={`px-2.5 py-5 inline-flex justify-center items-center gap-2.5 cursor-pointer ${
              selectedSubcategory === '전체' ? 'border-b-[3px] border-primary' : 'border-b-[3px] border-transparent'
            }`}>
            <div
              className={`text-center justify-center text-base font-medium font-['S-Core_Dream'] leading-6 ${
                selectedSubcategory === '전체' ? 'text-primary' : 'text-gray-500'
              }`}>
              전체
            </div>
          </div>
          {categoryData
            .find((cat) => cat.id === selectedCategory)
            ?.subcategories.map((subcategory) => (
              <div
                key={subcategory}
                onClick={() => handleSelectSubcategory(subcategory)}
                className={`px-2.5 py-5 inline-flex justify-center items-center gap-2.5 cursor-pointer ${
                  selectedSubcategory === subcategory
                    ? 'border-b-[3px] border-primary'
                    : 'border-b-[3px] border-transparent'
                }`}>
                <div
                  className={`text-center justify-center text-base font-medium font-['S-Core_Dream'] leading-6 ${
                    selectedSubcategory === subcategory ? 'text-primary' : 'text-gray-500'
                  }`}>
                  {subcategory}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
