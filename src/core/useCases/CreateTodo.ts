import { ITodoRepository } from "../repositories/ITodoRepository";
import { Todo } from "../entities/Todo";

export class CreateTodo {
  constructor(private todoRepository: ITodoRepository) {}

  async execute(title: string): Promise<Todo> {
    const newTodo: Todo = {
      id: new Date().getTime().toString(),
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.todoRepository.create(newTodo);
  }
}
