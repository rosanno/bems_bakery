import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload.user;
    },
    resetAuthUser: (state, action) => {
      return initialState;
    },
  },
});

export const { setToken, setCurrentUser, resetAuthUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
