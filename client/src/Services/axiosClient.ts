import axios, { AxiosError } from "axios";
import appConfig from "config";
import { rsaCrypt } from "Utils/rsaCrypt";

const axiosClient = axios.create({
  baseURL: appConfig.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getCsrfPayload = (method: string, url: string) => {
  return {
    url,
    method,
    timestamp: Date.now(),
  };
};

axiosClient.interceptors.request.use(
  async (config) => {
    if (config && config.headers) {
      const withCsrf = config.headers["with-csrf"];

      const csrfPayload = getCsrfPayload(config.method!, config.url!);
      const csrfToken = await rsaCrypt.encrypt(JSON.stringify(csrfPayload));

      if (csrfToken && withCsrf) {
        config.headers["csrf"] = csrfToken;
      }

      delete config.headers?.["with-csrf"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError<{ code: string; message: string }>) {
    return Promise.reject(error);
  }
);

export default axiosClient;
