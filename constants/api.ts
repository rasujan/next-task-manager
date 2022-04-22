/* eslint no-useless-catch: "off" */
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}/api/v1`;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default class CMSApi {
  get = async (url: string, token: string) => {
    const finalConfig = {
      ...{},
      headers: {
        "X-User-Token": token || "",
      },
    };

    try {
      const { data } = await axios.get(url, finalConfig);

      return data;
    } catch (e) {
      throw e;
    }
  };

  post = async (url: string, postData: object, token: string) => {
    const finalConfig = {
      ...{},
      headers: {
        "X-User-Token": token || "",
      },
    };

    try {
      const { data } = await axios.post(url, postData, finalConfig);

      return data;
    } catch (e) {
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

  delete = async (url: string, token: string) => {
    const finalConfig = {
      ...{},
      headers: {
        "X-User-Token": token || "",
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
