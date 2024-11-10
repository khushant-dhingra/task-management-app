import Axios, { AxiosRequestConfig, AxiosResponse, CancelToken } from "axios";
import getApiHost from "./getApiHost";

export interface IRequest<T = unknown> {
  url: string;
  body?: T;
  cancelToken?: CancelToken;
  options?: AxiosRequestConfig;
}

const initialAxios = Axios.create({
  baseURL: getApiHost(),
  withCredentials: true,
});

const Api = {
  post: <TRequest = unknown, TResponse = unknown>({
    url,
    body,
    cancelToken,
    options = {},
  }: IRequest<TRequest>): Promise<TResponse> =>
    initialAxios
      .post(url, body, { ...options, cancelToken })
      .then((response) => response.data?.data),

  delete: ({ url, options = {} }: IRequest): Promise<unknown> =>
    initialAxios.delete(url, options),

  get: <T = unknown>({ url, options }: IRequest): Promise<T> =>
    initialAxios
      .get(url, options)
      .then((response) => response.data?.data)
      .catch((error) => ({ hasError: true, ...error })),

  put: <TRequest = unknown, TResponse = unknown>({
    url,
    body,
    options = {},
  }: IRequest<TRequest>): Promise<AxiosResponse<TResponse>> =>
    initialAxios.put(url, body, options),

  patch: <T>({
    url,
    body,
    options = {},
  }: IRequest): Promise<AxiosResponse<T>> =>
    initialAxios.patch(url, body, options),
};

export default Api;
