import axios from "axios";

import { errorHandler } from "./errorHandler";

interface ApiArgsModel {
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  url: string;
  headers?: object;
  params?: object;
  data?: object;
  isAuthorizationNeeded?: boolean;
}

export const baseURL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3001";

export const apiVersion1 = "api/v1";

const getHeader = (isAuthorizationNeeded: boolean) => {
  const header: {
    Authorization?: string;
  } = {};

  // if (isAuthorizationNeeded) {
  //   const token = JSON.parse(localStorage.getItem("token") || "");

  //   if (token) {
  //     header.Authorization = token ? `Bearer ${token}` : "";
  //     return header;
  //   }
  //   return header;
  // }
  return header;
};

export const api = async ({
  method,
  url,
  isAuthorizationNeeded = false,
  ...rest
}: ApiArgsModel) => {
  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.interceptors.request.use(
    (conf) => {
      // you can add some information before send it.
      // conf.headers['Auth'] = 'some token'
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      // errorHandler(error?.response);
      errorHandler(error?.response);
      return Promise.reject(error);
    }
  );

  try {
    const response = await instance({
      method: method,
      url: url,
      headers: getHeader(isAuthorizationNeeded),
      ...rest,
    });

    if (response) {
      return response.data;
    }
  } catch (error: any) {
    return error?.response?.data;
  }
};
