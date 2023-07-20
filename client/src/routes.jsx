import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
