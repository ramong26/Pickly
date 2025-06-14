import axios from "axios";

export async function getMyProfile() {
  const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (!Base_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw";

  // Base_URL 끝에 슬래시가 있을 수 있으니 제거하기
  const baseUrlWithoutSlash = Base_URL.endsWith("/")
    ? Base_URL.slice(0, -1)
    : Base_URL;

  // 필요한 경우 API 경로 추가 (예: /14-6)
  // const apiPath = "/14-6"; // 필요하면 여기에 추가
  // const url = `${baseUrlWithoutSlash}${apiPath}/users/me`;

  const url = `${baseUrlWithoutSlash}/users/me`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
