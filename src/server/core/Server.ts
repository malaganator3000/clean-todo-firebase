import express, { Application } from "express";
import React from "react";
import {
  createStaticHandler,
  createStaticRouter,
  StaticHandlerContext,
  StaticRouterProvider,
} from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import routes from "../../client/routes";
import { createFetchRequest } from "./request";
import { Controller } from "./Controller";
import { errorMiddleware } from "./errorMiddleware";

export class Server {
  private app: Application;
  private controllers: Controller[] = [];

  constructor(app: Application) {
    this.app = app;
  }

  public start(port: number): void {
    this.app.use(express.static("public"));
    this.app.use("views", express.static("views"));
    this.app.set("view engine", "pug");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));


    this.controllers.forEach((controller) => {
      this.app.use(controller.getRouter());
    });

    this.app.use(errorMiddleware);

    // Ruta para React y Server-Side Rendering
    this.app.get("*", async (req, res) => {
      let handler = createStaticHandler(routes);
      let fetchRequest = createFetchRequest(req, res);
      let context = await handler.query(fetchRequest);
      let router = createStaticRouter(
        handler.dataRoutes,
        context as StaticHandlerContext
      );
      const appHTML = renderToString(
        React.createElement(StaticRouterProvider, {
          router: router,
          context: context as StaticHandlerContext,
        })
      );
      res.render("index", {
        appHTML,
        titlePage: "Home",
      });
    });

    this.app.listen(port, () => {
      console.log(`Server listening on port http://localhost:${port}`);
    });
  }

  public addController(controller: Controller): void {
    this.controllers.push(controller);
  }
}
