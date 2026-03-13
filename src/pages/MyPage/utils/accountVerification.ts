import type { SellerRegistrationModalType } from '@/types/MyPage/settlement';
import type { Bank } from './banks';

type SellerType = 'individual' | 'business';

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

  if (sellerType === 'individual' && realName?.trim() && realName.trim() !== accountHolder.trim()) {
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
