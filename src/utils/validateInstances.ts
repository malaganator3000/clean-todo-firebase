import { isInstanceOf } from "./isInstanceOf";

export function validateInstances<T>(
  items: any[],
  ClassType: new (...args: any[]) => T
): boolean {
  if (!items || !Array.isArray(items)) return false;
  return items.every((item) => isInstanceOf(item, ClassType));
}
