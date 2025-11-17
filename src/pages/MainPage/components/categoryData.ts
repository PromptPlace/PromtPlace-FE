import write from '@assets/icon-category-write.svg';
import image from '@assets/icon-category-image.svg';
import script from '@assets/icon-category-script.svg';
import develop from '@assets/icon-category-develop.svg';
import marketing from '@assets/icon-category-marketing.svg';
import workbook from '@assets/icon-category-workbook.svg';
import game from '@assets/icon-category-game.svg';
import music from '@assets/icon-category-music.svg';
import idea from '@assets/icon-category-idea.svg';

export const categoryData = [
  {
    id: 1,
    name: '글쓰기 / 문서 작성',
    displayName: '글쓰기 • 문서 작성',
    displaySubcategories: [
      '보고서 • 레포트',
      '사업계획서 • 기획안',
      '논문 • 학술자료',
      '광고 • 카피라이팅',
      '시 • 소설',
      '자기소개서 • 이력서',
    ],
    subcategories: [
      '보고서 / 레포트',
      '사업계획서 / 기획안',
      '논문 / 학술자료',
      '광고 / 카피라이팅',
      '시 / 소설',
      '자기소개서 / 이력서',
    ],
    image: write,
  },
  {
    id: 2,
    name: '이미지 생성',
    displayName: '이미지 생성',
    displaySubcategories: ['일러스트', '로고', '포스터 • 배너', '캐릭터 디자인', '사진 리터칭'],
    subcategories: ['일러스트', '로고', '포스터 / 배너', '캐릭터 디자인', '사진 리터칭'],
    image: image,
  },
  {
    id: 3,
    name: '대본 / 스토리보드',
    displayName: '대본 • 스토리보드',
    displaySubcategories: ['숏폼 스크립트', '광고 영상 콘셉트', '애니메이션 장면', '스토리보드'],
    subcategories: ['숏폼 스크립트', '광고 영상 콘셉트', '애니메이션 장면', '스토리보드'],
    image: script,
  },
  {
    id: 4,
    name: '코딩 / 개발',
    displayName: '코딩 • 개발',
    displaySubcategories: ['코드 자동화', '디버깅 • 리팩토링', 'API 설계', 'SQL 쿼리', '테스트 케이스'],
    subcategories: ['코드 자동화', '디버깅/리팩토링', 'API 설계', 'SQL 쿼리', '테스트 케이스'],
    image: develop,
  },
  {
    id: 5,
    name: '비즈니스 / 마케팅',
    displayName: '비즈니스 • 마케팅',
    displaySubcategories: ['마케팅 캠페인 기획', 'SNS 콘텐츠 아이디어', '시장조사 • 분석', '이메일 • 세일즈 카피'],
    subcategories: ['마케팅 캠페인 기획', 'SNS 콘텐츠 아이디어', '시장조사/분석', '이메일 / 세일즈 카피'],
    image: marketing,
  },
  {
    id: 6,
    name: '학습 / 과제',
    displayName: '학습 • 과제',
    displaySubcategories: ['학습 • 과제 요약', '문제 풀이', '개념 • 설명', '외국어 학습'],
    subcategories: ['학습 / 과제 요약', '문제 풀이', '개념 설명', '외국어 학습'],
    image: workbook,
  },
  {
    id: 7,
    name: '생활 / 엔터테인먼트',
    displayName: '생활 • 엔터테인먼트',
    displaySubcategories: ['여행 • 일정', '요리 • 레시피', '게임 • 시나리오', '퀴즈 • 심리테스트', '상담'],
    subcategories: ['여행 / 일정', '요리 / 레시피', '게임 / 시나리오', '퀴즈 / 심리테스트', '상담'],
    image: game,
  },
  {
    id: 8,
    name: '음악 / 오디오',
    displayName: '음악 • 오디오',
    displaySubcategories: ['배경음악', '사운드 이펙트', '작곡 • 편곡 보조', '나레이션 • 보이스'],
    subcategories: ['배경음악', '사운드 이펙트', '작곡/편곡 보조', '나레이션 / 보이스'],
    image: music,
  },
  {
    id: 9,
    name: '아이디어',
    displayName: '아이디어',
    displaySubcategories: ['아이데이션', '브레인스토밍', '비즈니스 아이디어'],
    subcategories: ['아이데이션', '브레인스토밍', '비즈니스 아이디어'],
    image: idea,
  },
];
