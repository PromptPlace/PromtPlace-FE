import { useNavigate, useParams } from 'react-router-dom';
import back from '@/assets/icon-arrow-right-black.svg';
import useGetComplaintDetail from '@/hooks/queries/AdminPage/useGetComplaintDetail';

interface ComplaintDetail {
  report_id: number;
  prompt_id: number;
  prompt_title: string;
  reporter_id: number;
  reporter_nickname: string;
  reporter_email: string;
  prompt_type: string;
  description: string;
  created_at: string;
  isRead: boolean;
}

interface ComplaintDetailPageProps {
  report_id: number;
}

//더미데이터
const dummyComplaintDetail: ComplaintDetail = {
  report_id: 56,
  prompt_id: 2065,
  prompt_title: '프롬프트 제목프롬프트 제목프프롬프트 제목',
  reporter_id: 12,
  reporter_nickname: '신고자 닉네임1',
  reporter_email: 'reporter1@example.com',
  prompt_type: '물물물',
  description:
    '신고 사유가 여기에 들어갑니다.',
  created_at: '2025-07-27T12:11:02.000Z',
  isRead: false,
};

const AdminComplaintDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const numericReportId = Number(id || 0);
  const { data, isLoading, isError } = useGetComplaintDetail(numericReportId);
  const complaintDetail = data?.data || dummyComplaintDetail;

  const [date, timePart] = complaintDetail.created_at.split('T');
  // - 부분을 ". " 으로 변경
  const codate = date.replace(/-/g, '. ');
  const Time = timePart ? timePart.substring(0, 5) : '';
  // codate와 time 합치기
  const displayTime = `${codate}. ${Time}`;
  return (
    <div className="mx-auto max-w-[1236px]">
      <div className="flex items-center gap-[4px] mt-[64px] mb-[20px]">
        <div className="custom-body2 text-black">신고함</div>
        <button className="flex items-center justify-center w-[16px] h-[16px]" onClick={() => navigate(-1)}>
          <img src={back} alt="뒤로가기" />
        </button>
      </div>
      <div className="max-w-[1236px]  mx-auto mt-[20px] px-[80px] pt-[56px] rounded-[12px] bg-white ">
        <main>
          <section className="py-[30px] border-b-[0.8px] border-gray-200">
            <p className="custom-h4 mb-[12px]">{complaintDetail?.prompt_title}</p>
            <div className="flex gap-[8px] mb-[24px]">
              <div className="flex items-center custom-button2">신고 사유: </div>
              <div className="flex items-center custom-body3">저작권 및 지적재산권 침해</div>
            </div>

            <div className="flex gap-[8px] mb-[32px]">
              <div className="flex items-center custom-body3">신고자 : </div>
              <div className="flex items-center custom-body3 text-gray-500 px-[10px] border-r-[0.8px] border-gray-400">{`${complaintDetail?.reporter_nickname}(${complaintDetail?.reporter_email})`}</div>
              <div className="flex items-center custom-body3">신고일: </div>
              <div className="flex items-center custom-body3 text-gray-500">{displayTime}</div>
            </div>
          </section>
          <section className="pt-[40px] border-b-[0.8px] border-gray-200 text-black custom-body2  h-[425px] overflow-y-auto">
            {complaintDetail?.description}
          </section>
        </main>

        <footer className="pt-[68px] pb-[32px]">
          <button
            className="px-[16px] py-[8px] border-[1px] border-alert rounded-[8px] text-[16px] font-medium text-alert"
            onClick={() => navigate('/prompt/' + complaintDetail?.prompt_id)}>
            이동
          </button>
        </footer>
      </div>
    </div>
  );
};
export default AdminComplaintDetailPage;
