export type RequestPaymentDTO = {
  prompt_id: number;
  pay_type: 'card';
  refund_policy_agreed: boolean;
};

export type ResponsePaymentDTO = {
  message: string;
  statusCode: number;
  PCD_CST_ID: string;
  PCD_CUST_KEY: string;
  PCD_AUTH_KEY: string;
  PCD_PAY_TYPE: string;
  PCD_PAY_WORK: string;
  PCD_PAY_HOST: string;
  PCD_PAY_URL: string;
  PCD_PAY_OID: string;
  PCD_PAY_GOODS: string;
  PCD_PAY_TOTAL: number;
  PCD_USER_DEFINE1: string;
  PCD_RST_URL: string;
};

// 페이플 콜백(callbackFunction) 결과를 그대로 전달하는 검증 요청 바디.
// PCD_PAY_REQKEY로 백엔드가 페이플에 재검증하므로 필수 필드로 취급한다.
export type RequestCompletePurchaseDTO = {
  PCD_PAY_RST: string;
  PCD_PAY_CODE?: string;
  PCD_PAY_MSG?: string;
  PCD_PAY_OID: string;
  PCD_PAY_REQKEY: string;
  PCD_AUTH_KEY?: string;
  PCD_PAY_HOST?: string;
  PCD_PAY_URL?: string;
  PCD_PAY_TOTAL?: number;
  PCD_PAY_TYPE?: string;
  PCD_USER_DEFINE1?: string;
};

export type ResponseCompletePurchaseDTO = {
  message: string;
  status: 'Succeed' | 'Failed';
  purchase_id: number;
  statusCode: number;
};

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
