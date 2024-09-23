import { Pagination } from "../../../core/entities/Pagination";
import { PaginationQuery } from "../../../core/entities/PaginationQuery";
import { Todo } from "../../../core/entities/Todo";
import { ITodoRepository } from "../../../core/repositories/ITodoRepository";

export class InMemoryTodoRepository implements ITodoRepository {
  private tasks: Todo[] = [];
  async findAll(query?: PaginationQuery): Promise<Pagination<Todo>> {
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 10;
    const startIndex = (page - 1) * pageSize; //offset
    const endIndex = startIndex + pageSize; //offset + pageSize
    const preTask = [...this.tasks]
    const paginatedTasks = preTask.splice(startIndex, endIndex);

    return {
      list: paginatedTasks,
      hasNextPage: endIndex < this.tasks.length,
      hasPreviousPage: startIndex > 0,
    };
  }
  async findById(id: string): Promise<Todo | null> {
    const task = this.tasks.find((t) => t.id == id);
    if (!task) {
      return null;
    }

    return task;
  }
  async create(todo: Todo): Promise<Todo> {
    this.tasks.push(todo);

    return todo;
  }
  async update(todo: Todo): Promise<boolean> {
    const todoIndex = this.tasks.findIndex((t) => t.id == todo.id);
    if (todoIndex !== -1) {
      this.tasks[todoIndex] = todo;
      return true;
    }

    return false;
  }
  async delete(id: string): Promise<boolean> {
    const todoIndex = this.tasks.findIndex((t) => t.id == id);
    if (todoIndex !== -1) {
      this.tasks.splice(todoIndex, 1);
      return true;
    }

    return false;
  }
}
