import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api-2/posts";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo")).user
    : null,
  accessToken: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo")).accessToken
    : null,
  userStatus: "idle",
};

export const registerUserAsync = createAsyncThunk(
  "auth/register",
  async ({ data, history }) => {
    const response = await registerUser(data);
    history.push("/");

    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async ({ data, history }) => {
    const response = await loginUser(data);
    history.push("/");
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutUser: (state) => {
      Cookies.remove("userInfo");
      state.user = null;
    },
  },
  extraReducers: {
    [registerUserAsync.pending]: (state) => {
      state.userStatus = "loading";
    },
    [registerUserAsync.fulfilled]: (state, { payload }) => {
      state.userStatus = "idle";
      state.user = payload.user;
      state.accessToken = payload.accessToken;

      Cookies.set("userInfo", JSON.stringify(payload));
    },
    [loginUserAsync.pending]: (state) => {
      state.userStatus = "loading";
    },
    [loginUserAsync.fulfilled]: (state, { payload }) => {
      state.userStatus = "idle";
      state.user = payload.user;
      state.accessToken = payload.accessToken;

      Cookies.set("userInfo", JSON.stringify(payload));
    },
  },
});

export const { logOutUser } = authSlice.actions;

// useSelector For authentication Status
export const authStatus = (state) => state.userStatus;

// useSelector For User
export const userSelector = (state) => state.users.user;

export default authSlice.reducer;
