import { useState } from "react";
import { useTodoStore } from "../stores/todoStore";
import { HookFunction } from "../types/HookFunction";
import { HookState } from "../types/HookState";
import { todoApiService } from "../http/TodoApiService";
import { Todo } from "../../../core/entities/Todo";

export type UseRemoveTodoFunction = HookFunction<Todo>;

export type UseRemoveTodo = () => [HookState<boolean>, UseRemoveTodoFunction];

export const useRemoveTodo: UseRemoveTodo = () => {
  const { removeTodo } = useTodoStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);

  const remove: UseRemoveTodoFunction = async (todo) => {
    try {
      setLoading(true);
      const response = await todoApiService.removeTodo(todo.id);
      if (response.success) {
        removeTodo(todo);
        setData(true);
        return;
      }
      throw new Error(response.error.message);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return [{ data, error, loading }, remove];
};
