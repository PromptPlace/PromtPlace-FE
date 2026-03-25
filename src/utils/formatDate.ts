const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(date: Date | string) {
  const parsedDate = date instanceof Date ? date : new Date(date); // Date 객체 생성

  const year = parsedDate.getFullYear(); //년
  const month = parsedDate.getMonth() + 1; // 월
  const day = parsedDate.getDate(); // 일
  const dayOfWeek = DAYS[parsedDate.getDay()]; // 요일

  return { year, month, day, dayOfWeek };
}

export default formatDate;
