import axios, { ResponseType } from "axios";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const useAxois = () => {
  const credentialsReduxData = useSelector(
    (state: { credentials: { credentials: Record<string, unknown> } }) =>
      state.credentials.credentials
  );
  const generateHeader = (): Record<string, string> => {
    const header: Record<string, string> = {};
    if (credentialsReduxData !== undefined) {
      header["Authorization"] =
        `Bearer ${credentialsReduxData?.access}` as string;
    }
    return header;
  };

  const axoisGet = useCallback(
    async (
      url: string,
      params: Record<string, unknown> = {},
      responseType: ResponseType = "json"
    ) => {
      return axios
        .get(`${import.meta.env.VITE_API_URL}${url}`, {
          params: params,
          headers: {
            ...generateHeader(),
          },
          responseType: responseType,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error;
        });
    },
    []
  );

  const axiosPost = useCallback(
    async (
      url: string,
      body: Record<string, unknown>,
      isFile: boolean = false,
      responseType: ResponseType = "json"
    ) => {
      return await axios
        .post(`${import.meta.env.VITE_API_URL}${url}`, body, {
          headers: {
            ...generateHeader(),
            "Content-Type": isFile ? "multipart/form-data" : "application/json",
          },
          responseType,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error;
        });
    },
    []
  );

  const axiosPut = useCallback(
    async (
      url: string,
      body: Record<string, unknown>,
      isFile: boolean = false,
      responseType: ResponseType = "json"
    ) => {
      return await axios
        .put(`${import.meta.env.VITE_API_URL}${url}`, body, {
          headers: {
            ...generateHeader(),
            "Content-Type": isFile ? "multipart/form-data" : "application/json",
          },
          responseType,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error;
        });
    },
    []
  );

  const axiosPatch = useCallback(
    async (
      url: string,
      body: Record<string, unknown>,
      isFile: boolean = false,
      responseType: ResponseType = "json"
    ) => {
      return await axios
        .patch(`${import.meta.env.VITE_API_URL}${url}`, body, {
          headers: {
            ...generateHeader(),
            "Content-Type": isFile ? "multipart/form-data" : "application/json",
          },
          responseType,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error;
        });
    },
    []
  );

  const axiosDelete = useCallback(async (url: string) => {
    return await axios
      .delete(`${import.meta.env.VITE_API_URL}${url}`, {
        headers: {
          ...generateHeader(),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return {
    axoisGet,
    axiosPost,
    axiosPut,
    axiosPatch,
    axiosDelete,
  };
};

export default useAxois;
