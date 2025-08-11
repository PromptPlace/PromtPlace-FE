export interface Sale {
  prompt_id: number;
  title: string;
  price: number;
  sold_at: string;
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
  purchased_at: string;
  seller_nickname?: string;
  pg: 'kakaopay' | 'tosspay';
  is_refunded?: boolean;
}

// 전체 API 응답의 타입
export interface PurchaseHistoryApiResponse {
  message: string;
  purchases: Purchase[];
  statusCode: number;
}
