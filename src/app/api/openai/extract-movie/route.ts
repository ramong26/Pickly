import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    });

    const prompt = `너는 사용자의 입력에서 영화나 드라마 제목을 추출해서 다음 JSON 형식으로만 응답해야 해:
{"trailer": "작품명 official trailer"}

예시:
입력: "어제 오펜하이머를 봤는데 정말 대단했어"
출력: {"trailer": "Oppenheimer official trailer"}

입력: "${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    const resultText = response.text ?? "";
    return NextResponse.json({ result: resultText.trim() });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Gemini API 호출 실패", detail: err.message },
      { status: 500 }
    );
  }
}
