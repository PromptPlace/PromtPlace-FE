import unread from 'assets/icons-unread.svg';

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
  return (
    <div className=" w-full bg-white border-b-[1px] border-white-stroke">
      <div className="w-[72px]">{complaint.is_read === 'true' ? <img src={unread} alt="unread" /> : null}</div>
      <div className="max-w-[678px]">{complaint.prompt_title}</div>
      <div className="w-[223px] flex justify-center items-center">{complaint.reporter_nickname}</div>
      <div className="w-[263px] flex justify-center items-center">{complaint.created_at}</div>
    </div>
  );
};
export default ComplaintCard;
