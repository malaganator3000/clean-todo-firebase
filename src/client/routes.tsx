import React from "react";
import { RouteObject, useLoaderData } from "react-router-dom";
import { Tasks } from "./pages/tasks";
import { DashboardLayout } from "./layouts/dashboard.layout";
import { ErrorPage } from "./pages/not-found";
import { getTodosLoader } from "./core/loaders/getTodos";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayout title="Clean Todo Firebase" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "tasks",
        loader: async () => {
          try {
            const todos = await getTodosLoader();
            return { todos };
          } catch (error) {
            console.error(error);
            return { todos: [] };
          }
        },
        Component: () => {
          const { todos } = useLoaderData() as any;
          return <Tasks tasks={todos} />;
        },
      },
    ],
  },
];

export default routes;
