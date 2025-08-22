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
  payment_gateway: string;
  merchant_uid: string;
  redirect_url: string;
  statusCode: number;
  custom_data: {
    promptId: { promptId: number };
  };
};

export type ResponseError = {
  error: string;
  message: string;
  statusCode: number;
}