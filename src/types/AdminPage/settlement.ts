export interface register {
  registerToken: string;
  isTermsAgreed: boolean;
}

export interface Account {
  bank: string;
  accountNumber: string;
  holderName: string;
  birthDate: string;
}

export type AccountDetail = {
  sellerType: string;
  status: string;
  isActive: boolean;
  bank: string;
  accountNumber: string;
  holderName: string;
  name: string;
  birthDate: string;
  businessType: string;
  businessNumber: string;
  representativeName: string;
  companyName: string;
  businessLicenseUrl: string;
};

export interface CommonSettlementResponseDTO<T> {
  message: string;
  data: T;
  statusCode: number;
}
