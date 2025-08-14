export interface AccountInfo {
  account_id: number;
  bank_code: string;
  bank_name: string;
  account_number: string;
  account_holder: string;
}

export interface AccountApiResponse {
  message: string;
  data: AccountInfo;
  statusCode: number;
}

export interface RegisterInfo {
  bank_code: string;
  account_number: string;
  account_holder: string;
}

export interface UpdateAccountInfo {
  bank_code: string;
  bank_name: string;
  account_number: string;
  account_holder: string;
}

export interface WithdrawableAmountApiResponse {
  message: string;
  available_amount: number;
  statusCode: number;
}