export type sellerProps = {
  hasImage: boolean;
  image: string;
  nickname: string;
  name: string;
  email: string;
  bank: string;
  account: string;
  isBusiness: boolean;
  isWaiting: boolean;
  isCompany: boolean;
};

export type promptRankingProps = {
  rank: number;
  title: string;
  views: number;
  downloads: number;
};

export type promptSalesRankingProps = {
  rank: number;
  title: string | null;
  totalSales: number;
};

export interface SignupChannelStat {
  count: number;
  ratio: number;
}

export interface MemberSignupStatsData {
  total_members: number;
  by_signup_channel: {
    email: SignupChannelStat;
    google: SignupChannelStat;
    kakao: SignupChannelStat;
    naver: SignupChannelStat;
  };
}

export interface MemberSignupStatsResponse {
  message: string;
  statusCode: number;
  data: MemberSignupStatsData;
}

export interface ActiveUserStatsData {
  window_days: number;
  current_count: number;
  previous_count: number;
  change_rate: number | null;
}

export interface ActiveUserStatsResponse {
  message: string;
  statusCode: number;
  data: ActiveUserStatsData;
}

export interface MonthlyDailyVisitorItem {
  date: string;
  count: number;
}

export interface VisitorStatsData {
  daily_count: number;
  window_days: number;
  current_count: number;
  previous_count: number;
  change_rate: number | null;
  month?: string;
  month_total?: number;
  month_daily?: MonthlyDailyVisitorItem[];
}

export interface VisitorStatsResponse {
  message: string;
  statusCode: number;
  data: VisitorStatsData;
}

export interface VisitorStatsRequestParams {
  month?: string;
}

export interface DailyUploadItem {
  date: string;
  count: number;
}

export interface NewPromptStatsData {
  daily_count: number;
  weekly_count: number;
  daily_uploads: DailyUploadItem[];
}

export interface NewPromptStatsResponse {
  message: string;
  statusCode: number;
  data: NewPromptStatsData;
}

export interface TopSalesPromptItem {
  rank: number;
  prompt_id: number;
  title: string | null;
  total_sales: number;
}

export interface TopSalesPromptsData {
  period_days: number;
  items: TopSalesPromptItem[];
}

export interface TopSalesPromptsResponse {
  message: string;
  statusCode: number;
  data: TopSalesPromptsData;
}

export interface PopularPromptItem {
  rank: number;
  prompt_id: number;
  title: string;
  views_delta: number;
  downloads_delta: number;
  score: number;
}

export interface PopularPromptsData {
  period_days: number;
  snapshot_date: string;
  items: PopularPromptItem[];
}

export interface PopularPromptsResponse {
  message: string;
  statusCode: number;
  data: PopularPromptsData;
}
