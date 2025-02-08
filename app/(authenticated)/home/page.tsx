import { PrismaClient } from "@prisma/client";
import { Products } from "../../components/Products";

const prisma = new PrismaClient();

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          sizes: true, // Include sizes for each product
        },
      },
    },
  });

  return <Products categories={categories} />;
}
