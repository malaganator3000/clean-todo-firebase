import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./routes";

let router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <RouterProvider router={router} />
);
