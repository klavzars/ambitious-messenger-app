//@prisma/client
const { PrismaClient } = require("@prisma/client");
const { logError } = require("../../lib/error/errorHandler");
const prisma = new PrismaClient();

// Get user profile
const getUserProfile = async (userId) => {
  try {
    return await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        username: true,
        email: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

// Get all user profiles
const getAllUserProfiles = async () => {
  try {
    return await prisma.user.findMany({
      select: {
        username: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const get = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  } catch (error) {
    logError(error);
  }
};

const getByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    logError(error);
  }
};

const create = async (email, password, username) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    return user;
  } catch (error) {
    logError(error);
  }
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
