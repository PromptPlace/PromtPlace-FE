import { Link } from 'react-router-dom';
import iconArrow from '@assets/icon-arrow-left-black.svg';

// 컴포넌트가 받을 props 타입 정의
interface ContentHeaderProps {
  date: string;
  title: string;
  linkUrl: string; // 이동할 경로를 props로 받음
  dateFormat?: 'dateOnly' | 'full'
  showArrow?: boolean; // 화살표 아이콘 표시 여부
}

const CardHeader: React.FC<ContentHeaderProps> = ({ date, title, linkUrl, dateFormat = 'dateOnly', showArrow = true }) => {
  // 날짜 포맷 변경 로직
  const [displayDate, timePart] = date.split('T');
  const displayTime = timePart ? timePart.substring(0, 5) : '';

  return (
    // 이 컴포넌트는 항상 부모 너비의 100%를 차지하도록 w-full을 사용
    <div className="flex flex-col w-full gap-[10px]">
      <span className="text-[14px] text-text-on-background">
        {displayDate} {dateFormat === 'full' && ` ${displayTime}`}
      </span>
      <Link to={linkUrl} className="text-[22px] font-bold text-text-on-white flex items-center gap-[10px] w-fit">
        {title}
        {showArrow && <img src={iconArrow} alt="arrow" className="w-[16px] h-[16px] rotate-180" />}
      </Link>
    </div>
  );
};

export default CardHeader;