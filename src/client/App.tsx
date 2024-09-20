import React from "react";
import {Home} from "./pages/home";
import {About} from "./pages/about";
interface AppProps {
  page: "home" | "about" | "contact";
  params?: string;
  data?:any
}

export const App: React.FC<AppProps> = ({ page, params, data }) => {
  switch (page) {
    case "home":
      return <Home tasks={data}/>;
    case "about":
      return <About/>;
    case "contact":
      return <div>Contact</div>;
    default:
      return <div>Home</div>;
  }
};

export default App;