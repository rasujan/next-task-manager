import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TASK_LIST_ACTIONS } from "./actions";
import { Task } from "@/types/task";

const { fetchTasks } = TASK_LIST_ACTIONS;

const {
  asyncActions: { success: fetchTasksSuccess },
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
    builder.addCase(fetchTasksSuccess, (state, action: PayloadAction<[]>) => {
      state.tasks = action.payload;
    });
  },
});

export default authSlice.reducer;
