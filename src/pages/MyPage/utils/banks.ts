export interface Bank {
  name: string;
  code: string;
  fileName: string;
}

export const BANKS: Bank[] = [
  { name: '토스뱅크', code: '092', fileName: 'Toss.svg' },
  { name: '카카오뱅크', code: '090', fileName: 'Kakao.svg' },
  { name: '하나은행', code: '081', fileName: 'Hana.svg' },
  { name: '우리은행', code: '020', fileName: 'Woori.svg' },
  { name: '신한은행', code: '088', fileName: 'Shinhan.svg' },
  { name: 'KB국민은행', code: '004', fileName: 'KB.svg' },
  { name: 'IBK기업은행', code: '003', fileName: 'IBK.svg' },
  { name: 'KDB산업은행', code: '002', fileName: 'KDB.svg' },
  { name: '케이뱅크', code: '089', fileName: 'K.svg' },
  { name: 'SC제일은행', code: '023', fileName: 'SC.svg' },
  { name: '씨티은행', code: '027', fileName: 'City.svg' },
  { name: '새마을금고', code: '045', fileName: 'Saemaul.svg' },
  { name: 'NH농협은행', code: '011', fileName: 'NH.svg' },
  { name: '우체국', code: '071', fileName: 'Post.svg' },
  { name: '부산은행', code: '032', fileName: 'Busan.svg' },
  { name: '제주은행', code: '035', fileName: 'Jeju.svg' },
  { name: '광주은행', code: '034', fileName: 'Gwangju.svg' },
  { name: '전북은행', code: '037', fileName: 'Jeonbuk.svg' },
  { name: 'iM뱅크', code: '031', fileName: 'iM.svg' },
  { name: 'Sh수협은행', code: '007', fileName: 'Suhyup.svg' },
];

export const getBankLogoUrl = (fileName: string) => {
  return new URL(`/src/assets/banks/${fileName}`, import.meta.url).href;
};

interface PortOneBankInfo {
  name: string;
  fileName: string;
}

const PORTONE_BANK_MAP: Record<string, PortOneBankInfo> = {
  KOOKMIN: { name: 'KB국민은행', fileName: 'KB.svg' },
  SHINHAN: { name: '신한은행', fileName: 'Shinhan.svg' },
  WOORI: { name: '우리은행', fileName: 'Woori.svg' },
  HANA: { name: '하나은행', fileName: 'Hana.svg' },
  NONGHYUP: { name: 'NH농협은행', fileName: 'NH.svg' },
  KAKAOBANK: { name: '카카오뱅크', fileName: 'Kakao.svg' },
  TOSSBANK: { name: '토스뱅크', fileName: 'Toss.svg' },
  KBANK: { name: '케이뱅크', fileName: 'K.svg' },
  IBK: { name: 'IBK기업은행', fileName: 'IBK.svg' },
  KDB: { name: 'KDB산업은행', fileName: 'KDB.svg' },
  SUHYUP: { name: 'Sh수협은행', fileName: 'Suhyup.svg' },
  SC: { name: 'SC제일은행', fileName: 'SC.svg' },
  CITI: { name: '씨티은행', fileName: 'City.svg' },
  DAEGU: { name: 'iM뱅크', fileName: 'iM.svg' },
  BUSAN: { name: '부산은행', fileName: 'Busan.svg' },
  GWANGJU: { name: '광주은행', fileName: 'Gwangju.svg' },
  JEONBUK: { name: '전북은행', fileName: 'Jeonbuk.svg' },
  JEJU: { name: '제주은행', fileName: 'Jeju.svg' },
  POST: { name: '우체국', fileName: 'Post.svg' },
  SAEMAEUL: { name: '새마을금고', fileName: 'Saemaul.svg' },
};

export const getBankInfoByPortOneCode = (bankCode: string) => {
  const mapped = PORTONE_BANK_MAP[bankCode];

  if (!mapped) {
    return null;
  }

  return {
    name: mapped.name,
    logoUrl: getBankLogoUrl(mapped.fileName),
  };
};

export const getPortOneBankCodeByBankName = (bankName: string) => {
  const entry = Object.entries(PORTONE_BANK_MAP).find(([, info]) => info.name === bankName);

  return entry?.[0] ?? null;
};
