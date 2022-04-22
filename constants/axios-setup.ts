import axios from "axios";

// import { AUTH_ACTIONS } from "pages/auth/actionTypes";

export function setupAxios(store: any) {
  axios.interceptors.response.use(undefined, (error) => {
    // const { logout, maxReqExceedTrue } = AUTH_ACTIONS;

    const statusCode = error.response ? error.response.status : null;

    if (Number(statusCode) === 401) {
      //   store.dispatch({ type: logout });
      //   import { useRouter } from "next/router";
    }

    return Promise.reject(error);
  });
}
