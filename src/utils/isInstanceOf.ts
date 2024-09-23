export function isInstanceOf<T>(
  item: any,
  ClassType: new (...args: any[]) => T
): boolean {
  return item instanceof ClassType;
}
