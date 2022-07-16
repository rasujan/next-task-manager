import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TASK_LIST_ACTIONS } from "./actions";
import { Task } from "@/types/task";

const { fetchTasks, fetchTaskDetail } = TASK_LIST_ACTIONS;

const {
  asyncActions: { success: fetchTasksSuccess },
} = fetchTasks();

const {
  asyncActions: { success: fetchTaskDetailSuccess },
} = fetchTaskDetail();

type InitialStateType = {
  tasks: Array<Task> | [] | null;
  taskDetail: Task | null;
};

const initialState: InitialStateType = {
  tasks: null,
  taskDetail: null,
};

export const authSlice = createSlice({
  name: "TaskList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksSuccess, (state, action: PayloadAction<[]>) => {
      state.tasks = action.payload;
    });
    builder.addCase(
      fetchTaskDetailSuccess,
      (state, action: PayloadAction<Task>) => {
        state.taskDetail = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
