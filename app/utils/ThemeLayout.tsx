"use client";

import { Button, DropdownMenu, Theme } from "@radix-ui/themes";
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
          width: "min(1200px, 80%)",
          marginInline: "auto",
          padding: "1rem",
        }}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              Options
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              shortcut={theme === "light" ? "🌙" : "☀️"}
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
              Change Theme
            </DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                <DropdownMenu.Separator />
                <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Share</DropdownMenu.Item>
            <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {children}
      </div>
    </Theme>
  );
};
