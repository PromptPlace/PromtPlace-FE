/**
 * 판매자 정보 수정 관련 타입 정의
 */

export type SellerType = 'individual' | 'business_individual' | 'business_corporate';

export interface SellerInfoEditData {
  sellerType: SellerType;
  name?: string;
  birthDate?: string;
  businessNumber?: string;
  representativeName?: string;
  companyName?: string;
  businessLicenseUrl?: string;
  bank: string;
  accountNumber: string;
  holderName: string;
  isTermsAgreed: boolean;
  accountVerified: boolean;
}

export interface SellerInfoEditFormData {
  sellerType: SellerType;
  name?: string;
  birthDate?: string;
  businessNumber?: string;
  representativeName?: string;
  companyName?: string;
  businessLicenseUrl?: string;
  bank: string;
  accountNumber: string;
  holderName: string;
  isTermsAgreed: boolean;
}

export interface SellerInfoEditResponse {
  message: string;
  data: SellerInfoEditData;
  statusCode: number;
}
