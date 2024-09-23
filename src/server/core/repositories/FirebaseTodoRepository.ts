import { Pagination } from "../../../core/entities/Pagination";
import { PaginationQuery } from "../../../core/entities/PaginationQuery";
import { Todo } from "../../../core/entities/Todo";
import { ITodoRepository } from "../../../core/repositories/ITodoRepository";
import { firestore } from "../firestore";

export class FirebaseTodoRepository extends ITodoRepository {
  private collection = firestore.collection("todos");
  async findAll(query?: PaginationQuery): Promise<Pagination<Todo>> {
    const limit = query?.pageSize || 10;
    const offset = ((query?.page || 1) - 1) * limit;

    const snapshot = await this.collection
      .limit(limit)
      .offset(offset)
      .orderBy("createdAt", "asc")
      .get();

    const todos: Todo[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        completed: data.completed,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      };
    });

    const hasNextPage = todos.length === limit;
    const hasPreviousPage = query?.page ? query.page > 1 : false;

    return {
      list: todos,
      hasNextPage,
      hasPreviousPage,
    };
  }
  async findById(id: string): Promise<Todo | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data();
    if (!data) {
      return null;
    }
    return {
      id: doc.id,
      title: data.title,
      completed: data.completed,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  }
  async create(todo: Todo): Promise<Todo> {
    const todoData = {
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
    const docRef = await this.collection.add(todoData);
    return {
      id: docRef.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todoData.createdAt,
      updatedAt: todoData.updatedAt,
    };
  }
  async update(todo: Todo): Promise<boolean> {
    await this.collection.doc(todo.id).update({
      title: todo.title,
      completed: todo.completed,
      updatedAt: todo.updatedAt,
    });
    return true;
  }
  async delete(id: string): Promise<boolean> {
    await this.collection.doc(id).delete();
    return true;
  }
}
