import axios from "axios";
import { ProductTabType } from "../types/user";

export async function getUserProducts(
  userId: number,
  type: ProductTabType,
  cursor = 0
) {
  const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (!Base_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw";

  const baseUrlWithoutSlash = Base_URL.endsWith("/")
    ? Base_URL.slice(0, -1)
    : Base_URL;

  const url = `${baseUrlWithoutSlash}/14-6/users/${userId}/${type}-products`;

  const res = await axios.get(url, {
    params: { cursor },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.list;
}
