"use client";

import { Button, Theme } from "@radix-ui/themes";
import { ReactElement, useEffect, useState } from "react";

type Theme = "light" | "inherit" | "dark";

export const ThemeSwitcher = ({ children }: { children: ReactElement }) => {
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            // variant="surface"
            style={{
              background: "transparent",
              color: "inherit",
            }}
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
            {theme === "light" ? "Use Dark Mode 🌙" : "Use Light Mode ☀️"}
          </Button>
        </div>
        {children}
      </div>
    </Theme>
  );
};
