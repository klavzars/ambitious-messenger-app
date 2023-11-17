const friendsDao = require('./newFriend.dao');

// sendRequest
const sendRequest = async (senderId, receiverId) => {
  const isLimited = await friendsDao.isFriendshipLimitExceeded(senderId);
  if (isLimited) {
    throw new Error('Friendship limit exceeded');
  }
  //Create a request log in the database
  const requestLog = await friendsDao.createFriendRequest(senderId, receiverId);
  return requestLog;
};

// getFriendList
const getFriendList = async (userId) => {
  const friends = await friendsDao.getAllFriendships(userId);
  return friends;
};

// acceptRequest
const acceptRequest = async (userId, requestId) => {
  const updatedFriendship = await friendsDao.acceptFriendRequest(userId, requestId);
  return updatedFriendship;
};

// declineRequest
const declineRequest = async (userId, requestId) => {
  await friendsDao.declineFriendRequest(userId, requestId);
};

module.exports = {
  sendRequest,
  getFriendList,
  acceptRequest,
  declineRequest,
};
