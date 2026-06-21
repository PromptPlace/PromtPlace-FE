export interface register {
  registerToken: string;
  isTermsAgreed: boolean;
}

export interface Account {
  bank: string;
  accountNumber: string;
  holderName: string;
  birthDate: string;
}

export type AccountDetail = {
  sellerType: string;
  status: string;
  isActive: boolean;
  bank: string;
  accountNumber: string;
  holderName: string;
  name: string;
  birthDate: string;
  businessType: string;
  businessNumber: string;
  representativeName: string;
  companyName: string;
  businessLicenseUrl: string;
};

interface SalesSummary {
  count: number;
  total_sales: number;
  total_settled: number;
  total_free: number;
  refunded_count: number;
  refunded_amount: number;
}

interface SalesPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
}

interface SalesItem {
  settlement_id: number;
  sold_at: string;
  prompt_id: number;
  prompt_title: string;
  buyer_id: number;
  buyer_nickname: string;
  pay_type: string;
  card_name: string;
  sale_price: number;
  settled_amount: number;
  fee: number;
  status: string;
}

export interface MonthlySales {
  message: string;
  year: number;
  month: number;
  summary: SalesSummary;
  pagination: SalesPagination;
  items: SalesItem[];
  status: number;
}

export interface YearlySales {
  message: string;
  items: SalesItem[];
  statusCode: number;
}

export interface CommonSettlementResponseDTO<T> {
  message: string;
  data: T;
  statusCode: number;
}
