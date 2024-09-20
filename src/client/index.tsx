import React from "react";
import { hydrateRoot } from "react-dom/client";
import {App} from "./App"

if (typeof window !== "undefined") {
  const root = document.getElementById("root");
  if (root) {
    const page =(window as any).__PAGE__
    const params = (window as any).__PARAMS__
    const data = (window as any).__DATA__
    hydrateRoot(root, <App page={page} params={params} data={data}/>);
  }
}
