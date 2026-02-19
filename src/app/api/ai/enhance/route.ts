import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { text, type, jobTitle } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide at least 10 characters of text to enhance." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt: string;

    if (type === "summary") {
      prompt = `You are a professional resume writer. Rewrite the following text as a polished, professional resume summary/profile section. Requirements:
- Fix all grammar and spelling mistakes
- Make it concise (2-4 sentences max)
- Use professional, action-oriented language
- Highlight key strengths and value proposition
- Write in first person without using "I" (e.g., "Experienced developer with..." not "I am an experienced developer")
${jobTitle ? `- The person's job title/role is: ${jobTitle}` : ""}

Original text:
"${text}"

Return ONLY the improved summary text, nothing else. No quotes, no explanations.`;
    } else if (type === "experience") {
      prompt = `You are a professional resume writer. Rewrite the following job description for a resume. Requirements:
- Fix all grammar and spelling mistakes
- Use bullet-point style (each point on a new line starting with •)
- Start each bullet with a strong action verb
- Include metrics/numbers where possible
- Keep it concise and impactful
${jobTitle ? `- The role is: ${jobTitle}` : ""}

Original text:
"${text}"

Return ONLY the improved description text, nothing else. No quotes, no explanations.`;
    } else {
      prompt = `You are a professional resume writer. Improve the following text for use in a professional resume. Fix grammar, improve clarity, and make it sound professional and impactful.

Original text:
"${text}"

Return ONLY the improved text, nothing else. No quotes, no explanations.`;
    }

    const result = await model.generateContent(prompt);
    const response = result.response;
    const enhanced = response.text().trim();

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error("AI enhance error:", error);
    return NextResponse.json(
      { error: "Failed to enhance text. Please try again." },
      { status: 500 }
    );
  }
}
