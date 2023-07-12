import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setId: (state, payload) => {
      state._id = payload;
    },
    resetId: (state) => {
      state._id = null;
    },
  },
});

export const { setId, resetId } = categorySlice.actions;

export default categorySlice.reducer;

export const selectCategory = (state) => state.category.id;
