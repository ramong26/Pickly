import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { code, redirectUri } = req.body;

  if (!code || !redirectUri) {
    return res.status(400).json({ message: "Missing code or redirectUri" });
  }

  try {
    // 구글 토큰 교환 요청
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, id_token } = tokenResponse.data;

    // 구글 사용자 정보 요청
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = userInfoResponse.data;

    // TODO: user 정보로 DB 확인 후 회원가입 or 로그인 처리

    // 예시: 성공 시 JWT 토큰 발급 후 응답
    // 여기서는 간단히 유저 정보 반환
    res.status(200).json({ user, id_token });
  } catch (error) {
    const err = error as Error;
    console.error("Google OAuth API error:", err.message);
    res.status(500).json({ message: "Google OAuth failed" });
  }
}
