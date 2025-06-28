import { NextResponse } from "next/server";
import OpenAI from "openai";

import { connectToDB } from "@/features/productId/libs/mongo";
import { OpenAIMusicQuery } from "@/features/productId/hooks/monggoSchema";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json(
        { error: "Missing text in request body" },
        { status: 400 }
      );
    }
    await connectToDB();

    const cached = await OpenAIMusicQuery.findOne({ query: text });
    if (cached) {
      return NextResponse.json({ result: cached.result, cached: true });
    }
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            'You are an assistant that extracts artist and album names. Always respond with a JSON object like {"artist":"...","album":"..."}. If the album name is not directly mentioned, use your knowledge to infer and fill in the official album name.',
        },
        {
          role: "user",
          // ai에게 명령하는 코드 (정확도를 높이고 싶으면 더 자세히 작성해야 함)
          content: `
  Given the following text, always use the first line (product name) as the most important clue.
  Prioritize the product name (first line) when inferring the official artist and album name.
  You may use your knowledge and external information to infer the correct names.
  Ultimately, always output the official artist and album names as registered on Spotify.
  If the official Spotify name is in English, use the English name. If not, use the official Korean name.
  Always respond ONLY with a JSON object like {"artist":"...","album":"..."}.

  예시:
  입력: "Project X
  Ken Carson의 앨범으로, Playboi Carti의 레이블 Opium을 통해 출시됨. Star Boy와 Outtatown이 주로 프로듀싱을 담당함. 장르: Rage, Pop-Trap. 대표곡: 'Rock n Roll', 'Run + Ran', 'Change'."
  출력: {"artist":"Ken Carson","album":"Project X"}

  입력: "상품명: HIT ME HARD AND SOFT, 설명: 빌리 아일리시의 3집 앨범은 2024년 5월 17일 발매되었으며..."
  출력: {"artist":"Billie Eilish","album":"HIT ME HARD AND SOFT"}

  입력: "상품명: LILAC, 설명: 아이유의 5집 앨범은 2021년에 발매됐다."
  출력: {"artist":"아이유","album":"LILAC"}

  입력: "상품명: WINGS, 설명: 방탄소년단의 2집 앨범은 2016년에 발매됐다."
  출력: {"artist":"BTS","album":"WINGS"}

  텍스트: ${text}
            `,
        },
      ],
    });

    const result = completion.choices[0].message?.content || "";
    await OpenAIMusicQuery.create({
      query: text,
      result,
      createdAt: new Date(),
    });
    return NextResponse.json({ result });
  } catch (error) {
    const err = error as Error;
    console.error("OpenAI API 호출 실패:", {
      message: err.message,
      name: err.name,
      stack: err.stack,
      cause: err.cause,
    });
    return NextResponse.json(
      { error: "OpenAI API 호출 실패", detail: err.message },
      { status: 500 }
    );
  }
}
