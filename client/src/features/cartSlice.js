import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload.cartItem;
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
