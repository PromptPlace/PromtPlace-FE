function formatDate(date: Date | string) {
  const parsedDate = date instanceof Date ? date : new Date(date); // Date 객체 생성

  const month = parsedDate.getMonth() + 1; // 월
  const day = parsedDate.getDate(); // 일

  return `${month}월 ${day}일`;
}

export default formatDate;
