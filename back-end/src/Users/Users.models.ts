import prisma from "../lib/PrismaClient";
import CustomError from "../middlewares/Error/customError";
import { BAD_REQUEST } from "../middlewares/Error/ErrorConstructor";

const getUsers = async () => {
  const users = await prisma.users.findMany();
  return users;
}

// id it's a cuid generated by Prisma
const getUserById = async (id: string) => {
  const user = await prisma.users.findUnique({ where: { id }, include: { posts: true } });
  if(!user) {
    throw new CustomError("User not found", BAD_REQUEST.statusCode);
  }
  return user;
}

export default {
  getUsers,
  getUserById
};
