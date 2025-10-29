import React, { useState } from 'react';

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
  },
  {
    id: 2,
    name: '이미지 생성',
    subcategories: ['일러스트', '로고', '포스터/배너', '캐릭터 디자인', '사진 리터칭'],
  },
  {
    id: 3,
    name: '대본/스토리보드',
    subcategories: ['숏폼 스크립트', '광고 영상 콘셉트', '애니메이션 장면', '스토리보드'],
  },
  {
    id: 4,
    name: '코딩/개발',
    subcategories: ['코드 자동화', '디버깅/리팩토링', 'API 설계', 'SQL 쿼리', '테스트 케이스'],
  },
  {
    id: 5,
    name: '비즈니스/마케팅',
    subcategories: ['마케팅 캠페인 기획', 'SNS 콘텐츠 아이디어', '시장조사/분석', '이메일/세일즈 카피'],
  },
  {
    id: 6,
    name: '학습/과제',
    subcategories: ['학습/과제 요약', '문제 풀이', '개념 설명', '외국어 학습'],
  },
  {
    id: 7,
    name: '생활/엔터테인먼트',
    subcategories: ['여행/일정', '요리/레시피', '게임/시나리오', '퀴즈/심리테스트', '상담'],
  },
  {
    id: 8,
    name: '음악/오디오',
    subcategories: ['배경음악', '사운드 이펙트', '작곡/편곡 보조', '나레이션/보이스'],
  },
  {
    id: 9,
    name: '아이디어',
    subcategories: ['아이디에이션', '브레인스토밍', '비즈니스 아이디어'],
  },
];

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <div className="w-full max-w-[1185px] mx-auto flex flex-wrap gap-[20px] justify-center">
        {categoryData.map((category) => (
          <div className="flex flex-col" key={category.id}>
            <div
              onClick={() => handleSelectCategory(category.id)}
              className="w-28 px-2 py-3 rounded-xl inline-flex flex-col justify-center items-center gap-4 cursor-pointer">
              <div className="w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
                <img src="" alt={category.name} className="object-cover w-full h-full" />
              </div>
              <div className="text-center text-xs font-light leading-4">{category.name}</div>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory !== null && (
        <div className="w-[1237px] h-[62px] inline-flex justify-start itmes-start gap-10">
          <div className="text-center justify-center text-text-on-white text-2xl">
            {categoryData.find((cat) => cat.id === selectedCategory)?.name}
          </div>
          {categoryData
            .find((cat) => cat.id === selectedCategory)
            ?.subcategories.map((subcategory) => (
              <div
                key={subcategory}
                className="inline-flex justify-start items-center gap-5 text-text-on-background text-base text-center leading-6">
                {subcategory}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
