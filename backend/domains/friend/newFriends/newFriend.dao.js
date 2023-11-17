const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Check if friendship limit is exceeded
const isFriendshipLimitExceeded = async (userId) => {
  const friendshipCount = await prisma.friendships.count({
    where: { OR: [{ user_id: userId }, { friend_id: userId }], status: 1 },
  });
  return friendshipCount >= 1000; // Assuming the limit is 1000
};

// Create a friend request
const createFriendRequest = async (senderId, receiverId) => {
  const requestLog = await prisma.friendRequests.create({
    data: { sender_id: senderId, receiver_id: receiverId },
  });
  return requestLog;
};

// Get all friendships for a user
const getAllFriendships = async (userId) => {
  const friendships = await prisma.friendships.findMany({
    where: {
      OR: [{ user_id: userId }, { friend_id: userId }],
      status: 1,
    },
  });
  return friendships;
};

// Accept a friend request
const acceptFriendRequest = async (userId, requestId) => {
  const updatedFriendship = await prisma.friendships.update({
    where: { id: requestId, friend_id: userId },
    data: { status: 1 },
  });
  return updatedFriendship;
};

// Decline a friend request
const declineFriendRequest = async (userId, requestId) => {
  await prisma.friendRequests.delete({ where: { id: requestId, receiver_id: userId } });
};

module.exports = {
  isFriendshipLimitExceeded,
  createFriendRequest,
  getAllFriendships,
  acceptFriendRequest,
  declineFriendRequest,
};
