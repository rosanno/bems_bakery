import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      console.log(action.payload.accessToken);
      state.accessToken = action.payload.accessToken;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const { setAccessToken, setUser, resetState } =
  authSlice.actions;
export default authSlice.reducer;
