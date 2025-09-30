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
  report_id: number;
}

//더미데이터
const complaintDetail: ComplaintDetail = {
  report_id: 56,
  prompt_id: 2069,
  prompt_title: '프롬프트 제목프롬프트 제목프프롬프트 제목',
  reporter_id: 12,
  reporter_nickname: '신고자 닉네임1',
  reporter_email: 'reporter1@example.com',
  prompt_type: '물물물',
  description:
    '신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다. 신고 사유가 여기에 들어갑니다.',
  created_at: '2025-07-27T12:11:02.000Z',
  isRead: false,
};

const AdminComplaintDetailPage = ({ report_id }: ComplaintDetailPageProps) => {
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
          <h1 className="text-[32px] font-bold px-[65px]">{complaintDetail.prompt_title}</h1>
          <div className="flex flex-col text-[20px] font-medium text-text-on-background gap-[19px] px-[65px]">
            <div className="flex gap-[94px] py-[9px]">
              <p>{complaintDetail.created_at}</p>
              <p>{complaintDetail.reporter_nickname}:</p>
            </div>
            <p>사유:</p>
          </div>
        </section>
        <section className="py-[30px] border-b-[1px] border-white-stroke  h-[425px] overflow-y-auto   mx-[65px]">
          {complaintDetail.description}
        </section>
      </main>

      <footer className="py-[40px] pl-[65px]">
        <button className="px-[20px] py-[10px] border-[1px] border-alert rounded-[10px] text-[20px] font-medium text-alert ">
          이동
        </button>
      </footer>
    </div>
  );
};
export default AdminComplaintDetailPage;
