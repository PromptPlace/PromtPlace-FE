import type { SellerRegistrationModalContent, SellerRegistrationModalType } from '@/types/MyPage/settlement';

const FAILURE_TITLE = '계좌 인증에 실패했습니다.';

export const SELLER_REGISTRATION_MODAL_CONTENT: Record<SellerRegistrationModalType, SellerRegistrationModalContent> = {
  verificationSuccess: {
    title: '계좌 인증에 성공했습니다!',
  },
  nameMismatch: {
    title: FAILURE_TITLE,
    description: '실명과 예금주명이 일치하는지 다시 확인해주세요.',
  },
  bankAccountMismatch: {
    title: FAILURE_TITLE,
    description: '선택하신 은행과 계좌번호가 일치하지 않습니다. 은행명을 다시 확인해 주세요.',
  },
  accountNotFound: {
    title: FAILURE_TITLE,
    description: '해당 계좌는 존재하지 않는 계좌입니다. 다시 확인해주세요.',
  },
  accountUnavailable: {
    title: FAILURE_TITLE,
    description: '입력하신 계좌는 현재 정상적인 거래가 불가능한 상태입니다. 은행 확인 후 다시 시도해 주세요.',
  },
  unsupportedAccountType: {
    title: FAILURE_TITLE,
    description:
      '해당 계좌는 정산용으로 등록할 수 없는 유형입니다. 원화 입출금이 가능한 보통예금 계좌로 다시 시도해 주세요.',
  },
  bankCommunicationError: {
    title: FAILURE_TITLE,
    description: '해당 은행과의 통신이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.',
  },
  bankMaintenanceTime: {
    title: FAILURE_TITLE,
    description: '현재 은행 정기 점검 시간(약 23:30~00:30)입니다. 점검 종료 후 다시 시도해 주세요.',
  },
  dailyVerificationLimitExceeded: {
    title: FAILURE_TITLE,
    description: '일일 계좌 인증 횟수를 초과했습니다. 보안을 위해 내일 다시 시도해 주세요.',
  },
  individualRegistrationComplete: {
    title: '판매자 등록이 완료되었습니다!',
    description: '직접 제작한 프롬프트를 판매해보세요.',
    actionLabel: '프롬프트 올리기',
  },
  businessRegistrationComplete: {
    title: '판매자 신청이 완료되었습니다!',
    description: '영업일 기준 1~3일 내로 처리하고 알려드릴게요.',
  },
};
