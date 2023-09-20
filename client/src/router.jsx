import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "./components/RootLayout";
import Home from "./pages/Home";
import Cakes from "./pages/Cakes";
import CakeDetails from "./pages/cakeDetails/CakeDetails";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Faq from "./pages/Faq";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cakes/:search?",
        element: <Cakes />,
      },
      {
        path: "/cakes/:category",
        element: <Cakes />,
      },
      {
        path: "/cake-details/:cakeId",
        element: <CakeDetails />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/proceed-cart-item-checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account/:userId",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
    ],
  },
]);
