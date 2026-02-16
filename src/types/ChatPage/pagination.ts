export type PaginationDto = {
  cursor?: number;
  limit?: number;
};

export type Page = {
  has_more: boolean;
  total_count: number;
};
