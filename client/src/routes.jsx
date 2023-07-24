import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import ProductDetails from "./views/ProductDetails";
import Products from "./views/Products";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Order from "./views/Order";

import FAQ from "./views/Faq";
import Account from "./views/Account";
import Checkout from "./views/Checkout";
import Success from "./views/Success";
import Reviews from "./views/Reviews";
import ProductCategory from "./views/ProductCategory";
import SearchResults from "./views/SearchResults";

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
        element: <ProductCategory />,
      },
      {
        path: "customer/order",
        element: <Order />,
      },
      {
        path: "search/:search",
        element: <SearchResults />,
      },
      {
        path: "customer/review/:productId",
        element: <Reviews />,
      },
      {
        path: "user/:userId",
        element: <Account />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
    ],
  },
]);
