import CancelIcon from '@assets/modal/icon-cancel_primary-12px.svg?react';
import clsx from 'clsx';

import DocIcon from '@assets/modal/icon-category_doc.svg';
import ImgIcon from '@assets/modal/icon-category_image.svg';
import ScriptIcon from '@assets/modal/icon-category_script.svg';
import CodeIcon from '@assets/modal/icon-category_code.svg';
import GraphIcon from '@assets/modal/icon-category_graph.svg';
import BookIcon from '@assets/modal/icon-category_book.svg';
import GameIcon from '@assets/modal/icon-category_game.svg';
import AudioIcon from '@assets/modal/icon-category_audio.svg';
import IdeaIcon from '@assets/modal/icon-category_idea.svg';

/**
 * 태그가 달린 버튼 및 카테고리에서 사용하는 버튼 컴포넌트입니다.
 *
 * @param {boolean} hasDelete -- 삭제 버튼 여부
 * 지우는 버튼이 있는 경우에는 true로 넘기면 됩니다.
 * @param {string} text -- 버튼 내용
 * 버튼 내용에 맞게 이미지가 선택됩니다.
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 *
 * @example
 * <TagButton hasDelete={false} text="글쓰기•문서작성" onClick={() => {}} />
 *
 * @author 김진효
 * **/

interface TagButtonProps {
  hasDelete: boolean;
  text: string;
  onClick?: () => void;
}

const TagButton = ({ hasDelete, text, onClick }: TagButtonProps) => {
  const DocList = [
    '글쓰기•문서작성',
    '보고서•레포트',
    '사업계획서•기획안',
    '자기소개서•이력서',
    '광고•카피라이팅',
    '시•소설',
  ];
  const ImgList = ['이미지 생성', '일러스트', '로고', '포스터•배너', '캐릭터 디자인', '사진 리터칭'];
  const ScriptList = ['대본•스토리보드', '숏폼 스크립트', '광고 영상 콘셉트', '애니메이션 장면', '스토리보드'];
  const CodeList = ['코딩•개발', '코드 자동화', '디버깅•리팩토링', 'API 설계', 'SQL 쿼리', '테스트 케이스'];
  const GraphList = [
    '비즈니스•마케팅',
    '마케팅 캠페인 기획',
    'SNS 콘텐츠 아이디어',
    '시장조사•분석',
    '이메일•세일즈 카피',
  ];
  const BookList = ['학습•과제', '학습•과제 요약', '문제 풀이', '개념 설명', '외국어 학습'];
  const GameList = ['생활•엔터테인먼트', '여행•일정', '요리•레시피', '게임•시나리오', '퀴즈•심리테스트', '상담'];
  const AudioList = ['음악•오디오', '배경음악', '사운드 이펙트', '작곡•편곡 보조', '나레이션•보이스'];
  const IdeaList = ['아이디어', '아이데이션', '브레인스토밍', '비즈니스 아이디어'];

  const getListType = (text: string) => {
    if (DocList.includes(text)) return DocIcon;
    if (ImgList.includes(text)) return ImgIcon;
    if (ScriptList.includes(text)) return ScriptIcon;
    if (CodeList.includes(text)) return CodeIcon;
    if (GraphList.includes(text)) return GraphIcon;
    if (BookList.includes(text)) return BookIcon;
    if (GameList.includes(text)) return GameIcon;
    if (AudioList.includes(text)) return AudioIcon;
    if (IdeaList.includes(text)) return IdeaIcon;
    return null;
  };

  const icon = getListType(text);

  return (
    <div
      className={clsx(
        'custom-button2 py-[6px] px-[12px] flex justify-center items-center gap-[8px] rounded-[50px] whitespace-nowrap text-primary bg-secondary shrink-0',
        !hasDelete && 'max-lg:border-none',
      )}>
      {icon && <img src={icon} alt="이미지" />}
      {text}
      {hasDelete && (
        <div className="cursor-pointer">
          <CancelIcon onClick={onClick} className="w-full h-full text-primary" />
        </div>
      )}
    </div>
  );
};

export default TagButton;
