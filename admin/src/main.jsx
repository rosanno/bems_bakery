import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { router } from "./routes";
import ModalProvider from "./context/ContextProvider";
import { store } from "./store";
import DialogProvider from "./context/DialogContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <ModalProvider>
          <DialogProvider>
            <RouterProvider router={router} />
          </DialogProvider>
        </ModalProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
