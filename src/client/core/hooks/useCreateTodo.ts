import { useState } from "react";
import { Todo } from "../../../core/entities/Todo";
import { todoApiService } from "../http/TodoApiService";
import { useTodoStore } from "../stores/todoStore";
import { HookFunction } from "../types/HookFunction";
import { HookState } from "../types/HookState";

export type UseCreatetodoFunction = HookFunction<string>;
export type UseCreateTodo = () => [
  HookState<Todo | null>,
  UseCreatetodoFunction
];

export const useCreateTodo: UseCreateTodo = () => {
  const { addTodo } = useTodoStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState<Todo | null>(null);
  const createTodo: UseCreatetodoFunction = async (title) => {
    try {
      setLoading(true);
      const response = await todoApiService.createTodo(title);

      if (response.success) {
        addTodo(response.data);
        setNewTodo(response.data);
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

  return [{ data: newTodo, error, loading }, createTodo];
};
