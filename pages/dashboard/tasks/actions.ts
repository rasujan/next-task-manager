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

  fetchTaskDetail: (id?: string | number) => {
    return {
      url: `/tasks/${id}`,
      asyncActions: {
        init: "@TASK_DETAIL/INIT",
        success: "@TASK_DETAIL/SUCCESS",
        error: "@TASK_DETAIL/ERROR",
      },
    };
  },
};
