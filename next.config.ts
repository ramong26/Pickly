import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. basePath 추가
  basePath: "/14-6",

  // 2. 환경변수 그대로 유지
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default nextConfig;
