import type { FC } from "react";
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

const App = React.lazy(() => import("./App"));
const Home = React.lazy(() => import("./Home"));
const Result = React.lazy(() => import("./Result"));

const Routing: FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </HashRouter>
  );
};

export default Routing;
