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
  const displayTime = timePart ? timePart.substring(0, 5) : '';
  return (
    <div className="flex  w-full py-[20px] bg-white border-b-[1px] border-white-stroke text-[20px] font-medium text-text-on-white">
      <div className="flex justify-center w-[72px]">
        {complaint.is_read === 'true' ? <img src={unread} alt="unread" className="w-[20px] h-[20px]" /> : null}
      </div>
      <Link to={`/admin/complaint/${complaint.report_id}`} className="flex items-center w-[678px] min-w-0">
        <div className=" block truncate">{complaint.prompt_title}</div>
      </Link>
      <div className="w-[223px] flex justify-center items-center">{complaint.reporter_nickname}</div>
      <div className="w-[263px] flex justify-center items-center">
        {date} {displayTime}
      </div>
    </div>
  );
};
export default ComplaintCard;
