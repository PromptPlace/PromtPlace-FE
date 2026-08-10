import { AxiosError } from 'axios';
import type { SellerRegistrationModalType, SettlementErrorResponseDTO } from '@/types/MyPage/settlement';
import type { Bank } from './banks';

type SellerType = 'individual' | 'business_individual' | 'business_corporate';

export type AccountVerificationResult = {
  isVerified: boolean;
  modalType: Extract<SellerRegistrationModalType, 'verificationSuccess' | 'nameMismatch' | 'bankAccountMismatch'>;
};

interface GetAccountVerificationResultParams {
  selectedBank: Bank | null;
  accountNumber: string;
  accountHolder: string;
  sellerType: SellerType;
  realName?: string;
}

export const getAccountVerificationResult = ({
  selectedBank,
  accountNumber,
  accountHolder,
  sellerType,
  realName,
}: GetAccountVerificationResultParams): AccountVerificationResult => {
  if (!selectedBank || !accountNumber) {
    return {
      isVerified: false,
      modalType: 'bankAccountMismatch',
    };
  }

  if (!accountHolder) {
    return {
      isVerified: false,
      modalType: 'nameMismatch',
    };
  }

  if ((sellerType === 'individual') && realName?.trim() && realName.trim() !== accountHolder.trim()) {
    return {
      isVerified: false,
      modalType: 'nameMismatch',
    };
  }

  return {
    isVerified: true,
    modalType: 'verificationSuccess',
  };
};

const VERIFY_ACCOUNT_ERROR_SUBCODE_TO_MODAL_TYPE: Record<string, SellerRegistrationModalType> = {
  NAME_MISMATCH: 'nameMismatch',
  BANK_ACCOUNT_MISMATCH: 'bankAccountMismatch',
  ACCOUNT_NOT_FOUND: 'accountNotFound',
  ACCOUNT_UNAVAILABLE: 'accountUnavailable',
  UNSUPPORTED_ACCOUNT_TYPE: 'unsupportedAccountType',
  BANK_COMMUNICATION_ERROR: 'bankCommunicationError',
  BANK_MAINTENANCE_TIME: 'bankMaintenanceTime',
  DAILY_VERIFICATION_LIMIT_EXCEEDED: 'dailyVerificationLimitExceeded',
};

export interface VerifyAccountErrorInfo {
  modalType: SellerRegistrationModalType;
  // subCode를 알려진 모달 타입으로 매핑하지 못한 경우, 백엔드가 내려준 message를 그대로 노출합니다.
  // (프론트에서 임의의 에러 메시지를 만들지 않는다는 CLAUDE.md 원칙을 따름)
  descriptionOverride?: string;
}

// verify-account / register API의 실패 응답을 화면에 표시할 모달 타입(+설명)으로 변환합니다.
export const getVerifyAccountErrorInfo = (error: unknown): VerifyAccountErrorInfo => {
  if (!(error instanceof AxiosError)) {
    return { modalType: 'bankCommunicationError' };
  }

  const data = error.response?.data;
  const isErrorPayload = Boolean(data) && typeof data === 'object';
  const subCode = isErrorPayload ? (data as SettlementErrorResponseDTO).subCode : undefined;
  const message = isErrorPayload ? (data as SettlementErrorResponseDTO).message : undefined;

  if (subCode && subCode in VERIFY_ACCOUNT_ERROR_SUBCODE_TO_MODAL_TYPE) {
    return { modalType: VERIFY_ACCOUNT_ERROR_SUBCODE_TO_MODAL_TYPE[subCode] };
  }

  return { modalType: 'bankCommunicationError', descriptionOverride: message };
};
