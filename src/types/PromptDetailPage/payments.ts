import type { CommonResponse } from '../common';

export type RequestPaymentDTO = {
  prompt_id: number;
  pg: string;
  merchant_uid: string;
  amount: number;
  buyer_name: string;
  redirect_url: string;
  imp_uid?: string; // 포트원 거래 고유번호 (선택적)
  custom_data: {
    promptId: { promptId: number };
  };
};

export type ResponsePaymentDTO = {
  message: string;
  storeId: string;
  channelKey: string;
  paymentId: string;
  orderName: string;
  totalAmount: number;
  statusCode: number;
  customData: {
    promptId: { promptId: number };
    userId: { userId: number };
  };
};

export type ResponseCompletePurchaseDTO = {
  message: string;
  purchaseId: number;
  statusCode: number;
  status: number;
}

export type ResponseError = {
  error: string;
  message: string;
  statusCode: number;
};

export type PaymentCheckRequestDTO = {
  imp_uid: string;
  merchant_uid: string;
};

export type PaymentCheckResponseDTO = {
  message: string;
  status: 'Succeed' | 'Failed';
  purchase_id: number;
  statusCode: number;
};
