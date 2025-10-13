import arrow_left from '../assets/arrow-left.svg';
import arrow_right from '../assets/arrow-right.svg';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageGroupSize = 5; // 한 번에 보여줄 페이지 번호 그룹 크기

  // 현재 페이지가 속한 그룹 계산 (예: 1~5페이지는 1그룹, 6~10페이지는 2그룹)
  const currentGroup = Math.ceil(currentPage / pageGroupSize);

  // 현재 그룹의 마지막 페이지 번호
  let lastPageInGroup = currentGroup * pageGroupSize;

  // 현재 그룹의 첫 페이지 번호
  const firstPageInGroup = lastPageInGroup - (pageGroupSize - 1);

  // 만약 마지막 페이지 번호가 전체 페이지 수보다 크다면, 전체 페이지 수를 마지막으로 설정
  if (lastPageInGroup > totalPages) {
    lastPageInGroup = totalPages;
  }

  const pageNumbers = [];
  for (let i = firstPageInGroup; i <= lastPageInGroup; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center">
      <button
        className="flex items-center justify-center w-[50px] h-[50px]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <img src={arrow_left} alt="Previous" />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-[50px] h-[50px] rounded-[50px] text-[20px] font-medium text-text-on-background ${currentPage === number ? 'bg-primary-hover text-white' : ''}`}>
          {number}
        </button>
      ))}
      <button
        className="flex items-center justify-center w-[50px] h-[50px]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <img src={arrow_right} alt="Next" />
      </button>
    </nav>
  );
};

export default Pagination;
