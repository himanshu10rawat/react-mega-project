import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import blogReducer from "./blogSlice";

const store = configureStore({
  reducer: { authReducer, blogReducer },
});

export default store;
