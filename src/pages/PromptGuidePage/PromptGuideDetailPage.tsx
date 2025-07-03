/**
 * TODO:
 * - type에 따라 TIP/공지사항 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

interface PromptGuideDetailPageProps {
  type: 'tip' | 'notice';
}

const PromptGuideDetailPage = ({ type }: PromptGuideDetailPageProps) => {
  return (
    <>
      <div>프롬프트 TIP - 게시물 페이지, 공지사항 - 게시물 페이지</div>
      <p>{type}상세 페이지</p>
    </>
  );
};

export default PromptGuideDetailPage;
