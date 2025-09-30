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

const AdminComplaintDetailPage = ([complaintDetail]: ComplaintDetailPageProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-[994px]  mx-auto mt-[39px] bg-white ">
      <div className="flex items-center gap-[10px] pl-[20px] pt-[55px]">
        <button className="flex items-center placew-[24px] h-[24px]" onClick={() => navigate(-1)}>
          <img src={back} alt="뒤로가기" />
        </button>
        <div className="text-[24px] font-bold text-text-on-white">신고함</div>
      </div>

      <main className="px-[65px]">
        <section className="">
          <h1>프롬프트 제목</h1>
          <div>
            날짜 신고자 신고사유를 담는 태그
            <p>date</p>
            <p>reporter</p>
            <p>reason</p>
          </div>
        </section>
        <section>description</section>
      </main>

      <footer>
        <button>해당 프롬프트 상세페이지로 이동 버튼</button>
      </footer>
    </div>
  );
};
export default AdminComplaintDetailPage;
