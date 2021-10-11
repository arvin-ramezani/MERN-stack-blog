import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import postReducer from "./posts/postSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: authSlice,
  },
});
