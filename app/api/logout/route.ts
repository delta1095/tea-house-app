import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({ message: "success" });
  //   return NextResponse.redirect(new URL("/login", request.url));
}
