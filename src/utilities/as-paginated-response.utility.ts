import { PaginatedDatabaseItems, PaginatedResponse, PaginationRequest } from "../types";

export const asPaginatedResponse = <T = unknown>(pagination: PaginationRequest, databaseResponse: PaginatedDatabaseItems<T>): PaginatedResponse<T> => {
  const totalCount = databaseResponse.totalCount ?? databaseResponse.items.length;

  return {
    currentPage: pagination.currentPage,
    items: databaseResponse.items,
    maximumPageSize: pagination.pageSize,
    totalCollectionCount: totalCount,
    totalPageCount: Math.ceil(totalCount / pagination.pageSize),
  }
}