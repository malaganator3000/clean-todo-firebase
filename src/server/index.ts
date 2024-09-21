import express from "express";
import React from "react";
import {
  createStaticHandler,
  createStaticRouter,
  StaticHandlerContext,
  StaticRouterProvider,
} from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import routes from "../client/routes";
import { createFetchRequest } from "./request";

const PORT = process.env["PORT"] || 3000;
const app = express();
let handler = createStaticHandler(routes);
app.use(express.static("public"));
app.use("views", express.static("views"));
app.set("view engine", "pug");

app.get("/tasks", async (req, res) => {
  res.status(200).json([
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ]);
});

app.get("*", async (req, res) => {
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
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
