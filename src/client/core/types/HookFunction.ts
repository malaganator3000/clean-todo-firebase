export type HookFunction<T, S = void> = (value:T) => Promise<S>;
