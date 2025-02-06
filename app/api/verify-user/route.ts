import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface CustomRequestCookie extends RequestCookie {
  value: string;
}

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const token: any = request.cookies.get("token");

  if (!token) {
    return NextResponse.json({ data: null });
  }

  const { value } = token;

  try {
    const decoded = jwt.verify(value || "", process.env.JWT_SECRET!);

    return NextResponse.json({ data: decoded });
  } catch (error) {
    return NextResponse.json({ data: null });
  }
}
