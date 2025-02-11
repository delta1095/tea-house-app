"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Box, Card, DataList, Tabs, Text } from "@radix-ui/themes";
// import Image from "next/image";

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
        imageUrl?: string | null;
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
    Record<string, { quantity: number; price: number; item: string }>
  >({});

  return (
    <div>
      <Tabs.Root defaultValue="account">
        <Card
          style={{
            backgroundColor: "var(--accent-1)",
            position: "sticky",
            width: "100%",
            padding: "8px",
            top: 8,
            right: 0,
            zIndex: 1,
            // height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text size="5">
            {`Total: Nu.${Object.values(addedProducts).reduce(
              (acc, { price }) => acc + price,
              0
            )}`}
          </Text>
          <Tabs.List>
            <Tabs.Trigger value="account">Drinks</Tabs.Trigger>
            <Tabs.Trigger value="documents">Order</Tabs.Trigger>
            <Tabs.Trigger value="settings">Confirm</Tabs.Trigger>
          </Tabs.List>
        </Card>

        <Box pt="3">
          <Tabs.Content value="account">
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
          </Tabs.Content>

          <Tabs.Content value="documents">
            {Object.entries(addedProducts).map(([id, order]) => {
              return (
                <Card key={id} style={{ marginBottom: "0.5rem" }}>
                  <DataList.Root>
                    <DataList.Item align="center">
                      <DataList.Label minWidth="88px">Item</DataList.Label>
                      <DataList.Value>{order.item}</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label minWidth="88px">Quantity</DataList.Label>
                      <DataList.Value>{order.quantity}</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label minWidth="88px">Price</DataList.Label>
                      <DataList.Value>{order.price}</DataList.Value>
                    </DataList.Item>
                  </DataList.Root>
                </Card>
              );
            })}
          </Tabs.Content>

          <Tabs.Content value="settings">
            <Text size="2">
              Edit your profile or update contact information.
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
};
