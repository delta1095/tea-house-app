// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // Define all categories and products
//   const categories = [
//     {
//       name: "Yogurt Series",
//       products: [
//         { name: "Peach Yogurt" },
//         { name: "Mango Yogurt" },
//         { name: "Orange Yogurt" },
//         { name: "Strawberry Yogurt" },
//       ],
//     },
//     {
//       name: "Fruit Tea Series",
//       products: [
//         { name: "Peach Fruit Tea" },
//         { name: "Mango Fruit Tea" },
//         { name: "Passion Fruit Tea" },
//         { name: "Orange Fruit Tea" },
//         { name: "Pineapple Fruit Tea" },
//         { name: "Strawberry Fruit Tea" },
//         { name: "Lemon Jasmine Tea" },
//       ],
//     },
//     {
//       name: "Boba Series",
//       products: [{ name: "Chocolate Boba" }, { name: "Coffee Boba" }],
//     },
//     {
//       name: "Matcha Series",
//       products: [{ name: "Matcha Yazu" }, { name: "Matcha Ketadot" }],
//     },
//     {
//       name: "Mojito Series",
//       products: [
//         { name: "Mint Mojito" },
//         { name: "Lychee Mojito" },
//         { name: "Fresh Blue Mojito" },
//         { name: "Watermelon Mojito" },
//       ],
//     },
//     {
//       name: "Cheese Series",
//       products: [
//         { name: "Cheese Mango" },
//         { name: "Cheese Strawberry" },
//         { name: "Cheese Peach" },
//         { name: "Cheese Orange" },
//       ],
//     },
//     {
//       name: "Chocolate Series",
//       products: [
//         { name: "Dirty & Dirty Delicate Ice" },
//         { name: "Oreo Blanc" },
//       ],
//     },
//     {
//       name: "Ice Series",
//       products: [
//         { name: "Ice Coffee" },
//         { name: "Ice Chocolate" },
//         { name: "Ice Coke/Fanta/Sprite" },
//       ],
//     },
//     {
//       name: "Other Series",
//       products: [{ name: "Lychee Cherry Blossom" }, { name: "Hot Tea" }],
//     },
//     {
//       name: "New!",
//       products: [{ name: "Matcha Coconut Frappe" }, { name: "Mango Pomelo" }],
//     },
//   ];

//   // Seed the categories and products
//   for (const category of categories) {
//     const createdCategory = await prisma.category.create({
//       data: {
//         name: category.name,
//         products: {
//           create: category.products.map((product) => ({
//             name: product.name,
//             sizes: {
//               create: [{ name: "One Size", price: 3.0 }],
//             },
//           })),
//         },
//       },
//     });

//     console.log(`Created category: ${createdCategory.name}`);
//   }
// }

// export async function GET(request: Request) {
//   main()
//     .catch((e) => {
//       console.error(e);
//       process.exit(1);
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });

//   return Response.json({ message: "data added successfully!" });
// }
