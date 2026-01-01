import unread from '@/assets/icon-unread.svg';
import { Link } from 'react-router-dom';

interface Complaint {
  report_id: number;
  prompt_id: number;
  prompt_title: string;
  reporter_id: number;
  reporter_nickname: string;
  created_at: string;
  is_read: 'true' | 'false';
}

interface ComplaintCardProps {
  complaint: Complaint;
}

const ComplaintCard = ({ complaint }: ComplaintCardProps) => {
  const [date, timePart] = complaint.created_at.split('T');
  // - 부분을 ". " 으로 변경
  const codate = date.replace(/-/g, '. ');
  const Time = timePart ? timePart.substring(0, 5) : '';
  // codate와 time 합치기
  const displayTime = `${codate}. ${Time}`;
  return (
    <div className="flex flex-col w-full py-[20px] px-[24px] bg-white text-[20px] font-medium text-black">
      <div className="custom-body3 text-gray-400 mb-[8px]">{displayTime}</div>
      <div className="flex gap-[12px] mb-[12px] items-center">
        {complaint.is_read === 'true' ? <img src={unread} alt="unread" className="w-[20px] h-[20px]" /> : null}
        <Link to={`/admin/complaint/${complaint.report_id}`} className="flex items-center w-[678px] min-w-0">
          <div className=" block truncate custom-button1">{complaint.prompt_title}</div>
        </Link>
      </div>
      <div className="flex gap-[8px] mb-[4px]">
        <div className="flex items-center custom-button2">신고자 닉네임: </div>
        <div className="flex items-center custom-body3">{complaint.reporter_nickname}</div>
      </div>
      <div className="flex gap-[8px]">
        <div className="flex items-center custom-button2">사유: </div>
        <div className="flex items-center custom-body3">저작권 및 지적재산권 침해</div>
      </div>
    </div>
  );
};
export default ComplaintCard;
