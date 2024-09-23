import { Todo } from "../entities/Todo";
import { NotFoundException } from "../exceptions/not-found.exception";
import { ITodoRepository } from "../repositories/ITodoRepository";

export class GetTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo not found {${id}}`, "Todo");
    }

    return todo;
  }
}
