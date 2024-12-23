import { DatabaseItems } from "../types";

export const asDatabaseItems = <T = unknown>(items: T[]): DatabaseItems<T> => {
  return {
    isEmpty: !items?.length,
    items,
  };
}