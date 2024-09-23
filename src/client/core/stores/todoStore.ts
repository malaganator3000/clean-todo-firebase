import { create } from "zustand";
import { PageState, StateWithPagination } from "../types/StateWithPagination";
import { StateFunction } from "../types/StateFunction";
import { Todo } from "../../../core/entities/Todo";
export type TodoStore = {
  todos: StateWithPagination<Todo>;
  setTodos: StateFunction<{ todos: Todo[]; page?: number }>;
  addTodo: StateFunction<Todo>;
  updateTodo: StateFunction<Todo>;
  removeTodo: StateFunction<Todo>;
  getTodosByPage: StateFunction<number, Todo[]>;
  getTodoById: StateFunction<string, Todo>;
  setCurrentPage: StateFunction<number>;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: {
    ids: [],
    values: {},
    pages: {},
    currentPage: 1,
  },
  setTodos: ({ todos, page }) => {
    set((state) => {
      const todoMap = todos.reduce(
        (state, todo) => {
          state.ids.push(todo.id);
          state.values[todo.id] = todo;
          const page_ = page || state.currentPage;
          if (!state.pages[page_]) {
            state.pages[page_] = [];
          }
          state.pages[page_].push(todo.id);
          return state;
        },
        {
          ids: [],
          values: {},
          pages: {
            ...state.todos.pages,
          },
          currentPage: state.todos.currentPage,
        } as StateWithPagination<Todo>
      );
      return {
        todos: todoMap,
      };
    });
  },
  addTodo: (todo) => {
    set((state) => {
      return {
        todos: {
          ids: [...state.todos.ids, todo.id],
          values: {
            ...state.todos.values,
            [todo.id]: todo,
          },
          pages: {
            ...state.todos.pages,
            [state.todos.currentPage]: [
              ...state.todos.pages[state.todos.currentPage],
              todo.id,
            ],
          },
          currentPage: state.todos.currentPage,
        },
      };
    });
  },
  updateTodo: (todo) => {
    set((state) => {
      const newValues = {
        ...state.todos.values,
        [todo.id]: todo,
      };
      return {
        todos: {
          ...state.todos,
          values: newValues,
        },
      };
    });
  },
  removeTodo: (todo) => {
    set((state) => {
      const updatedPages = { ...state.todos.pages };
      const { [todo.id]: _, ...resto } = state.todos.values;
      Object.keys(updatedPages).forEach((page) => {
        updatedPages[Number(page)] = updatedPages[Number(page)].filter(
          (id) => id !== todo.id
        );
      });

      return {
        todos: {
          ...state.todos,
          ids: state.todos.ids.filter((t) => t !== todo.id),
          values: resto,
          pages: updatedPages,
        },
      };
    });
  },
  getTodosByPage: (page) => {
    const state = get();
    return (state.todos.pages[page] || []).map((id) => state.todos.values[id]);
  },
  getTodoById: (id) => {
    return get().todos.values[id] || null;
  },
  setCurrentPage: (page) => {
    set((state) => ({
      todos: {
        ...state.todos,
        currentPage: page,
      },
    }));
  },
}));
