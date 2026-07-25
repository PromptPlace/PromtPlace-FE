import DocIcon from '@assets/modal/icon-category_doc.svg';
import ImgIcon from '@assets/modal/icon-category_image.svg';
import ScriptIcon from '@assets/modal/icon-category_script.svg';
import CodeIcon from '@assets/modal/icon-category_code.svg';
import GraphIcon from '@assets/modal/icon-category_graph.svg';
import BookIcon from '@assets/modal/icon-category_book.svg';
import GameIcon from '@assets/modal/icon-category_game.svg';
import AudioIcon from '@assets/modal/icon-category_audio.svg';
import IdeaIcon from '@assets/modal/icon-category_idea.svg';

export interface CategoryOption {
  value: string;
  label: string;
}

export const CATEGORY_DATA: Record<string, CategoryOption[]> = {
  '글쓰기•문서작성': [
    { value: '보고서 / 레포트', label: '보고서•레포트' },
    { value: '사업계획서 / 기획안', label: '사업계획서•기획안' },
    { value: '논문 / 학술자료', label: '논문•학술자료' },
    { value: '자기소개서 / 이력서', label: '자기소개서•이력서' },
    { value: '광고 / 카피라이팅', label: '광고•카피라이팅' },
    { value: '시 / 소설', label: '시•소설' },
  ],

  '이미지 생성': [
    { value: '일러스트', label: '일러스트' },
    { value: '로고', label: '로고' },
    { value: '포스터 / 배너', label: '포스터•배너' },
    { value: '캐릭터 디자인', label: '캐릭터 디자인' },
    { value: '사진 리터칭', label: '사진 리터칭' },
  ],

  '대본•스토리보드': [
    { value: '숏폼 스크립트', label: '숏폼 스크립트' },
    { value: '광고 영상 콘셉트', label: '광고 영상 콘셉트' },
    { value: '애니메이션 장면', label: '애니메이션 장면' },
    { value: '스토리보드', label: '스토리보드' },
  ],

  '코딩•개발': [
    { value: '코드 자동화', label: '코드 자동화' },
    { value: '디버깅/리팩토링', label: '디버깅•리팩토링' },
    { value: 'API 설계', label: 'API 설계' },
    { value: 'SQL 쿼리', label: 'SQL 쿼리' },
    { value: '테스트 케이스', label: '테스트 케이스' },
  ],

  '비즈니스•마케팅': [
    { value: '마케팅 캠페인 기획', label: '마케팅 캠페인 기획' },
    { value: 'SNS 콘텐츠 아이디어', label: 'SNS 콘텐츠 아이디어' },
    { value: '시장조사/분석', label: '시장조사•분석' },
    { value: '이메일/세일즈 카피', label: '이메일•세일즈 카피' },
  ],

  '학습•과제': [
    { value: '학습 / 과제 요약', label: '학습•과제 요약' },
    { value: '문제 풀이', label: '문제 풀이' },
    { value: '개념 설명', label: '개념 설명' },
    { value: '외국어 학습', label: '외국어 학습' },
  ],

  '생활•엔터테인먼트': [
    { value: '여행 / 일정', label: '여행•일정' },
    { value: '요리 / 레시피', label: '요리•레시피' },
    { value: '게임 / 시나리오', label: '게임•시나리오' },
    { value: '취미 / 심리테스트', label: '퀴즈•심리테스트' },
    { value: '상담', label: '상담' },
  ],

  '음악•오디오': [
    { value: '배경음악', label: '배경음악' },
    { value: '사운드 이펙트', label: '사운드 이펙트' },
    { value: '작곡/편곡 보조', label: '작곡•편곡 보조' },
    { value: '나레이션/보이스', label: '나레이션•보이스' },
  ],

  아이디어: [
    { value: '아이데이션', label: '아이데이션' },
    { value: '브레인스토밍', label: '브레인스토밍' },
    { value: '비즈니스 아이디어', label: '비즈니스 아이디어' },
  ],
};

export const CATEGORY_LABELS = Object.fromEntries(
  Object.values(CATEGORY_DATA)
    .flat()
    .map(({ value, label }) => [value, label]),
) as Record<string, string>;

export const CATEGORY_ICONS: Record<string, string> = {
  '글쓰기•문서작성': DocIcon,
  '이미지 생성': ImgIcon,
  '대본•스토리보드': ScriptIcon,
  '코딩•개발': CodeIcon,
  '비즈니스•마케팅': GraphIcon,
  '학습•과제': BookIcon,
  '생활•엔터테인먼트': GameIcon,
  '음악•오디오': AudioIcon,
  아이디어: IdeaIcon,
};

export const CATEGORY_ICON_BY_LABEL: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_DATA).flatMap(([section, items]) => {
    return [[section, CATEGORY_ICONS[section]], ...items.map(({ label }) => [label, CATEGORY_ICONS[section]])];
  }),
);
