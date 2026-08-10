import { axiosInstance } from '@/apis/axios.ts';

export interface RefundEligibilityResponse {
  message: string;
  eligible: boolean;
  reason?:
    | 'EXPIRED_7DAYS'
    | 'ALREADY_DOWNLOADED'
    | 'ALREADY_REFUNDED'
    | 'NOT_OWNER'
    | 'NOT_PURCHASED'
    | 'PAYMENT_NOT_SUCCEEDED'
    | 'FREE_PURCHASE';
  remaining_seconds?: number;
  statusCode: number;
}

export const getRefundEligibility = async (purchaseId: number): Promise<RefundEligibilityResponse> => {
  const { data } = await axiosInstance.get<RefundEligibilityResponse>(
    `/api/prompts/purchases/${purchaseId}/refund-eligibility`,
  );
  return data;
};

export const postRefund = async (purchaseId: number): Promise<void> => {
  await axiosInstance.post(`/api/prompts/purchases/${purchaseId}/refund`);
};
