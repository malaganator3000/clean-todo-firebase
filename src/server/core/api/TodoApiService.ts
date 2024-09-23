import { DataResponse } from "../../../core/entities/DataResponse";
import { Pagination } from "../../../core/entities/Pagination";
import { PaginationQuery } from "../../../core/entities/PaginationQuery";
import { Todo } from "../../../core/entities/Todo";
import { ITodoApiService } from "../../../core/http/ITodoApiService";
import { ITodoService } from "../../../core/services/ITodoService";
import { FirebaseTodoRepository } from "../repositories/FirebaseTodoRepository";
import { TodoService } from "../services/TodoService";

export class TodoApiService extends ITodoApiService {
  private todoService: ITodoService;
  constructor() {
    super();
    // const todoRepository = new InMemoryTodoRepository();
    const todoRepository = new FirebaseTodoRepository();
    this.todoService = new TodoService(todoRepository);
  }

  async getTodos(
    query?: PaginationQuery
  ): Promise<DataResponse<Pagination<Todo>>> {
    try {
      const todosPagination = await this.todoService.getTodos(query);
      return {
        success: true,
        data: {
          ...todosPagination,
          list: todosPagination.list,
        },
      };
    } catch (error: any) {
      console.error(error)
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code || 500,
        },
      };
    }
  }
  async getTodo(id: string): Promise<DataResponse<Todo | null>> {
    try {
      const todo = await this.todoService.getTodo(id);
      return {
        success: true,
        data: todo || null,
      };
    } catch (error: any) {
      console.error(error)
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code || 500,
        },
      };
    }
  }
  async createTodo(title: string): Promise<DataResponse<Todo>> {
    try {
      const todo = await this.todoService.createTodo(title);

      return {
        success: true,
        data: todo,
      };
    } catch (error: any) {
      console.error(error)
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code || 500,
        },
      };
    }
  }
  async updateTodo(
    id: string,
    todo: Partial<Todo>
  ): Promise<DataResponse<boolean>> {
    try {
      await this.todoService.updateTodo(id, todo);
      return {
        success: true,
        data: true,
      };
    } catch (error: any) {
      console.error(error)
      return {
        success: false,
        error: { message: error.message, code: error.code || 500 },
      };
    }
  }
  async removeTodo(id: string): Promise<DataResponse<boolean>> {
    try {
      await this.todoService.removeTodo(id);
      return {
        success: true,
        data: true,
      };
    } catch (error: any) {
      console.error(error)
      return {
        success: false,
        error: { message: error.message, code: error.code || 500 },
      };
    }
  }
}
