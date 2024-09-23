import { Router } from "express";

export abstract class Controller {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  abstract initializeRoutes(): void;

  getRouter() {
    return this.router;
  }
}
