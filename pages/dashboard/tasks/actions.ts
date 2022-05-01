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
};
