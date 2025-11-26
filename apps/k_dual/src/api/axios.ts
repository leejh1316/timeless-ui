import { devLog } from "@src/utils/common";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const requestLog = (config: AxiosRequestConfig): void => {
  const { method, url } = config;
  devLog(
    `%c[API Request]%c ${method?.toUpperCase() ?? "unknown method"} ${url} | Request`,
    "background-color: gray; color: white; padding: 2px; border-radius: 3px;",
    "color: inherit;",
    config,
  );
};

const responseLog = (response: AxiosResponse): void => {
  const { method, url } = response.config;
  const { status } = response;
  devLog(
    `%c[API Response]%c ${method?.toUpperCase() ?? "unknown method"} ${url} | Response ${status}`,
    "background-color: #09ba94; color: white; padding: 2px; border-radius: 3px;",
    "color: inherit;",
    response,
  );
};

const errorResponseLog = (error: AxiosError): void => {
  const { config, response } = error;
  devLog(
    `%c[API ERROR]%c ${config?.method?.toUpperCase() ?? "unknown method"} ${config?.url} | Error Response ${response?.status}`,
    "background-color: #f5425d; color: white; padding: 2px; border-radius: 3px;",
    "color: inherit;",
    response,
  );
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept:
      "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  },
});

const onRequest = (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const { headers = {} } = config;
  requestLog(config);

  return Promise.resolve({ ...config, headers } as InternalAxiosRequestConfig);
};

const onRequestError = (error: AxiosError<AxiosRequestConfig>) => {
  switch (true) {
    case Boolean(error.config):
      console.log("에러: 요청 실패", error);
      break;
    case Boolean(error.request):
      console.log("에러: 응답 없음", error);
      break;
    default:
      console.log("에러:", error);
      break;
  }
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;

  responseLog(response);

  return response;
};

const onErrorResponse = (error: AxiosError | Error) => {
  if (axios.isAxiosError(error)) {
    errorResponseLog(error);
    if (error.status === 401) {
    }
  }
  return Promise.reject(error);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onErrorResponse);

export { instance as axios };
