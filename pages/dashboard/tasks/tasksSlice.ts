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
  tasks: Array<Task> | [] | null;
};

const initialState: InitialStateType = {
  tasks: null,
};

export const authSlice = createSlice({
  name: "TaskList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksInit, (state) => {
      state.tasks = null;
    });
    builder.addCase(fetchTasksSuccess, (state, action: PayloadAction<[]>) => {
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasksError, (state) => {
      state.tasks = [];
    });
  },
});

export default authSlice.reducer;
