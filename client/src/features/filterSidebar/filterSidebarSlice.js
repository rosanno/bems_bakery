import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

const filterSidebarSlice = createSlice({
  name: "mobileSidebar",
  initialState,
  reducers: {
    toggleFilterSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleFilterSidebar } = filterSidebarSlice.actions;
export default filterSidebarSlice.reducer;
