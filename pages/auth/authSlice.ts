import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AUTH_ACTIONS, toggleTheme, setTheme } from "./actions";

const { login } = AUTH_ACTIONS;

const {
  asyncActions: { init: loginInit, success: loginSuccess, error: loginError },
} = login();

type InitialState = {
  loading: boolean;
  user: object;
  error: string;
  darkMode: boolean;
};

const initialState: InitialState = {
  loading: false,
  user: {},
  error: "",
  darkMode: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginInit, (state) => {
      state.loading = true;
    });
    builder.addCase(loginSuccess, (state, action: PayloadAction<object>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(loginError, (state, action: any) => {
      state.loading = false;
      state.user = {};
      state.error =
        action.error?.response?.data.message || "something went wrong";
    });
    builder.addCase(toggleTheme, (state) => {
      state.darkMode = !state.darkMode;
    });
    builder.addCase(setTheme, (state, action: any) => {
      state.darkMode = !!action.payload;
    });
  },
});

export default authSlice.reducer;
