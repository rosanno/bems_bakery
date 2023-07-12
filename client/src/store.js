import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modalSlice";
import { bakeryApi } from "./services/bakeryApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [bakeryApi.reducerPath]: bakeryApi.reducer,
    authSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bakeryApi.middleware),
});

setupListeners(store.dispatch);
