import { PrismaClient } from "@prisma/client";
import { Products } from "../components/Products";
import { Button } from "@radix-ui/themes";

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

  return (
    <div>
      <Products categories={categories} />;
    </div>
  );
}
