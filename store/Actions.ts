import { AnyObject } from "@/types/globalTypes";
import Api from "constants/api";

const AppApi = new Api();

function onInit(actions: AnyObject | any) {
  return {
    type: actions.init,
  };
}

function onSuccess(
  actions: AnyObject | any,
  payload: object,
  extraProps?: object | undefined
) {
  return {
    type: actions.success,
    payload,
    ...extraProps,
  };
}

function onError(
  actions: AnyObject | any,
  error: object | unknown,
  extraProps?: object | undefined
) {
  return {
    type: actions.error,
    error,
    ...extraProps,
  };
}

function getRequest(
  asyncActions: object,
  url: string,
  extraProps?: object | undefined
) {
  return async (
    dispatch: (arg0: { type: any; payload?: object }) => void,
    getState: () => {
      auth: {
        user: {
          accessToken?: "";
        };
      };
    }
  ) => {
    const {
      auth: {
        user: { accessToken = "" },
      },
    } = getState();

    dispatch(onInit(asyncActions));

    try {
      const result = await AppApi.get(url, accessToken);

      return dispatch(onSuccess(asyncActions, result, extraProps));
    } catch (error) {
      return dispatch(onError(asyncActions, extraProps));
    }
  };
}

function postRequest(
  asyncActions: object | undefined,
  url: string,
  postData: object,
  extraProps?: object
) {
  return async (dispatch: any) => {
    dispatch(onInit(asyncActions));

    try {
      const result = await AppApi.post(url, postData);

      return dispatch(onSuccess(asyncActions, result, extraProps));
    } catch (error) {
      return dispatch(onError(asyncActions, error, extraProps));
    }
  };
}

function putRequest(asyncActions: undefined, url: string, postData: object) {
  return async (
    dispatch: (arg0: { type: any; payload?: object }) => void,
    getState: () => {
      user: {
        userResponse: {
          authToken?: "" | undefined;
        };
      };
    }
  ) => {
    const {
      user: {
        userResponse: { authToken = "" },
      },
    } = getState();

    dispatch(onInit(asyncActions));

    try {
      const result = await AppApi.put(url, postData, authToken);

      return dispatch(onSuccess(asyncActions, result));
    } catch (error) {
      return dispatch(onError(asyncActions, error));
    }
  };
}

function patchRequest(
  asyncActions: undefined,
  url: string,
  postData: object,
  extraProps: object
) {
  return async (
    dispatch: (arg0: { type: any; payload?: object }) => void,
    getState: () => {
      user: {
        userResponse: {
          authToken?: "" | undefined;
        };
      };
    }
  ) => {
    const {
      user: {
        userResponse: { authToken = "" },
      },
    } = getState();

    dispatch(onInit(asyncActions));

    try {
      const result = await AppApi.patch(url, postData, authToken);

      return dispatch(onSuccess(asyncActions, result, extraProps));
    } catch (error) {
      return dispatch(onError(asyncActions, error, extraProps));
    }
  };
}

function deleteRequest(
  asyncActions: undefined,
  url: string,
  extraProps: object
) {
  return async (
    dispatch: (arg0: { type: any; payload?: object }) => void,
    getState: () => {
      user: {
        userResponse: {
          authToken?: "" | undefined;
        };
      };
    }
  ) => {
    const {
      user: {
        userResponse: { authToken = "" },
      },
    } = getState();

    dispatch(onInit(asyncActions));

    try {
      const result = await AppApi.delete(url, authToken);

      return dispatch(onSuccess(asyncActions, result, extraProps));
    } catch (error) {
      return dispatch(onError(asyncActions, error, extraProps));
    }
  };
}

export { getRequest, postRequest, putRequest, patchRequest, deleteRequest };
