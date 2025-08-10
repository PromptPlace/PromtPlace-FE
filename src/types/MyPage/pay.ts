export interface Sale {
  prompt_id: number;
  title: string;
  price: number;
  sold_at: string; // ISO 8601 형식의 날짜 문자열
  buyer_nickname: string;
  is_refunded: boolean;
}

export interface SalesHistoryApiResponse {
  message: string;
  sales: Sale[];
  statusCode: number;
}

export interface Purchase {
  prompt_id: number;
  title: string;
  price: number;
  purchased_at: string; // ISO 8601 형식의 날짜 문자열
  seller_nickname: string;
  is_refunded: boolean;
  pay_method: string;
}

// 전체 API 응답의 타입
export interface PurchaseHistoryApiResponse {
  message: string;
  purchases: Purchase[];
  statusCode: number;
}
