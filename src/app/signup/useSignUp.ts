import apiInstance from "@/lib/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { AuthResponse } from "../signin/validationSchema";
import { AxiosError } from "axios";

interface OAuthSignUpForm {
  redirectUri: string;
  token: string;
  provider: "google" | "kakao";
  nickname: string;
}

export function useOAuthSignUpMutation(
  options?: UseMutationOptions<AuthResponse, AxiosError, OAuthSignUpForm>
) {
  const mutation = useMutation({
    mutationFn: async ({
      redirectUri,
      token,
      provider,
      nickname,
    }: OAuthSignUpForm) => {
      // 1. 백엔드에 OAuth 회원가입 요청
      const res = await apiInstance.post<AuthResponse>(
        `/auth/signUp/${provider}`,
        {
          redirectUri,
          token,
          nickname,
        }
      );

      const data = res.data;

      // 2. 받은 accessToken을 Next.js API Route로 전달하여 쿠키 저장
      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: data.accessToken,
        }),
      });

      return data;
    },
    ...options,
  });

  return mutation;
}
