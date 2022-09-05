import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

prisma.brand.createMany({
  data: [
    { brandName: "BMW" },
    { brandName: "Toyota" },
    { brandName: "Mercedes-Benz" },
    { brandName: "Ferrari" },
    { brandName: "Lexus" },
    { brandName: "Hyundai" },
  ],
});

prisma.car.createMany({
  data: [
    {
      color: "red",
      year: 2016,
      brand_Id: 1,
    },
    {
      color: "yellow",
      year: 2021,
      brand_Id: 2,
    },
    {
      color: "Green",
      year: 2021,
      brand_Id: 5,
    },
    {
      color: "Black",
      year: 2019,
      brand_Id: 3,
    },
    {
      color: "gray",
      year: 2022,
      brand_Id: 4,
    },
  ],
});
