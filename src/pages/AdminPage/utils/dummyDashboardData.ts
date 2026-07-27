import type {
  MonthlyDailyVisitorItem,
  VisitorStatsData,
  ActiveUserStatsData,
  NewPromptStatsData,
  TopSalesPromptItem,
} from '@/types/AdminPage/dashboard';
import type {
  IndividualSellerItem,
  BusinessSellerItem,
  PendingSellerItem,
  IndividualSellerDetailData,
  BusinessSellerDetailData,
  PendingSellerDetailData,
  Pagination,
  SellersRequestParams,
  PendingSellersRequestParams,
} from '@/types/AdminPage/seller';

// PM 요청: 데이터 부족으로 확인이 어려운 화면(사용자 지표/신규 프롬프트/판매자 관리/매출 상위 프롬프트)을
// 더미 데이터로 대체합니다. API 연동 로직은 그대로 두고, 화면에 노출되는 값만 아래 더미 데이터로 교체합니다.
// 추후 실데이터 확인이 가능해지면 이 파일을 참조하는 부분을 실제 API 응답으로 되돌리면 됩니다.

const buildPagination = (page: number, limit: number, total: number): Pagination => {
  const total_pages = Math.max(1, Math.ceil(total / limit));
  return { page, limit, total, total_pages, has_next: page < total_pages };
};

const paginate = <T>(items: T[], page: number, limit: number): T[] => {
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
};

const toDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// ── 사용자 지표(그래프) ─────────────────────────────────────────────
export const DUMMY_VISITOR_STATS: VisitorStatsData = {
  daily_count: 132,
  window_days: 30,
  current_count: 4820,
  previous_count: 4185,
  change_rate: 0.152,
};

export const DUMMY_ACTIVE_USER_STATS: ActiveUserStatsData = {
  window_days: 30,
  current_count: 2310,
  previous_count: 2504,
  change_rate: -0.077,
};

export const buildDummyMonthDaily = (month: string): MonthlyDailyVisitorItem[] => {
  const [year, monthIndex] = month.split('-').map(Number);
  const daysInMonth = new Date(year, monthIndex, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const count = Math.round(90 + 40 * Math.sin(day / 3.2) + (day % 5) * 6);
    return {
      date: toDateString(new Date(year, monthIndex - 1, day)),
      count,
    };
  });
};

// ── 신규 프롬프트(그래프) ───────────────────────────────────────────
export const DUMMY_NEW_PROMPT_STATS: NewPromptStatsData = {
  daily_count: 18,
  weekly_count: 96,
  daily_uploads: Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const count = [12, 15, 9, 21, 18, 14, 18][index];
    return { date: toDateString(date), count };
  }),
};

// ── 매출 상위 프롬프트 ─────────────────────────────────────────────
export const DUMMY_TOP_SALES_PROMPTS: TopSalesPromptItem[] = [
  { rank: 1, prompt_id: 501, title: '블로그 SEO 최적화 프롬프트', total_sales: 1_284_000 },
  { rank: 2, prompt_id: 502, title: '이미지 생성 프롬프트 모음', total_sales: 968_000 },
  { rank: 3, prompt_id: 503, title: '이력서 첨삭 도우미', total_sales: 742_500 },
  { rank: 4, prompt_id: 504, title: '유튜브 대본 작성 프롬프트', total_sales: 615_000 },
  { rank: 5, prompt_id: 505, title: null, total_sales: 480_000 },
];

// ── 판매자 관리(더보기 포함) ─────────────────────────────────────────
const BANKS = ['KOOKMIN', 'SHINHAN', 'WOORI', 'HANA', 'NH'];
const NAME_POOL = [
  '김민준',
  '이서연',
  '박도윤',
  '최지우',
  '정하은',
  '강서준',
  '조유나',
  '윤도현',
  '임하윤',
  '한지호',
  '오수아',
  '신동현',
  '배지민',
  '유서준',
  '문채원',
  '홍준서',
  '남궁민',
  '서은우',
  '송지안',
  '권도윤',
  '황시우',
  '안유진',
  '고은서',
  '전민재',
];

const DUMMY_INDIVIDUAL_SELLERS: IndividualSellerItem[] = Array.from({ length: 24 }, (_, i) => {
  const name = NAME_POOL[i % NAME_POOL.length];
  return {
    user_id: 1000 + i,
    name,
    email: `dummy-individual${i + 1}@example.com`,
    settlement_account: {
      bank_code: BANKS[i % BANKS.length],
      account_number: `110-${String(1000 + i).padStart(4, '0')}-${String(2000 + i).padStart(4, '0')}`,
      account_holder: name,
    },
    created_at: new Date(Date.now() - i * 86_400_000).toISOString(),
  };
});

const DUMMY_BUSINESS_SELLERS: BusinessSellerItem[] = Array.from({ length: 15 }, (_, i) => {
  const name = NAME_POOL[(i + 5) % NAME_POOL.length];
  return {
    user_id: 2000 + i,
    profile_image_url: '',
    nickname: `dummy_biz_${i + 1}`,
    name,
    email: `dummy-business${i + 1}@example.com`,
    settlement_account: {
      bank_code: BANKS[(i + 1) % BANKS.length],
      account_number: `220-${String(3000 + i).padStart(4, '0')}-${String(4000 + i).padStart(4, '0')}`,
      account_holder: name,
    },
    created_at: new Date(Date.now() - i * 43_200_000).toISOString(),
  };
});

