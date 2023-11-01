const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// TODO check if user should add a name when creating the room on frontend
const create = async (isPrivate, members) => {
  const chat = await prisma.chat.create({
    data: {
      is_private: isPrivate,
    },
  });

  return chat;
};

const add = async (members, chatId) => {
  const users = await prisma.user.findMany({
    where: {
      username: {
        in: members,
      },
    },
  });

  const createdMembers = await prisma.member.createMany({
    data: users.map(({ username, user_id }) => ({
      username: username,
      chat_id: chatId,
      user_id: user_id,
      joined_date: new Date(),
    })),
  });

  return createdMembers;
};

const get = async (username) => {
  // Retrieve the user's data, including their user_id
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      member: {
        select: {
          chat_id: true, // Select the chat_id to use for retrieving chats
        },
      },
    },
  });

  // Retrieve all chats that the user is a member of
  const chats = await prisma.chat.findMany({
    where: {
      chat_id: {
        in: user.member.map((m) => m.chat_id),
      },
    },
    include: {
      member: true, // Include the member details for each chat
    },
  });

  console.log("chats", chats);

  return chats;
};

const getMember = async (chat_id, username) => {
  const member = await prisma.member.findFirst({
    where: {
      chat_id,
      username,
    },
  });

  return member;
};

const getSingle = async (chat_id) => {
  const chat = prisma.chat.findUnique({
    where: {
      chat_id,
    },
  });

  return chat;
};


const remove = async (member_id) => {
  const deletedMember = await prisma.member.delete({
    where: {
      id: member_id
    },
  });

  return deletedMember;
};

module.exports = { create, add, get, getSingle, remove, findMemberId };
