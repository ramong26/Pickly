import axios from "axios";
// import { cookies } from "next/headers";
import { ProductTabType } from "../types/user";

export async function getUserProducts(
  userId: number,
  type: ProductTabType,
  cursor = 0
) {
  const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;
  //   const cookieStore = cookies();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw";

  //   (await cookieStore).get("accessToken")?.value;

  //   if (!token) {
  //     throw new Error("인증 토큰이 없습니다.");
  //   }

  const res = await axios.get(`${Base_URL}/users/${userId}/${type}-products`, {
    params: { cursor },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.list;
}
