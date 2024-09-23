export type HookState<T> = {
  data: T;
  error: string | null;
  loading: boolean;
};
