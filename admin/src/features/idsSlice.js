import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload.id;
    },
    resetId: (state) => {
      state.id = null;
    },
  },
});

export const { setId, resetId } = categorySlice.actions;

export default categorySlice.reducer;

export const selectCategory = (state) => state.category.id;
