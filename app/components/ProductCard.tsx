import * as React from "react";
import { Box, Button, Card, Heading, Text } from "@radix-ui/themes";

export const ProductCard = ({
  category,
  items,
  addedProducts,
  setAddedProducts,
}: {
  category: string;
  items: ({
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
  addedProducts: Record<
    string,
    {
      quantity: number;
      price: number;
    }
  >;
  setAddedProducts: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          quantity: number;
          price: number;
        }
      >
    >
  >;
}) => {
  return (
    <>
      <Box style={{ marginTop: "24px" }}>
        <Heading size="4">{category}</Heading>
        <Card>
          <div
            style={{
              display: "grid",
              gap: "16px",
              gridTemplateColumns: "repeat( auto-fill, minmax(240px, 1fr) )",
            }}
          >
            {items.map((item) => (
              <Card
                key={item.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "200px",
                }}
              >
                <Heading size="2" style={{ marginBottom: "4px" }}>
                  {item.name}
                </Heading>
                <div>
                  {item.sizes.map((size) => (
                    <Box
                      key={size.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        placeContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <Text as="div">
                        {size.name}: Nu.{size.price.toFixed(2)}
                      </Text>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Button
                          style={{ marginTop: "auto", cursor: "pointer" }}
                          variant="soft"
                          onClick={() => {
                            if (
                              addedProducts[size.id]?.quantity ||
                              addedProducts[size.id].quantity > 0
                            ) {
                              setAddedProducts((prev) => {
                                return {
                                  ...prev,
                                  [size.id]: {
                                    quantity: prev[size.id].quantity - 1,
                                    price:
                                      (prev[size.id].quantity - 1) * size.price,
                                  },
                                };
                              });
                            }
                          }}
                        >
                          -
                        </Button>
                        {addedProducts[size.id]?.quantity || 0}
                        <Button
                          style={{ marginTop: "auto", cursor: "pointer" }}
                          variant="soft"
                          onClick={() => {
                            if (
                              !addedProducts[size.id]?.quantity ||
                              addedProducts[size.id].quantity < 0
                            ) {
                              setAddedProducts((prev) => {
                                return {
                                  ...prev,
                                  [size.id]: { quantity: 1, price: size.price },
                                };
                              });
                            } else {
                              setAddedProducts((prev) => {
                                return {
                                  ...prev,
                                  [size.id]: {
                                    quantity: prev[size.id].quantity + 1,
                                    price:
                                      (prev[size.id].quantity + 1) * size.price,
                                  },
                                };
                              });
                            }
                          }}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </Box>
    </>
  );
};
