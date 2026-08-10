// 사용처: src/pages/AdminPage/components/AdminDashboardComponents/UserVisitDashboard.tsx
// 0~1 사이의 증감율을 퍼센트 표기와 증가/감소 여부로 변환합니다. null이면 비교 불가(전 구간 데이터 없음)로 처리합니다.
export const formatChangeRate = (changeRate: number | null) => {
  if (changeRate === null) return null;

  return {
    percent: `${Math.round(Math.abs(changeRate * 100))}%`,
    isPositive: changeRate >= 0,
  };
};

// 사용처: src/pages/AdminPage/components/AdminDashboardComponents/DailyVisitChartCard.tsx
// 오늘 날짜를 기준으로 YYYY-MM 형식의 이번 달 값을 반환합니다.
export const getCurrentYearMonth = () => {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  return `${now.getFullYear()}-${month}`;
};

// 사용처: src/pages/AdminPage/components/AdminDashboardComponents/PromptDashboard.tsx
// 오늘 날짜를 YYYY-MM-DD 형식(로컬 타임존 기준)으로 반환합니다.
export const getTodayDateString = () => {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

// 사용처: src/pages/AdminPage/components/AdminDashboardComponents/DailyVisitChartCard.tsx, PromptDashboard.tsx
// YYYY-MM-DD 형식의 날짜를 차트 라벨용 M.D 형식으로 변환합니다.
export const formatChartDateLabel = (date: string) => {
  const [, month, day] = date.split('-');
  return `${Number(month)}.${Number(day)}`;
};

// 사용처: src/pages/AdminPage/components/AdminDashboardComponents/DailyVisitChartCard.tsx
// YYYY-MM-DD 형식의 날짜를 X축 라벨용 '일'만 표시하도록 변환합니다(날짜가 많아 M.D 표기 시 겹침 발생).
export const formatChartDayLabel = (date: string) => {
  const [, , day] = date.split('-');
  return `${Number(day)}`;
};

// 사용처: src/pages/AdminPage/components/AdminDashboardComponents/DailyVisitChartCard.tsx
// 이번 달부터 과거 count개월치의 월 선택 드롭다운 옵션을 최신순으로 생성합니다.
export const buildRecentMonthOptions = (count = 12) => {
  const now = new Date();

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return {
      value: `${year}-${`${month}`.padStart(2, '0')}`,
      label: `${year}년 ${month}월`,
    };
  });
};
