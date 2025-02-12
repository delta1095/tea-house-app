import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token");

  console.log({ token });

  const data: {
    addedProducts: Record<
      string,
      { price: number; item: string; quantity: number }
    >;
  } = await request.json();

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token?.value || "", secret);

    const items: {
      sizeId: string;
      name: string;
      quantity: number;
      price: number;
    }[] = [];
    let total = 0;

    Object.entries(data.addedProducts).forEach(([key, value]) => {
      total = total + value.price;
      items.push({
        sizeId: key,
        name: value.item,
        quantity: value.quantity,
        price: value.price,
      });
    });

    const transactionData = { total, items };

    const newTransaction = await prisma.transaction.create({
      data: transactionData,
    });

    return NextResponse.json({ status: "success", newTransaction });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "error",
      error: "Some error occurred! Please try again.",
    });
  }
}
