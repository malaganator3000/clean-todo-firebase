import { ITodoRepository } from "../repositories/ITodoRepository";
import { Todo, TodoParams } from "../entities/Todo";
import { GetTodo } from "./GetTodo";

export class UpdateTodo {
  constructor(
    private todoRepository: ITodoRepository,
    private getTodoUseCase: GetTodo
  ) {}

  async execute(
    id: string,
    newParams: Omit<Partial<TodoParams>, "id">
  ): Promise<boolean> {
    const existingTodo = await this.getTodoUseCase.execute(id);
    if (newParams.title) {
      existingTodo.title = newParams.title;
    }

    if (newParams.completed) {
      existingTodo.completed = newParams.completed;
    }

    existingTodo.updatedAt = new Date();
    return this.todoRepository.update(existingTodo);
  }
}
