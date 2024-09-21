import React from "react";
import { RouteObject, useLoaderData } from "react-router-dom";
import { Task, Home } from "./pages/home";
import { Tasks } from "./pages/tasks";

const routes:RouteObject[] = [
  {
    path: "/",
    async loader() {
      let response = await fetch("http://localhost:3000/tasks");
      let tasks = (await response.json()) as Task[];
      return tasks
    },
    Component() {
      let data = useLoaderData() as Task[];
      return <Tasks tasks={data} />;
    },
  },
];

export default routes;
