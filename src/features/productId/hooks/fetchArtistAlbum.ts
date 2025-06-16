export default async function fetchArtistAlbum(text: string) {
  console.log("🔥 fetchArtistAlbum 호출됨", text);

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL!; // 여기 수정

  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
  console.log(
    "NEXT_PUBLIC_API_BASE_URL:",
    process.env.NEXT_PUBLIC_API_BASE_URL
  );
  console.log("baseUrl:", baseUrl);

  const apiPath = "/14-6/api/openai";
  const normalizedBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;

  const url = normalizedBaseUrl + apiPath;
  console.log("fetch URL:", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  console.log("fetch response status:", res.status);
  const responseText = await res.text();
  console.log("fetch response text:", responseText);

  if (!res.ok) {
    console.error("API 응답 실패", responseText);
    return null;
  }

  const data = JSON.parse(responseText);
  return data.result;
}
