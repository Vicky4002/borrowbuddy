import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  "Books",
  "Electronics",
  "Cameras",
  "Tools",
  "Sports",
  "Gaming",
  "Musical Instruments",
  "Home Appliances",
  "Furniture",
  "Outdoor Equipment",
  "Other",
];

async function main() {
  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
    skipDuplicates: true,
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
