const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (user, isPrivate, members) => {
  const chat = await prisma.chat.create({
    data: {
      is_private: isPrivate,
      member: {
        createMany:,
      },
    },
  });
};
