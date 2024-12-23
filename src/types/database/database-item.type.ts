export type DatabaseItem<T = unknown> = {
  exists: boolean;
  item: T | null;
}