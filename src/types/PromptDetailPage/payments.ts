import type { CommonResponse } from '../common';

export interface Buyer {
  name: string;
  email: string | null;
  tel: string | null;
}

export interface Products {
  categoryType: string;
  categoryId: string;
  uid: string;
  name: string;
  count: number;
  sellerId: string;
}

export interface CustomData {
  user_id: number;
}

export type RequestPaymentDTO = {
  prompt_id: number;
  pg: string;
  merchant_uid: string;
  amount: number;
  buyer: Buyer;
  redirect_url: string;
  products: Products[];
  custom_data: CustomData;
};

export type ResponsePaymentDTO = {
  message: string;
  payment_gateway: string;
  merchant_uid: number;
  redirect_url: string;
  statusCode: number;
};

export interface ResponseError {
  error: string;
  message: string;
  statusCode: number;
}