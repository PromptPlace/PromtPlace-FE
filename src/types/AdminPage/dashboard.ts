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
