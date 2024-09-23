import { ITodoRepository } from "../repositories/ITodoRepository";
import { Todo } from "../entities/Todo";
import { Pagination } from "../entities/Pagination";
import { PaginationQuery } from "../entities/PaginationQuery";

export class GetTodos {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(query?: PaginationQuery): Promise<Pagination<Todo>> {
    return this.todoRepository.findAll(query);
  }
}
