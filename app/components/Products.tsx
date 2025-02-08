"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Box, Button, Text } from "@radix-ui/themes";

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
  const [addedProducts, setAddedProducts] = useState<
    Record<string, { quantity: number; price: number }>
  >({});

  return (
    <div>
      <Box
        style={{
          backgroundColor: "var(--accent-1)",
          position: "sticky",
          width: "100%",
          padding: "8px",
          top: 0,
          right: 0,
          zIndex: 1,
          // height: "72px",
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
