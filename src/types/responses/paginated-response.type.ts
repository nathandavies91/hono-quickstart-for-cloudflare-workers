export type PaginatedResponse<T = unknown> = {
  currentPage: number;
  items: T[];
  maximumPageSize: number;
  totalCollectionCount: number;
  totalPageCount: number;
}