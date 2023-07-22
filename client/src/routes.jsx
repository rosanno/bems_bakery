import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import ProductDetails from "./views/ProductDetails";
import Products from "./views/Products";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Order from "./views/Order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "product/details/:productId",
        element: <ProductDetails />,
      },
      {
        path: "product/:category",
        element: <Products />,
      },
      {
        path: "customer/order",
        element: <Order />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
    ],
  },
]);
