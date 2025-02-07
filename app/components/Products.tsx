"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Box, Button, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";

export const Products = ({
  categories,
}: {
  categories: ({
    products: ({
      sizes: {
        name: string;
        id: string;
        price: number;
        productId: string;
      }[];
    } & {
      name: string;
      id: string;
      categoryId: string;
      description: string | null;
    })[];
  } & {
    name: string;
    id: string;
  })[];
}) => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [addedProducts, setAddedProducts] = useState<
    Record<string, { quantity: number; price: number }>
  >({});

  return (
    <div style={{ padding: "16px" }}>
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
      <Box
        style={{
          backgroundColor: "var(--accent-1)",
          position: "sticky",
          width: "100%",
          padding: "8px",
          top: 0,
          right: 0,
          zIndex: 1,
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "var(--accent-8" }} size="5">
          {`Total: Nu.${Object.values(addedProducts).reduce(
            (acc, { price }) => acc + price,
            0
          )}`}
        </Text>
        <Button variant="solid" style={{ cursor: "pointer" }}>
          Proceed
        </Button>
      </Box>
      <Box>
        {categories.map((category) => (
          <ProductCard
            key={category.id}
            category={category.name}
            items={category.products}
            addedProducts={addedProducts}
            setAddedProducts={setAddedProducts}
          />
        ))}
      </Box>
    </div>
  );
};
