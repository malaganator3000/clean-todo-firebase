import { useState } from "react";
import { Todo } from "../../../core/entities/Todo";
import { useTodoStore } from "../stores/todoStore";
import { HookState } from "../types/HookState";
import { todoApiService } from "../http/TodoApiService";

export type UseUpdateTodoFunction = (todo: Todo) => Promise<void>;
export type UseUpdateTodo = () => [HookState<boolean>, UseUpdateTodoFunction];

export const useUpdateTodo:UseUpdateTodo = () => {
  const { updateTodo } = useTodoStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);

  const update: UseUpdateTodoFunction = async (todo) => {
    try {
      setLoading(true);
      const response = await todoApiService.updateTodo(todo.id, todo);
      if (response.success) {
        updateTodo(todo);
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

  return [{ data, error, loading }, update];
};
