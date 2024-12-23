import { PaginatedDatabaseItems } from "../types";
import { asDatabaseItems } from "./as-database-items.utility";

export const asPaginatedDatabaseItems = <T = unknown>(items: T[], totalCount: number): PaginatedDatabaseItems<T> => {
  return {
    ...asDatabaseItems<T>(items),
    totalCount,
  };
}