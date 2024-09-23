import { State } from "./State";

export type PageState<T> = Record<number, T[]>;
export type StateWithPagination<T> = State<T> & {
  pages: PageState<string>;
  currentPage: number;
};
