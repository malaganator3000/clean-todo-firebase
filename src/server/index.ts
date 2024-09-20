import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/App";
const getTasks = () => {
  return [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
  ];
};
const PORT = process.env["PORT"] || 3000;
const app = express();
app.use(express.static("public"));
app.use("views", express.static("views"));
app.set("view engine", "pug");
app.get("/", (req, res) => {
  const tasks = getTasks();
  const appHTML = renderToString(
    React.createElement(App, { page: "home", data: tasks })
  );
  res.render("index", {
    page: "home",
    appHTML,
    titlePage: "Home",
    data: JSON.stringify(tasks),
  });
});
app.get("/about", (req, res) => {
  const appHTML = renderToString(React.createElement(App, { page: "about" }));
  res.render("index", { page: "about", appHTML, titlePage: "About" });
});
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
