import { Pagination } from "../entities/Pagination";
import { PaginationQuery } from "../entities/PaginationQuery";
import { Todo, TodoParams } from "../entities/Todo";

export abstract class ITodoService {
  abstract createTodo(title: string): Promise<Todo>;
  abstract getTodo(id: string): Promise<Todo | null>;
  abstract getTodos(query?: PaginationQuery): Promise<Pagination<Todo>>;
  abstract updateTodo(
    id: string,
    params: Omit<Partial<TodoParams>, "id">
  ): Promise<boolean>;
  abstract removeTodo(id: string): Promise<boolean>;
}
