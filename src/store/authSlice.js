import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      if (action.payload.userData) {
        state.status = true;
      } else {
        console.error("Login Dispatch method is wrong!!!");
      }
      state.userData = action.payload.userData;
    },
    logout(state) {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
