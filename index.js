import prisma from "./services/prisma.js";
import express from "express";
import cors from "cors";
import { getCars } from "./helpers.js";
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/cars", async (req, res) => {
  const { filter } = req.query;
  const myCars = await getCars(filter);
  res.send(myCars);
});

app.get("/cars/:carId", async (req, res) => {
  const { carId: carIdStr } = req.params;
  const carId = Number(carIdStr) || 0;
  const myCar = await prisma.car.findMany({
    where: {
      id: carId,
    },
  });
  if (!carId) return res.status(400).json({ message: "Bad Request" });

  const foundCar = myCar.find((car) => car.id === carId);

  if (!foundCar) return res.status(404).json({ message: "Not found" });
  res.send(myCar);
});

app.delete("/cars/:carId", async (req, res) => {
  const { carId: carIdStr } = req.params;
  const carId = Number(carIdStr) || 0;
  const deletedCar = await prisma.car.delete({
    where: {
      id: carId,
    },
  });
  res.send(deletedCar);
});

app.post("/cars", async (req, res) => {
  let data = "";
  req.on("data", (chunk) => (data += chunk));
  req.on("end", async () => {
    const { color, year, brand_Id } = JSON.parse(data);
    if (!color || !year || !brand_Id) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const newCar = await prisma.car.create({
      data: {
        color,
        year: Number(year),
        brand_Id: Number(brand_Id),
      },
    });
    res.send(newCar);
  });
});

app.put("/cars/:carId", async (req, res) => {
  const { carId: carIdStr } = req.params;
  const carId = Number(carIdStr) || 0;
  console.log(carId);
  let data = "";
  req.on("data", (chunk) => (data += chunk));
  req.on("end", async () => {
    const { color, year, brand_Id } = JSON.parse(data);
    if (!color || !year || !brand_Id) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const updatedCar = await prisma.car.update({
      data: {
        color,
        year: Number(year),
        brand_Id: Number(brand_Id),
        id: carId,
      },
      where: {
        id: carId,
      },
    });
    res.send(updatedCar);
  });
});

app.get("/brands", async (req, res) => {
  const brands = await prisma.brand.findMany();
  res.send(brands);
});

app.get("/brands/:brandId", async (req, res) => {
  const { brandId: brandIdStr } = req.params;
  const brandId = Number(brandIdStr) || 0;
  const myBrand = await prisma.brand.findMany({
    where: {
      id: brandId,
    },
  });
  if (!brandId) return res.status(400).json({ message: "Bad Request" });
  const foundBrand = myBrand.find((brand) => brand.id === brandId);

  if (!foundBrand) return res.status(404).json({ message: "Not found" });
  res.send(myBrand);
});

app.post("/brands", async (req, res) => {
  let data = "";
  req.on("data", (chunk) => (data += chunk));
  req.on("end", async () => {
    const { brandName } = JSON.parse(data);
    if (!brandName) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const newBrand = await prisma.brand.create({
      data: {
        brandName,
      },
    });
    res.send(newBrand);
  });
});

app.put("/brands/:brandId", async (req, res) => {
  const { brandId: brandIdStr } = req.params;
  const brandId = Number(brandIdStr) || 0;
  console.log(brandId);
  let data = "";
  req.on("data", (chunk) => (data += chunk));
  req.on("end", async () => {
    const { brandName } = JSON.parse(data);
    if (!brandName) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const updatedBrand = await prisma.brand.update({
      data: {
        brandName,
        id: brandId,
      },
      where: {
        id: brandId,
      },
    });
    res.send(updatedBrand);
  });
});

app.delete("/brands/:brandId", async (req, res) => {
  const { brandId: brandIdStr } = req.params;
  const brandId = Number(brandIdStr) || 0;
  const deletedBrand = await prisma.brand.delete({
    where: {
      id: brandId,
    },
  });
  res.send(deletedBrand);
});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
