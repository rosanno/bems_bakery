import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./views/Overview";
import Category from "./views/Category";
import Ingredients from "./views/Ingredients";
import Products from "./views/Products";
import CreateProduct from "./views/CreateProduct";
import UpdateProduct from "./views/UpdateProduct";
import Order from "./views/Order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/ingredients",
        element: <Ingredients />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/edit-product/:productId",
        element: <UpdateProduct />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
]);
