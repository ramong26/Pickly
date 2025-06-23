export const runtime = "nodejs";

import { connectToDB } from "@/features/productId/libs/mongo";
import { YoutubeVideoModel } from "@/features/productId/hooks/YoutubeVideo";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  console.log("📌 [API 시작] /api/youtube-search 진입");
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "검색어가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    console.log("✅ MongoDB 연결됨");

    // 캐시 먼저 확인
    const cached = await YoutubeVideoModel.findOne({ query });
    if (cached) {
      console.log("📦 캐시에서 검색 결과 반환");
      return NextResponse.json({ items: [cached.videoData] });
    }

    // YouTube API 요청
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API 키가 없습니다" }, { status: 500 });
    }

    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: apiKey,
          part: "snippet",
          q: query,
          type: "video",
          maxResults: 1,
          order: "relevance",
        },
      }
    );

    const video = data.items[0];
    const videoData = {
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      publishedAt: video.snippet.publishedAt,
    };

    // DB에 저장
    await YoutubeVideoModel.create({ query, videoData });

    return NextResponse.json({ items: [videoData] });
  } catch (error) {
    console.error("YouTube API fetch or DB error:", error);
    return NextResponse.json({ error: "YouTube fetch 실패" }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const q = searchParams.get("q");

//   if (!q) {
//     return NextResponse.json(
//       { error: "Query parameter q is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
//     if (!apiKey) {
//       return NextResponse.json(
//         { error: "YouTube API key is missing" },
//         { status: 500 }
//       );
//     }

//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
//         q
//       )}&key=${apiKey}`
//     );

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "YouTube API request failed" },
//         { status: 500 }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     const err = error as Error;
//     console.error("YouTube API fetch error:", err);
//     return NextResponse.json(
//       {
//         error: "Failed to fetch data from YouTube API",
//         details: err.message,
//       },
//       { status: 500 }
//     );
//   }
// }
