import axios from "axios";

// import { AUTH_ACTIONS } from "pages/auth/actionTypes";

export function setupAxios(store: any) {
  axios.interceptors.response.use(undefined, (error) => {
    // const { logout, maxReqExceedTrue } = AUTH_ACTIONS;

    const statusCode = error.response ? error.response.status : null;

    if (Number(statusCode) === 401) {
      //   store.dispatch({ type: logout });
      //   import { useRouter } from "next/router";
      window.location.href = "/";
    }

    return Promise.reject(error);
  });
}

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_REACT_APP_API_ENDPOINT}`,
  headers: { "X-Custom-Header": "foobar" },
});
