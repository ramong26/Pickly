// ai에게 post 요청을 보내 아티스트와 앨범 이름을 추출하는 함수

export default async function fetchArtistAlbum(text: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL ||
        "https://teste-fms0t56na-ramong23s-projects.vercel.app";

  const apiPath = "/api/14-6/openai";

  const normalizedBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;

  const url = normalizedBaseUrl + apiPath;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  console.log("fetch URL:", url);
  if (!res.ok) {
    console.error("API 응답 실패", await res.text());
    return null;
  }

  const data = await res.json();
  return data.result;
}
