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

//move/delete a friends
const moveFriend = async (userId)=>{
  try {
    const moveFriendMessege = await friendsDao.moveFriendMessege(userId);
    if (!moveFriendMessege) {
      throw new HTTP400Error("Failed to move friend");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendRequest,
  getFriendList,
  acceptRequest,
  declineRequest,
  moveFriend,
};
