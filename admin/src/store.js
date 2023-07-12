import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { bakeryApi } from "./services/bakeryApi";
import authReducer from "./features/authSlice";
import idsReducer from "./features/idsSlice";

export const store = configureStore({
  reducer: {
    [bakeryApi.reducerPath]: bakeryApi.reducer,
    auth: authReducer,
    ids: idsReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bakeryApi.middleware),
});

setupListeners(store.dispatch);
