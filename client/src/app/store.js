import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import mobileSidebarReducer from "../features/mobileSidebar/mobileSidebarSlice";
import filterSidebarReducer from "../features/filterSidebar/filterSidebarSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import { cakeApi } from "../services/cakeApi";

const persistConfig = {
  key: "root",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    [cakeApi.reducerPath]: cakeApi.reducer,
    authenticated: persistedReducer,
    cart: persistedCartReducer,
    sidebar: mobileSidebarReducer,
    filterSidebar: filterSidebarReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(cakeApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;
