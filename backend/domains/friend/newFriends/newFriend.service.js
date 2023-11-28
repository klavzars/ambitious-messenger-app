const friendsDao = require('./newFriend.dao');

// sendRequest
const sendRequest = async (senderId, receiverId) => {
  // Validate the request: 1. wrong request: do not send request to self.
  if (senderId === receiverId) {
    throw new Error('Cannot send request to yourself!.');
  }
  //Validate the request: 1. wrong request: if A is Friend of B, B can't send request to A

  // Validate the request: 2. friendship limit is exceeded
  const isLimited = await friendsDao.isFriendshipLimitExceeded(senderId);
  if (isLimited) {
    throw new Error('Friendship limit exceeded!');
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
const acceptRequest = async (requestId,user_id, friend_id) => {
  const updatedFriendship = await friendsDao.acceptFriendRequest(requestId,user_id, friend_id);
  return updatedFriendship;
};

// declineRequest
const declineRequest = async (requestId) => {
  await friendsDao.declineFriendRequest(requestId);
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
