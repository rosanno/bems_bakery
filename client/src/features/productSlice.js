import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },
    setProduct: (state, action) => {
      state.product = action.payload.product;
    },
  },
});

export const { setProducts, setProduct } = productsSlice.actions;

export default productsSlice.reducer;
