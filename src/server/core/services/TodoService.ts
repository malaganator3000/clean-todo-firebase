import { Pagination } from "../../../core/entities/Pagination";
import { PaginationQuery } from "../../../core/entities/PaginationQuery";
import { Todo, TodoParams } from "../../../core/entities/Todo";
import { ITodoRepository } from "../../../core/repositories/ITodoRepository";
import { ITodoService } from "../../../core/services/ITodoService";
import { CreateTodo } from "../../../core/useCases/CreateTodo";
import { GetTodo } from "../../../core/useCases/GetTodo";
import { GetTodos } from "../../../core/useCases/GetTodos";
import { DeleteTodo } from "../../../core/useCases/RemoveTodo";
import { UpdateTodo } from "../../../core/useCases/UpdateTodo";

export class TodoService implements ITodoService {
  private createTodoUseCase: CreateTodo;
  private getTodoUseCase: GetTodo;
  private getTodosUseCase: GetTodos;
  private updateTodoUseCase: UpdateTodo;
  private deleteTodoUseCase: DeleteTodo;

  constructor(private todoRepository: ITodoRepository) {
    this.getTodoUseCase = new GetTodo(this.todoRepository);
    this.createTodoUseCase = new CreateTodo(this.todoRepository);
    this.getTodosUseCase = new GetTodos(this.todoRepository);
    this.updateTodoUseCase = new UpdateTodo(
      this.todoRepository,
      this.getTodoUseCase
    );
    this.deleteTodoUseCase = new DeleteTodo(
      this.todoRepository,
      this.getTodoUseCase
    );
  }
  async getTodo(id: string): Promise<Todo> {
    return this.getTodoUseCase.execute(id);
  }

  async createTodo(title: string): Promise<Todo> {
    return this.createTodoUseCase.execute(title);
  }

  async getTodos(query?: PaginationQuery): Promise<Pagination<Todo>> {
    return this.getTodosUseCase.execute(query);
  }

  async updateTodo(
    id: string,
    params: Omit<Partial<TodoParams>, "id">
  ): Promise<boolean> {
    return this.updateTodoUseCase.execute(id, params);
  }

  async removeTodo(id: string): Promise<boolean> {
    return this.deleteTodoUseCase.execute(id);
  }
}
