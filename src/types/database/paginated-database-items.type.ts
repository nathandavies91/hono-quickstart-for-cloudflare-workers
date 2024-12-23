import { DatabaseItems } from "./database-items.type";

export type PaginatedDatabaseItems<T = unknown> = DatabaseItems<T> & {
  totalCount?: number;
}