import { Link } from 'react-router-dom';

// 컴포넌트가 받을 props 타입 정의
interface ContentHeaderProps {
  date: string;
  title: string;
  linkUrl: string; // 이동할 경로를 props로 받음
  dateFormat?: 'dateOnly' | 'full';
  showArrow?: boolean; // 화살표 아이콘 표시 여부
  showDateOnMobile?: boolean;
}

const CardHeader: React.FC<ContentHeaderProps> = ({
  date,
  title,
  linkUrl,
  dateFormat = 'dateOnly',
  showDateOnMobile = true,
}) => {
  // 날짜 포맷 변경 로직
  const [displayDate, timePart] = date.split('T');
  const displayTime = timePart ? timePart.substring(0, 5) : '';

  return (
    <div className="flex flex-col w-full gap-[10px] max-lg:gap-[6px]">
      <span
        className={`text-[14px] max-lg:text-[8px] max-lg:font-normal text-text-on-background ${!showDateOnMobile ? 'max-lg:hidden' : ''}`}>
        {displayDate} {dateFormat === 'full' && ` ${displayTime}`}
      </span>
      <Link to={linkUrl} className="truncate text-[22px] font-bold text-text-on-white  max-lg:text-[12px]">
        {title}
      </Link>
    </div>
  );
};

export default CardHeader;
