import axios from "axios";

export function setupAxios() {
  axios.interceptors.response.use(undefined, (error) => {
    const statusCode = error.response ? error.response.status : null;

    if (Number(statusCode) === 401) {
      window.location.href = "/";
    }

    return Promise.reject(error);
  });
}

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_REACT_APP_API_ENDPOINT}`,
  headers: { "X-Custom-Header": "foobar" },
});
