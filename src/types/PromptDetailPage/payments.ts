import type { CommonResponse } from '../common';

export type RequestPaymentDTO = {
  prompt_id: number;
  pg: string;
  merchant_uid: string;
  amount: number;
  buyer_name: string;
  redirect_url: string;
};

export type ResponsePaymentDTO = {
  message: string;
  payment_gateway: string;
  merchant_uid: string;
  redirect_url: string;
  statusCode: number;
};

export type ResponseError = {
  error: string;
  message: string;
  statusCode: number;
}