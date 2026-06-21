import axios from 'axios';
import type {
  CommonSettlementResponseDTO,
  Account,
  AccountDetail,
  MonthlySales,
} from '@/types/AdminPage/settlement.ts';

export const getSettlementAccount = async (): Promise<CommonSettlementResponseDTO<Account>> => {
  const token = sessionStorage.getItem('accessToken');
  const accessToken = token?.replace(/^"|"$/g, '');
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/api/settlements/accounts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const getAdjustmentDetail = async (): Promise<CommonSettlementResponseDTO<AccountDetail>> => {
  const token = sessionStorage.getItem('accessToken');
  const accessToken = token?.replace(/^"|"$/g, '');
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/api/settlements/account/detail`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const getMonthlySales = async (): Promise<MonthlySales> => {
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/api/settlements/sales/monthly`, {
    params: {
      year,
      month,
      page,
      limit,
      hasNext,
    },
  });
};
