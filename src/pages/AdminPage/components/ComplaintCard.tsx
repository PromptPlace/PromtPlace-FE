import unread from 'assets/icons-unread.svg';

interface ComplaintCardProps {
  report_id: number;
  prompt_id: number;
  prompt_title: string;
  reporter_id: number;
  reporter_nickname: string;
  created_at: string;
  is_read: 'true' | 'false';
}

const ComplaintCard = (props: ComplaintCardProps) => {
  return (
    <div className=" w-full bg-white border-b-[1px] border-white-stroke">
      <div className="w-[72px]">{props.is_read === 'true' ? <img src={unread} alt="unread" /> : null}</div>
      <div className="max-w-[678px]">{props.prompt_title}</div>
      <div className="w-[223px] flex justify-center items-center">{props.reporter_nickname}</div>
      <div className="w-[263px] flex justify-center items-center">{props.created_at}</div>
    </div>
  );
};
export default ComplaintCard;
