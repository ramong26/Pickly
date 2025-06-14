import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/proxy",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie("access-token");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // post delete patch 요청에 CSRF 토큰 추가
    if (
      config.method &&
      ["post", "delete", "patch"].includes(config.method.toLowerCase())
    ) {
      const csrfToken = getCookie("csrf-token");
      if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.success === false) {
      return Promise.reject(response.data);
    }
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.success === false
    ) {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
