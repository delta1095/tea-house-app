import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token");

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!);

    return NextResponse.json({ data: decoded });
  } catch (error) {
    return NextResponse.json({ data: null });
  }
}
