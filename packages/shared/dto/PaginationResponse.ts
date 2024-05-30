export interface PaginationResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