const DUMMY_PENDING_SELLERS: PendingSellerItem[] = Array.from({ length: 13 }, (_, i) => {
  const name = NAME_POOL[(i + 11) % NAME_POOL.length];
  return {
    user: {
      user_id: 3000 + i,
      name,
      nickname: `dummy_pending_${i + 1}`,
      email: `dummy-pending${i + 1}@example.com`,
      profile_image_url: '',
    },
    business_number: `${100 + i}-${10 + (i % 90)}-${10000 + i}`,
    company_name: `더미컴퍼니${i + 1}`,
    representative_name: name,
    business_license_url: `https://example.com/dummy-license-${i + 1}.pdf`,
    created_at: new Date(Date.now() - i * 21_600_000).toISOString(),
  };
});

const matchesSearch = (search: string | undefined, fields: string[]) => {
  if (!search) return true;
  const keyword = search.toLowerCase();
  return fields.some((field) => field.toLowerCase().includes(keyword));
};

export const getDummyIndividualSellers = ({ page = 1, limit = 10, search }: SellersRequestParams = {}) => {
  const filtered = DUMMY_INDIVIDUAL_SELLERS.filter((item) => matchesSearch(search, [item.name, item.email]));
  return {
    items: paginate(filtered, page, limit),
    pagination: buildPagination(page, limit, filtered.length),
  };
};

export const getDummyBusinessSellers = ({ page = 1, limit = 10, search }: SellersRequestParams = {}) => {
  const filtered = DUMMY_BUSINESS_SELLERS.filter((item) =>
    matchesSearch(search, [item.name, item.email, item.nickname]),
  );
  return {
    items: paginate(filtered, page, limit),
    pagination: buildPagination(page, limit, filtered.length),
  };
};

export const getDummyPendingSellers = ({ page = 1, limit = 10 }: PendingSellersRequestParams = {}) => {
  return {
    items: paginate(DUMMY_PENDING_SELLERS, page, limit),
    pagination: buildPagination(page, limit, DUMMY_PENDING_SELLERS.length),
  };
};

// ── 등록폼 보기(디자인 QA) ───────────────────────────────────────────
// 실제 사용자가 아직 충분하지 않아 상세 조회 API가 빈 응답을 주는 경우가 많아,
// userId를 시드로 한 더미 상세 데이터로 화면 디자인만 확인할 수 있게 합니다.
const toSeed = (userId: number) => (Number.isFinite(userId) ? Math.abs(userId) : 0);

export const getDummyIndividualSellerDetail = (userId: number): IndividualSellerDetailData => {
  const seed = toSeed(userId);
  const name = NAME_POOL[seed % NAME_POOL.length];

  return {
    user_id: seed,
    profile_image_url: '',
    nickname: name,
    name,
    email: `dummy-individual-detail${seed}@example.com`,
    registration_type: 'INDIVIDUAL',
    status: 'APPROVED',
    settlement_account: {
      bank_code: BANKS[seed % BANKS.length],
      account_number: `110-${String(1000 + seed).padStart(4, '0')}-${String(2000 + seed).padStart(4, '0')}`,
      account_holder: name,
    },
    created_at: new Date(Date.now() - seed * 86_400_000).toISOString(),
    updated_at: new Date().toISOString(),
  };
};

export const getDummyBusinessSellerDetail = (userId: number): BusinessSellerDetailData => {
  const seed = toSeed(userId);
  const name = NAME_POOL[(seed + 5) % NAME_POOL.length];

  return {
    user_id: seed,
    profile_image_url: '',
    nickname: `dummy_biz_${seed}`,
    name,
    email: `dummy-business-detail${seed}@example.com`,
    registration_type: 'BUSINESS',
    status: 'APPROVED',
    business_number: `${100 + seed}-${10 + (seed % 90)}-${10000 + seed}`,
    representative_name: name,
    company_name: `더미컴퍼니${seed}`,
    business_license_url: `https://example.com/dummy-license-${seed}.pdf`,
    settlement_account: {
      bank_code: BANKS[(seed + 1) % BANKS.length],
      account_number: `220-${String(3000 + seed).padStart(4, '0')}-${String(4000 + seed).padStart(4, '0')}`,
      account_holder: name,
    },
    created_at: new Date(Date.now() - seed * 43_200_000).toISOString(),
    updated_at: new Date().toISOString(),
  };
};

export const getDummyPendingSellerDetail = (userId: number): PendingSellerDetailData => {
  const seed = toSeed(userId);
  const name = NAME_POOL[(seed + 11) % NAME_POOL.length];

  return {
    user: {
      user_id: seed,
      name,
      nickname: `dummy_pending_${seed}`,
      email: `dummy-pending-detail${seed}@example.com`,
      profile_image_url: '',
    },
    business_number: `${100 + seed}-${10 + (seed % 90)}-${10000 + seed}`,
    company_name: `더미컴퍼니${seed}`,
    representative_name: name,
    business_license_url: `https://example.com/dummy-license-pending-${seed}.pdf`,
    bank_code: BANKS[seed % BANKS.length],
    account_number: `330-${String(5000 + seed).padStart(4, '0')}-${String(6000 + seed).padStart(4, '0')}`,
    account_holder: name,
    created_at: new Date(Date.now() - seed * 21_600_000).toISOString(),
  };
};
