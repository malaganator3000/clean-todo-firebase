import { Request, Response } from "express";
import { Controller } from "../Controller";
import { asyncHandler } from "../asyncHandler";
import { TodoApiService } from "../api/TodoApiService";

export class TodoController extends Controller {
  private todoApiService: TodoApiService;
  constructor() {
    super();
    this.todoApiService = new TodoApiService();
  }

  async gettodos(req: Request, res: Response) {
    const { page = 1, pageSize = 10 } = req.query;
    const paginationQuery = {
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
    };

    const result = await this.todoApiService.getTodos(paginationQuery);
    res.status(200).json(result);
  }

  async createtodo(req: Request, res: Response) {
    const { title } = req.body;
    const newtodo = await this.todoApiService.createTodo(title);
    res.status(201).json(newtodo);
  }

  async gettodo(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoApiService.getTodo(id);
    res.status(200).json(todo);
  }

  async updatetodo(req: Request, res: Response) {
    const { id } = req.params;
    const updatedtodo = req.body;
    const result = await this.todoApiService.updateTodo(id, updatedtodo);
    res.status(200).jsonp(result);
  }

  async deletetodo(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.todoApiService.removeTodo(id);
    res.status(200).jsonp(result);
  }
  initializeRoutes(): void {
    this.router.get("/api/todos", this.gettodos.bind(this));
    this.router.get("/api/todos/:id", asyncHandler(this.gettodo.bind(this)));
    this.router.post("/api/todos", this.createtodo.bind(this));
    this.router.put("/api/todos/:id", this.updatetodo.bind(this));
    this.router.delete("/api/todos/:id", this.deletetodo.bind(this));
  }
}
