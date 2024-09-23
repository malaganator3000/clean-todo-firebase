import { Pagination } from "../entities/Pagination";
import { PaginationQuery } from "../entities/PaginationQuery";
import { Todo } from "../entities/Todo";

export abstract class ITodoRepository {
  abstract findAll(query?: PaginationQuery): Promise<Pagination<Todo>>;
  abstract findById(id: string): Promise<Todo | null>;
  abstract create(todo: Todo): Promise<Todo>;
  abstract update(todo: Todo): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
}
