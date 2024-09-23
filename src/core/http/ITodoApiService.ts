import { DataResponse } from "../entities/DataResponse";
import { Pagination } from "../entities/Pagination";
import { PaginationQuery } from "../entities/PaginationQuery";
import { Todo } from "../entities/Todo";

export abstract class ITodoApiService {
  abstract getTodos(
    query?: PaginationQuery
  ): Promise<DataResponse<Pagination<Todo>>>;
  abstract getTodo(id: string): Promise<DataResponse<Todo | null>>;
  abstract createTodo(title: string): Promise<DataResponse<Todo>>;
  abstract updateTodo(
    id: string,
    todo: Partial<Todo>
  ): Promise<DataResponse<boolean>>;
  abstract removeTodo(id: string): Promise<DataResponse<boolean>>;
}
