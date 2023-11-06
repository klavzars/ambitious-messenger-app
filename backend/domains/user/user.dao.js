//@prisma/client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get user profile
const getUserProfile = async (userId) => {
  return await prisma.user.findUnique({
      where: {
          user_id: userId,
      },
      select: {
          username: true,
          email: true,
      },
  });
};

// Get all user profiles
const getAllUserProfiles = async () => {
  return await prisma.user.findMany();
};

const get = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

const getByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const create = async (email, password, username) => {
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });

  return user;
};

const update = async () => {};

module.exports = {
  getUserProfile,
  getAllUserProfiles,
  get,
  create,
  update,
  getByEmail,
};
