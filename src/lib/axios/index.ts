// lib/axios/index.ts
import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // ← 이 값이 undefined라면 에러 발생
  timeout: 5000,
});

export default apiInstance;
