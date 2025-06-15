// ai에게 post 요청을 보내 아티스트와 앨범 이름을 추출하는 함수

export default async function fetchArtistAlbum(text: string) {
  const url = "/api/14-6/openai";
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
