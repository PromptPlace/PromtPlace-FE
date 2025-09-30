import { useNavigate } from 'react-router-dom';
import back from '@/assets/icon-arrow-left-black.svg';

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
  complaintDetail: ComplaintDetail;
}

const AdminComplaintDetailPage = ({complaintDetail}: ComplaintDetailPageProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-[994px]  mx-auto mt-[39px] bg-white ">
      <div className="flex items-center gap-[10px] pl-[20px] pt-[55px]">
        <button className="flex items-center placew-[24px] h-[24px]" onClick={() => navigate(-1)}>
          <img src={back} alt="뒤로가기" />
        </button>
        <div className="text-[24px] font-bold text-text-on-white">신고함</div>
      </div>

      <main>
        <section className="py-[30px] border-b-[1px] border-white-stroke">
          <h1 className="text-[32px] font-bold px-[65px]">프롬프트 제목</h1>
          <div className="flex flex-col text-[20px] font-medium text-text-on-background gap-[19px] px-[65px]">
            <div className="flex gap-[94px] py-[9px]">
            <p>date</p>
            <p>신고자:</p>
            </div>
            <p>사유:</p>
          </div>
        </section>
        <section className="py-[30px] border-b-[1px] border-white-stroke  h-[425px] overflow-y-auto px-[65px]">description</section>
      </main>

      <footer className="py-[40px] pl-[65px]">
        <button className="px-[20px] py-[10px] border-[1px] border-alert rounded-[10px] text-[20px] font-medium text-alert ">이동</button>
      </footer>
    </div>
  );
};
export default AdminComplaintDetailPage;
