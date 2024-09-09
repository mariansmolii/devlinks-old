import { createSlice } from "@reduxjs/toolkit";
import { login, logOut, refreshUser, register } from "./authOperations";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
  handleUserData,
} from "../../utils/helpers/handlers";

const initialState = {
  user: {
    id: "",
    email: "",
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStore: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, handleUserData)
      .addCase(login.fulfilled, handleUserData)
      .addCase(logOut.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        handleUserData(state, { payload });
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        handleFulfilled
      )
      .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        handleRejected
      );
  },
});

export const { resetStore } = authSlice.actions;
export const authReducer = authSlice.reducer;
