"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const storeToken = async (user: { username: string; token: string }) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: user.token,
    httpOnly: true,
    path: "/",
  });

  redirect("/home");
};
