import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function getUserId() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId ?? null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, template: true, title: true, data: true, thumbnail: true, createdAt: true, updatedAt: true },
  });

  return NextResponse.json({ resumes });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { template, title, data, thumbnail } = body;

  if (!template || !data) {
    return NextResponse.json({ error: "template and data are required" }, { status: 400 });
  }

  const resume = await prisma.resume.create({
    data: {
      userId,
      template,
      title: title || "Untitled Resume",
      data,
      thumbnail: thumbnail || null,
    },
  });

  return NextResponse.json({ resume }, { status: 201 });
}
