import { ITodoRepository } from "../repositories/ITodoRepository";
import { GetTodo } from "./GetTodo";

export class DeleteTodo {
  constructor(
    private todoRepository: ITodoRepository,
    private getTodoUseCase: GetTodo
  ) {}

  async execute(id: string): Promise<boolean> {
    const existingTodo = await this.getTodoUseCase.execute(id);
    return this.todoRepository.delete(existingTodo.id);
  }
}
