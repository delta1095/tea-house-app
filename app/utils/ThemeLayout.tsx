"use client";

import { Button, Theme } from "@radix-ui/themes";
import { ReactElement, useEffect, useState } from "react";

type Theme = "light" | "inherit" | "dark";

export const ThemeLayout = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const newTheme = (localStorage.getItem("theme") || "inherit") as Theme;

    if (newTheme) {
      setTheme(newTheme);
    }
  }, []);

  return (
    <Theme appearance={theme}>
      <div
        style={{
          width: "min(1200px, 100%)",
          marginInline: "auto",
          padding: "1rem",
        }}
      >
        <Button
          variant="surface"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            setTheme((prev) => {
              localStorage.setItem(
                "theme",
                prev === "light" ? "dark" : "light"
              );
              return prev === "light" ? "dark" : "light";
            });
          }}
        >
          {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
        </Button>
        {children}
      </div>
    </Theme>
  );
};
