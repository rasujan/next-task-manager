export const TASK_LIST_ACTIONS = {
  fetchTasks: () => {
    return {
      url: "/tasks",
      asyncActions: {
        init: "@FETCH_TASK/INIT",
        success: "@FETCH_TASK/SUCCESS",
        error: "@FETCH_TASK/ERROR",
      },
    };
  },

  addTask: () => {
    return {
      url: "/tasks",
      asyncActions: {
        init: "@ADD_TASK/INIT",
        success: "@ADD_TASK/SUCCESS",
        error: "@ADD_TASK/ERROR",
      },
    };
  },
};
