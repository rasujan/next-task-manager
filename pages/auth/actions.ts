export const AUTH_ACTIONS = {
  login: () => ({
    url: "/auth/login",
    asyncActions: {
      init: "@LOGIN/INIT",
      success: "@LOGIN/SUCCESS",
      error: "@LOGIN/ERROR",
    },
  }),
};

export const setTheme = "@SET_THEME";
export const toggleTheme = "@TOGGLE_THEME";
