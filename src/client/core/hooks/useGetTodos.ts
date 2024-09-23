import { useEffect, useState } from "react";
import { Todo } from "../../../core/entities/Todo";
import { useTodoStore } from "../stores/todoStore";
import { getTodosLoader } from "../loaders/getTodos";
import { HookFunction } from "../types/HookFunction";
import { HookState } from "../types/HookState";

export type UseGetTodosRetriveParams =
  | {
      query?: {
        page: number;
        pageSize: number;
      };
      cache?: boolean;
    }
  | undefined;
export type UseGetTodosRetrive = HookFunction<UseGetTodosRetriveParams>;
export type UseGetTodosNext = HookFunction<boolean>;
export type UseGetTodosPrevious = HookFunction<boolean>;
export type UseGetTodos = [
  HookState<Todo[]>,
  UseGetTodosRetrive,
  UseGetTodosNext,
  UseGetTodosPrevious
];

export const useGetTodos = (defaults: Todo[] = []): UseGetTodos => {
  const { todos, setTodos, setCurrentPage } = useTodoStore();
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const getTodos: UseGetTodosRetrive = async (
    params: UseGetTodosRetriveParams
  ) => {
    if (!initialized) return;
    setLoading(true);
    seterror(null);
    const { currentPage, pages } = todos;
    //pages no esta listo cuando se llama por primera vez aun que ya se le halla metido valores por default
    if (params) {
      const { query, cache } = params;
      if (cache && query?.page && pages[query?.page]) {
        const cachedTodos = pages[query.page].map((id) => todos.values[id]);
        if (cachedTodos.length > 0) {
          setCurrentPage(query.page);
          setLoading(false);
          return;
        }
      }
    }

    try {
      const todos = await getTodosLoader(
        params?.query?.page,
        params?.query?.pageSize
      );
      setTodos({ todos: todos, page: params?.query?.page });
    } catch (error: any) {
      seterror(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const nextPage: UseGetTodosNext = async (cache = true) => {
    if (todos.pages[todos.currentPage + 1]) {
      await getTodos({
        query: { page: todos.currentPage + 1, pageSize: 10 },
        cache,
      });
    }
  };

  const previousPage: UseGetTodosPrevious = async (cache = true) => {
    if (todos.currentPage > 1) {
      await getTodos({
        query: { page: todos.currentPage - 1, pageSize: 10 },
        cache,
      });
    }
  };

  useEffect(() => {
    if (defaults.length > 0 && Object.keys(todos.values).length === 0) {
      setTodos({ todos: defaults, page: 1 });
      setInitialized(true);
    } else {
      setInitialized(true);
    }
  }, []);

  return [
    {
      data:
        todos.pages[todos.currentPage]?.map((id) => todos.values[id]) ||
        defaults,
      error,
      loading,
    },
    getTodos,
    nextPage,
    previousPage,
  ];
};
