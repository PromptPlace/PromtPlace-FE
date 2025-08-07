import { useParams } from 'react-router-dom';

const PromptEditPage = () => {
  const { id: promptId } = useParams<{ id: string }>();

  return <div>PromptEditPage : {promptId}번째 게시글 수정중...</div>;
};

export default PromptEditPage;
