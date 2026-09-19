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

// 페이플 CERT 인증 결과(callbackFunction)를 그대로 전달하는 승인 요청 바디.
// 백엔드가 PCD_PAY_COFURL로 최종 승인을 요청하고, PCD_USER_DEFINE1의 주문 정보와 로그인 사용자를 대조한다.
export type RequestCompletePurchaseDTO = {
  PCD_PAY_RST: string;
  PCD_PAY_WORK: string;
  PCD_PAY_CODE?: string;
  PCD_PAY_MSG?: string;
  PCD_PAY_OID: string;
  PCD_PAY_REQKEY: string;
  PCD_AUTH_KEY: string;
  PCD_PAY_COFURL: string;
  PCD_PAY_HOST?: string;
  PCD_PAY_URL?: string;
  PCD_PAY_TOTAL: string | number;
  PCD_PAY_TYPE: string;
  PCD_USER_DEFINE1: string;
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
