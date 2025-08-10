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
