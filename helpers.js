import prisma from "./services/prisma.js"

export async function getCars(filter = ""){
    const allCars = await prisma.car.findMany()
    return allCars
}