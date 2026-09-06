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

// 백엔드(계좌 인증/정산 API)는 KFTC 표준 은행 코드(BANKS[].code)를 그대로 사용한다.
// (예전 PortOne 문자열 코드('HANA' 등)는 페이플 마이그레이션 이후 더 이상 쓰지 않음)
export const getBankInfoByCode = (bankCode: string) => {
  const matched = BANKS.find((bank) => bank.code === bankCode);

  if (!matched) {
    return null;
  }

  return {
    name: matched.name,
    logoUrl: getBankLogoUrl(matched.fileName),
  };
};

const formatAccountNumberBySegments = (accountNumber: string, segments: number[]) => {
  let cursor = 0;

  return segments
    .map((segmentLength) => {
      const part = accountNumber.slice(cursor, cursor + segmentLength);
      cursor += segmentLength;
      return part;
    })
    .filter(Boolean)
    .join('-');
};

const formatAccountNumberByLength = (accountNumber: string, rules: Record<number, number[]>) => {
  const segments = rules[accountNumber.length];

  if (!segments) {
    return accountNumber;
  }

  return formatAccountNumberBySegments(accountNumber, segments);
};

// 정산 계좌 정보 화면에서 은행별 계좌번호 표시 형식을 맞춥니다.
export const formatBankAccountNumber = (bankName: string, accountNumber: string) => {
  const digitsOnly = accountNumber.replace(/\D/g, '');

  if (!digitsOnly) {
    return accountNumber;
  }

  switch (bankName) {
    case 'KB국민은행':
      return formatAccountNumberByLength(digitsOnly, {
        11: [3, 2, 6],
        12: [3, 2, 3, 3],
        14: [6, 2, 6],
      });
    case '신한은행':
      return formatAccountNumberByLength(digitsOnly, {
        11: [3, 2, 6],
        12: [3, 3, 6],
      });
    case '우리은행':
      return formatAccountNumberByLength(digitsOnly, {
        13: [4, 3, 6],
      });
    case '하나은행':
      return formatAccountNumberByLength(digitsOnly, {
        14: [3, 6, 5],
      });
    case 'NH농협은행':
      return formatAccountNumberByLength(digitsOnly, {
        13: [3, 4, 4, 2],
      });
    case 'IBK기업은행':
      return formatAccountNumberByLength(digitsOnly, {
        14: [3, 6, 2, 3],
      });
    case 'KDB산업은행':
      return formatAccountNumberByLength(digitsOnly, {
        14: [3, 4, 4, 3],
      });
    case '카카오뱅크':
      return formatAccountNumberByLength(digitsOnly, {
        13: [4, 2, 7],
      });
    case '토스뱅크':
      return formatAccountNumberByLength(digitsOnly, {
        12: [4, 2, 6],
        13: [4, 3, 6],
      });
    case '케이뱅크':
      return formatAccountNumberByLength(digitsOnly, {
        12: [3, 3, 6],
      });
    case 'SC제일은행':
      return formatAccountNumberByLength(digitsOnly, {
        11: [3, 2, 6],
      });
    case '씨티은행':
      return formatAccountNumberByLength(digitsOnly, {
        12: [3, 6, 3],
      });
    case 'iM뱅크':
      return formatAccountNumberByLength(digitsOnly, {
        12: [3, 2, 6, 1],
      });
    case '부산은행':
      return formatAccountNumberByLength(digitsOnly, {
        13: [3, 4, 4, 2],
      });
    case '광주은행':
      return formatAccountNumberByLength(digitsOnly, {
        12: [3, 3, 6],
      });
    case '전북은행':
      return formatAccountNumberByLength(digitsOnly, {
        12: [3, 2, 7],
      });
    case '제주은행':
      return formatAccountNumberByLength(digitsOnly, {
        10: [2, 2, 6],
      });
    case '우체국':
      return formatAccountNumberByLength(digitsOnly, {
        14: [6, 2, 6],
      });
    case '새마을금고':
      return formatAccountNumberByLength(digitsOnly, {
        13: [4, 2, 6, 1],
      });
    case 'Sh수협은행':
      return formatAccountNumberByLength(digitsOnly, {
        11: [3, 2, 6],
      });
    default:
      return digitsOnly;
  }
};
