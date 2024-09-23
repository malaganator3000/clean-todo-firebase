import { DataResponse } from "../../../core/entities/DataResponse";
import { Pagination } from "../../../core/entities/Pagination";
import { PaginationQuery } from "../../../core/entities/PaginationQuery";
import { Todo } from "../../../core/entities/Todo";
import { ITodoApiService } from "../../../core/http/ITodoApiService";
import { environment } from "../../../environments/environments";

export class TodoApiService extends ITodoApiService {
  private apiUrl: string = `${environment.apiHost}/api/todos`;

  async getTodos(
    query: PaginationQuery = { page: 1, pageSize: 10 }
  ): Promise<DataResponse<Pagination<Todo>>> {
    try {
      const queryParams = new URLSearchParams(query as any).toString();
      const response = await fetch(`${this.apiUrl}?${queryParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data: DataResponse<Pagination<Todo>> = await response.json();
      return data;
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 500 } };
    }
  }

  async getTodo(id: string): Promise<DataResponse<Todo | null>> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch task");
      }

      const data: DataResponse<Todo> = await response.json();
      return data;
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 500 } };
    }
  }

  async createTodo(title: string): Promise<DataResponse<Todo>> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data: DataResponse<Todo> = await response.json();
      return data;
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 500 } };
    }
  }

  async updateTodo(
    id: string,
    todo: Partial<Todo>
  ): Promise<DataResponse<boolean>> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const data: DataResponse<boolean> = await response.json();
      return data;
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 500 } };
    }
  }

  async removeTodo(id: string): Promise<DataResponse<boolean>> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      const data: DataResponse<boolean> = await response.json();
      return data;
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 500 } };
    }
  }
}

export const todoApiService = new TodoApiService();
