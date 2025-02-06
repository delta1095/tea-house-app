import { generateToken } from "@/app/utils/generateToken";
import { PrismaClient } from "@prisma/client";
import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest, response: NextResponse) {
  const data = await request.json();

  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    path: "/",
  });

  if (!data.username || !data.password) {
    return Response.json({
      error: true,
      message: "Please enter your username and password to proceed.",
    });
  }

  const user = await prisma.user.findFirst({
    where: { username: data.username },
  });

  if (!user) {
    return Response.json({
      error: true,
      message: "No user found with the provided details.",
    });
  }

  const password_hash = createHmac("sha256", `${process.env.HASH}${user?.num}`)
    .update(data.password)
    .digest("hex");

  console.log(password_hash);

  if (password_hash !== user?.password_hash) {
    return Response.json({
      error: true,
      message: "The credentials you entered are incorrect.",
    });
  }

  const token = generateToken({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    isAdmin: user.is_admin,
  });

  return Response.json({ username: user.username, token });
}
