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

const Search = () => {
  return (
    <div className="w-full mt-[176px] mx-auto inline-flex flex-col justify-center items-center gap-8">
      <div className="self-stretch flex flex-col justify-center items-center gap-6">
        <div className="self-stretch flex flex-col justify-center items-center gap-5">
          <div className="px-4 py-2 bg-secondary rounded-[50px] inline-flex justify-center items-center gap-2">
            <div className="text-center justify-center text-primary text-xs font-medium font-['S-Core_Dream'] leading-4">
              프롬프트 탐색하기
            </div>
          </div>
          <div className="text-center justify-center text-black text-2xl font-medium font-['S-Core_Dream'] leading-8">
            원하는 프롬프트를 찾아보세요.
          </div>
        </div>
        <div className="w-[708px] px-8 py-5 bg-white rounded-[53.84px] shadow-[1.8210526704788208px_1.8210526704788208px_27.3157901763916px_0px_rgba(41,121,255,0.25)] flex justify-center items-center gap-[570.70px]">
          <div className="flex-1 flex justify-between items-center">
            <div className="justify-start text-text-on-background text-sm font-light font-['S-Core_Dream'] leading-6 tracking-tight">
              원하는 프롬프트를 검색해보세요.
            </div>
            <div className="w-5 h-5 bg-gray-400"></div>
          </div>
        </div>
      </div>
      <div className="inline-flex justify-start items-center gap-3">
        <div className="flex justify-start items-center">
          <div className="text-center justify-center text-text-on-white text-xs font-medium font-['S-Core_Dream'] leading-4">
            추천 카테고리 Top
          </div>
          <div className="w-3 h-5 relative overflow-hidden">
            <div className="left-[-2px] top-[-1.38px] absolute origin-top-left rotate-[-13.81deg] text-center justify-center text-primary-hover text-base font-normal font-['Figma_Hand'] leading-6">
              3
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start gap-5">
          <div className="px-3 py-1.5 bg-secondary rounded-full flex justify-center items-center gap-2">
            <div className="w-4 h-4 relative overflow-hidden">
              <div className="w-3 h-3.5 left-[3px] top-[2.25px] absolute bg-blue-500"></div>
            </div>
            <div className="text-center justify-center text-primary text-xs font-medium font-['S-Core_Dream'] leading-4">
              학습•과제 요약
            </div>
          </div>
          <div className="px-3 py-1.5 bg-secondary rounded-full flex justify-center items-center gap-2">
            <div className="w-4 h-4 relative overflow-hidden">
              <div className="w-3.5 h-3.5 left-[2px] top-[2px] absolute bg-blue-500"></div>
            </div>
            <div className="text-center justify-center text-primary text-xs font-medium font-['S-Core_Dream'] leading-4">
              시장조사•분석
            </div>
          </div>
          <div className="px-3 py-1.5 bg-secondary rounded-full flex justify-center items-center gap-2">
            <div className="w-4 h-4 relative overflow-hidden">
              <div className="w-3 h-3.5 left-[3.19px] top-[1.69px] absolute bg-blue-500"></div>
              <div className="w-[2.77px] h-1 left-[11.81px] top-[1.95px] absolute bg-blue-500"></div>
            </div>
            <div className="text-center justify-center text-blue-500 text-xs font-medium font-['S-Core_Dream'] leading-4">
              광고•카피라이팅
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full max-w-[1185px] mx-auto flex overflow-x-scroll gap-[20px] justify-start snap-x snap-mandatory px-0 hide-scrollbar mt-[84px]"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {categoryData.map((category) => (
          <div className="flex flex-col flex-shrink-0 snap-start" key={category.id}>
            <div className="w-28 px-2 py-3 rounded-xl inline-flex flex-col justify-center items-center gap-4">
              <div className="w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-[0px_4px_8px_0px_rgba(0,0,0,0.12)]">
                <img src={category.image} alt={category.name} className="object-cover w-12 h-12" />
              </div>
              <div className="text-center text-xs leading-4 font-light">{category.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
