import { configureStore } from "@reduxjs/toolkit";

import authSlice from "pages/auth/authSlice";
import tasksSlice from "pages/dashboard/tasks/tasksSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: tasksSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {},
    }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
