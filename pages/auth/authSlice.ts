import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AUTH_ACTIONS, toggleTheme, setTheme } from "./actions";

const { login } = AUTH_ACTIONS;

const {
  asyncActions: { success: loginSuccess },
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
    builder.addCase(loginSuccess, (state, action: PayloadAction<object>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
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
