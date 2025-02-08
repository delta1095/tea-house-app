"use client";

import { Button, DropdownMenu, Grid } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useState } from "react";
import { accentAtom, themeAtom } from "../state";
import { Text } from "@radix-ui/themes";
import { Accent } from "../utils/ThemeLayout";

const colorList: Accent[] = [
  "gray",
  "gold",
  "bronze",
  "brown",
  "yellow",
  "amber",
  "orange",
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "mint",
  "sky",
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [theme, setTheme] = useAtom(themeAtom);
  const [accent, setAccent] = useAtom(accentAtom);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
          marginBottom: "0.6rem",
        }}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              Menu
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>Theme</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <Text as="label" size="2" style={{ marginBottom: "0.5rem" }}>
                  Theme Color
                </Text>
                <Grid columns="2" gap="1">
                  <Button
                    disabled={theme === "light"}
                    style={{
                      height: "36px",
                      width: "auto",
                      backgroundColor: "white",
                    }}
                    onClick={() => setTheme("light")}
                  ></Button>
                  <Button
                    disabled={theme === "dark"}
                    style={{
                      height: "36px",
                      backgroundColor: "black",
                    }}
                    onClick={() => setTheme("dark")}
                  ></Button>
                </Grid>
                <DropdownMenu.Separator />
                <Text as="label" size="2" style={{ marginBottom: "0.5rem" }}>
                  Accent Color
                </Text>

                <Grid columns="5" gap="2" width="auto">
                  {colorList.map((color) => (
                    <Button
                      disabled={accent === color}
                      key={color}
                      color={color}
                      style={{
                        height: "36px",
                        width: "36px",
                        borderRadius: "50%",
                      }}
                      onClick={() => setAccent(color)}
                    ></Button>
                  ))}
                </Grid>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <Button
              color="crimson"
              variant="soft"
              loading={logoutLoading}
              onClick={async () => {
                setLogoutLoading(true);
                const response = await fetch("/api/logout");

                const responseData = await response.json();

                if (responseData?.message == "success") {
                  return redirect("/login");
                }

                setLogoutLoading(false);
                return;
              }}
            >
              Log Out
            </Button>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <main>{children}</main>
    </div>
  );
}
