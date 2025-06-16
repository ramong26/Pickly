import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // API 서버 기본 주소
  headers: {
    "Content-Type": "application/json",
  },
  // 필요에 따라 타임아웃, 인터셉터 등 설정 가능
});

export default apiInstance;
