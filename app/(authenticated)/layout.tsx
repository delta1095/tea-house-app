"use client";

import { Button, DropdownMenu } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const [logoutLoading, setLogoutLoading] = useState(false);

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
            <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
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
