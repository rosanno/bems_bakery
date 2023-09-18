import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

const mobileSidebarSlice = createSlice({
  name: "mobileSidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = mobileSidebarSlice.actions;
export default mobileSidebarSlice.reducer;
