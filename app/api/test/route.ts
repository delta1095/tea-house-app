import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  // const products = await prisma.product.findMany({
  //   where: {
  //     categoryId: "674fb93f47a0538d943c6727",
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  // const productIds = products.map((product) => product.id);

  // if (productIds.length === 0) {
  //   console.log("No products found in this category.");
  //   return;
  // }

  // const updatedSizes = await prisma.size.updateMany({
  //   where: {
  //     productId: {
  //       in: productIds,
  //     },
  //   },
  //   data: {
  //     price: 150,
  //   },
  // });

  // console.log(`${updatedSizes.count} sizes updated.`);

  // NextResponse.json({ message: "updated" });

  prisma.size.updateMany({ data: { imageUrl: "cld-sample-5" } });

  NextResponse.json({ message: "success" });
};
