import type {
  CommonSettlementResponseDTO,
  Account,
  AccountDetail,
  MonthlySales,
  MonthlySalesRequestDTO,
  YearlySales,
  PendingAmount,
  IndividualRegisterResponseDTO,
  IndividualRegisterRequestDTO,
  BusinessLicenseResponseDTO,
  businessRegisterRequestDTO,
  businessRegisterResponseDTO,
  VerifyAccountRequestDTO,
  VerifyAccountResponseDTO,
} from '@/types/MyPage/settlement.ts';
import { axiosInstance } from '@apis/axios.ts';

export const postVerifyAccount = async (params: VerifyAccountRequestDTO): Promise<VerifyAccountResponseDTO> => {
  const { data } = await axiosInstance.post(
    `${import.meta.env.VITE_SERVER_API_URL}/api/settlements/verify-account`,
    params,
  );

  return data;
};

export const getSettlementAccount = async (): Promise<CommonSettlementResponseDTO<Account>> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/settlements/accounts`);

  return data;
};

export const getAdjustmentDetail = async (): Promise<CommonSettlementResponseDTO<AccountDetail>> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/settlements/account/detail`);

  return data;
};

export const getMonthlySales = async (params: MonthlySalesRequestDTO): Promise<MonthlySales> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/settlements/sales/monthly`, {
    params: params,
  });

  return data;
};

export const getYearlySales = async (): Promise<YearlySales> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/settlements/yearly`);

  return data;
};

export const getPendingAmount = async (): Promise<PendingAmount> => {
  const { data } = await axiosInstance.get(`${import.meta.env.VITE_SERVER_API_URL}/api/settlements/pending-amount`);

  return data;
};

export const postIndividualRegister = async (
  params: IndividualRegisterRequestDTO,
): Promise<IndividualRegisterResponseDTO> => {
  const { data } = await axiosInstance.post(
    `${import.meta.env.VITE_SERVER_API_URL}/api/settlements/register/individual`,
    params,
  );

  return data;
};

export const postBusinessLicense = async (file: File): Promise<BusinessLicenseResponseDTO> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axiosInstance.post(
    `${import.meta.env.VITE_SERVER_API_URL}/api/settlements/upload/business-license`,
    formData,
  );

  return data;
};

export const postBusinessRegister = async (
  params: businessRegisterRequestDTO,
): Promise<businessRegisterResponseDTO> => {
  const { data } = await axiosInstance.post(
    `${import.meta.env.VITE_SERVER_API_URL}/api/settlements/register/business`,
    params,
  );

  return data;
};
