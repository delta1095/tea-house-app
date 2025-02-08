"use client";

import { Theme } from "@radix-ui/themes";
import { ReactElement, useEffect } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "../state";
import { accentAtom } from "../state";

type Theme = "light" | "inherit" | "dark";
export type Accent =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky"
  | undefined;

export const ThemeLayout = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [accent, setAccent] = useAtom(accentAtom);

  useEffect(() => {
    const newTheme = (localStorage.getItem("theme") || "light") as Theme;
    const newAccent = (localStorage.getItem("accent") || "gray") as Accent;

    if (newTheme && newAccent) {
      setTheme(newTheme);
      setAccent(newAccent);
    }
  }, [setTheme, setAccent]);

  return (
    <Theme appearance={theme} accentColor={accent}>
      <div
        style={{
          width: "min(1200px, 100%)",
          marginInline: "auto",
          padding: "1rem",
        }}
      >
        {children}
      </div>
    </Theme>
  );
};
