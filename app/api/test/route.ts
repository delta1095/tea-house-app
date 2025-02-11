import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  // Step 1: Find all products in the given category
  const products = await prisma.product.findMany({
    where: {
      categoryId: "674fb93f47a0538d943c6727",
    },
    select: {
      id: true,
    },
  });

  // Extract product IDs
  const productIds = products.map((product) => product.id);

  if (productIds.length === 0) {
    console.log("No products found in this category.");
    return;
  }

  // Step 2: Update all sizes where productId is in the found product IDs
  const updatedSizes = await prisma.size.updateMany({
    where: {
      productId: {
        in: productIds,
      },
    },
    data: {
      price: 150, // Set your new price value here
    },
  });

  console.log(`${updatedSizes.count} sizes updated.`);

  NextResponse.json({ message: "updated" });
};
