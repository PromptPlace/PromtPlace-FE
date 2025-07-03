/**
 * TODO:
 * - type에 따라 메시지함 / 알림 렌더링 분기 처리 필요
 *
 * @author 김진효
 * **/

interface MyMessageDetailPageProps {
  type: 'message' | 'notification';
}

const MyMessageDetailPage = ({ type }: MyMessageDetailPageProps) => {
  return (
    <>
      <div>마이페이지 - 메시지함 & 알림 상세 페이지</div>
      <div>{type} 상세 페이지</div>
    </>
  );
};

export default MyMessageDetailPage;
