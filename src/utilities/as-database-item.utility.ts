import { DatabaseItem } from "../types";

export const asDatabaseItem = <T = unknown>(item: T | null): DatabaseItem<T> => {
  return {
    exists: !!item,
    item,
  };
};