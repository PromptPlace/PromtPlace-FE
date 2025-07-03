/**
 * TODO:
 * - type에 따라 TIP/공지사항 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

interface PromptGuidePageProps {
  type: 'tip' | 'notice';
}

const PromptGuidePage = ({ type }: PromptGuidePageProps) => {
  return (
    <>
      <div>프롬프트 TIP & 프롬프트 TIP-공지사항 페이지</div>
      <p>{type}페이지</p>
    </>
  );
};

export default PromptGuidePage;
