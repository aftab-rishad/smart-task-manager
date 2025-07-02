import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.AI_API_KEY;

const ai = new GoogleGenerativeAI(apiKey as string);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        {
          error: {
            message: "Prompt is required",
          },
        },
        { status: 400 }
      );
    }

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.1,
      },
    });

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      text,
      status: "success",
    });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      {
        error: {
          message: "Something went wrong.",
        },
      },
      { status: 500 }
    );
  }
}
