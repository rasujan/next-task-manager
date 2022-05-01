import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TASK_LIST_ACTIONS } from "./actions";
import { Task } from "@/types/task";

const { fetchTasks } = TASK_LIST_ACTIONS;

const {
  asyncActions: {
    init: fetchTasksInit,
    success: fetchTasksSuccess,
    error: fetchTasksError,
  },
} = fetchTasks();

type InitialStateType = {
  loading: boolean;
  tasks: Array<Task> | [];
  error: string;
};

const initialState: InitialStateType = {
  loading: false,
  tasks: [],
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksInit, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasksSuccess, (state, action: PayloadAction<[]>) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTasksError, (state, action: any) => {
      state.loading = false;
      state.tasks = [];
      state.error =
        action.error?.response?.data.message || "something went wrong";
    });
  },
});

export default authSlice.reducer;
