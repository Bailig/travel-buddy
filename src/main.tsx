import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./containers/Routing";
import "./index.css";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
);
