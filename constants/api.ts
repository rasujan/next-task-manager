/* eslint no-useless-catch: "off" */
import { instance as axios } from "./axios-setup";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export default class AppApi {
  cookieToken = Cookies.get("authToken");

  get = async (url: string, token: string) => {
    const finalConfig = {
      ...{},
      headers: {
        Authorization: `Bearer ${this.cookieToken || token || ""}`,
      },
    };

    try {
      const { data } = await axios.get(url, finalConfig);

      return data;
    } catch (e) {
      throw e;
    }
  };

  post = async (url: string, postData: object, token?: string) => {
    const finalConfig = {
      ...{},
      headers: {
        Authorization: `Bearer ${this.cookieToken || token || ""}`,
      },
    };

    try {
      const { data } = await axios.post(url, postData, finalConfig);

      return data;
    } catch (e) {
      e as AxiosError;
      throw e;
    }
  };

  put = async (url: string, patchData: object, token: string) => {
    const finalConfig = {
      ...{},
      headers: {
        "X-User-Token": token || "",
      },
    };

    try {
      const { data } = await axios.put(url, patchData, finalConfig);

      return data;
    } catch (e) {
      throw e;
    }
  };

  patch = async (url: string, patchData: object, token: string) => {
    const finalConfig = {
      ...{},
      headers: {
        "X-User-Token": token || "",
      },
    };

    try {
      const { data } = await axios.patch(url, patchData, finalConfig);

      return data;
    } catch (e) {
      throw e;
    }
  };

  delete = async (url: string) => {
    const finalConfig = {
      ...{},
      headers: {
        Authorization: `Bearer ${this.cookieToken || ""}`,
      },
    };

    try {
      const { data } = await axios.delete(url, finalConfig);

      return data;
    } catch (e) {
      throw e;
    }
  };
}
