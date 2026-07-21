import type { BusinessSellerItem, IndividualSellerItem, PendingSellerItem } from '@/types/AdminPage/seller';

export interface SellerCardData {
  userId: number;
  hasImage: boolean;
  image: string;
  nickname: string;
  name: string;
  email: string;
  bank: string | null;
  account: string | null;
  isBusiness: boolean;
  isWaiting: boolean;
  businessLicenseUrl: string | null;
}

// 승인 대기(사업자) 목록 아이템을 SellerCard 데이터로 변환합니다. 목록 API에는 정산계좌 정보가 없습니다.
export const mapPendingSellerToCard = (item: PendingSellerItem): SellerCardData => ({
  userId: item.user.user_id,
  hasImage: Boolean(item.user.profile_image_url),
  image: item.user.profile_image_url,
  nickname: item.user.nickname,
  name: item.user.name,
  email: item.user.email,
  bank: null,
  account: null,
  isBusiness: true,
  isWaiting: true,
  businessLicenseUrl: item.business_license_url,
});

// 개인 판매자 목록 아이템을 SellerCard 데이터로 변환합니다. 목록 API에는 닉네임/프로필 이미지가 없습니다.
export const mapIndividualSellerToCard = (item: IndividualSellerItem): SellerCardData => ({
  userId: item.user_id,
  hasImage: false,
  image: '',
  nickname: item.name,
  name: item.name,
  email: item.email,
  bank: item.settlement_account.bank_code,
  account: item.settlement_account.account_number,
  isBusiness: false,
  isWaiting: false,
  businessLicenseUrl: null,
});

// 사업자 판매자 목록 아이템을 SellerCard 데이터로 변환합니다. 목록 API에는 사업자등록증 URL이 없습니다(상세 조회 필요).
export const mapBusinessSellerToCard = (item: BusinessSellerItem): SellerCardData => ({
  userId: item.user_id,
  hasImage: Boolean(item.profile_image_url),
  image: item.profile_image_url,
  nickname: item.nickname,
  name: item.name,
  email: item.email,
  bank: item.settlement_account.bank_code,
  account: item.settlement_account.account_number,
  isBusiness: true,
  isWaiting: false,
  businessLicenseUrl: null,
});
