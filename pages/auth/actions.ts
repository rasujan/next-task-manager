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
