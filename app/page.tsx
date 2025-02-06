"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    // const verifyUser = async () => {
    //   const response = await fetch("/api/verify-user");
    //   const user = await response.json();

    //   if (!user.data) {
    //     redirect("/login");
    //   } else {
    //     redirect("/dashboard");
    //   }
    // };

    // verifyUser();

    redirect("/home");
  }, []);

  return <div style={{ padding: "16px" }}>Home</div>;
}
