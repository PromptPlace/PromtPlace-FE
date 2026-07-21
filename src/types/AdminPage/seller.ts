export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
}

export interface SellerUserSummary {
  user_id: number;
  name: string;
  nickname: string;
  email: string;
  profile_image_url: string;
}

export interface SettlementAccountSummary {
  bank_code: string;
  account_number: string;
  account_holder: string;
}

export type SellerRegistrationType = 'INDIVIDUAL' | 'BUSINESS';

export interface PendingSellersRequestParams {
  page?: number;
  limit?: number;
}

export interface PendingSellerItem {
  user: SellerUserSummary;
  business_number: string;
  company_name: string;
  representative_name: string;
  business_license_url: string;
  created_at: string;
}

export interface PendingSellerListData {
  items: PendingSellerItem[];
  pagination: Pagination;
}

export interface PendingSellerListResponse {
  message: string;
  statusCode: number;
  data: PendingSellerListData;
}

export interface PendingSellerDetailData {
  user: SellerUserSummary;
  business_number: string;
  company_name: string;
  representative_name: string;
  business_license_url: string;
  bank_code: string;
  account_number: string;
  account_holder: string;
  created_at: string;
}

export interface PendingSellerDetailResponse {
  message: string;
  statusCode: number;
  data: PendingSellerDetailData;
}

export interface RejectPendingSellerData {
  user_id: number;
}

export interface RejectPendingSellerResponse {
  message: string;
  statusCode: number;
  data: RejectPendingSellerData;
}

export interface ApprovePendingSellerData {
  user_id: number;
}

export interface ApprovePendingSellerResponse {
  message: string;
  statusCode: number;
  data: ApprovePendingSellerData;
}

export interface SellersRequestParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IndividualSellerItem {
  user_id: number;
  name: string;
  email: string;
  settlement_account: SettlementAccountSummary;
  created_at: string;
}

export interface IndividualSellerListData {
  items: IndividualSellerItem[];
  pagination: Pagination;
}

export interface IndividualSellerListResponse {
  message: string;
  statusCode: number;
  data: IndividualSellerListData;
}

export interface BusinessSellerItem {
  user_id: number;
  profile_image_url: string;
  nickname: string;
  name: string;
  email: string;
  settlement_account: SettlementAccountSummary;
  created_at: string;
}

export interface BusinessSellerListData {
  items: BusinessSellerItem[];
  pagination: Pagination;
}

export interface BusinessSellerListResponse {
  message: string;
  statusCode: number;
  data: BusinessSellerListData;
}

export interface IndividualSellerDetailData {
  user_id: number;
  profile_image_url: string;
  nickname: string;
  name: string;
  email: string;
  registration_type: SellerRegistrationType;
  status: string;
  settlement_account: SettlementAccountSummary;
  created_at: string;
  updated_at: string;
}

export interface IndividualSellerDetailResponse {
  message: string;
  statusCode: number;
  data: IndividualSellerDetailData;
}

export interface BusinessSellerDetailData {
  user_id: number;
  profile_image_url: string;
  nickname: string;
  name: string;
  email: string;
  registration_type: SellerRegistrationType;
  status: string;
  business_number: string;
  representative_name: string;
  company_name: string;
  business_license_url: string;
  settlement_account: SettlementAccountSummary;
  created_at: string;
  updated_at: string;
}

export interface BusinessSellerDetailResponse {
  message: string;
  statusCode: number;
  data: BusinessSellerDetailData;
}

export interface CancelSellerData {
  user_id: number;
  deactivated_prompt_count: number;
}

export interface CancelSellerResponse {
  message: string;
  statusCode: number;
  data: CancelSellerData;
}
