const friendsDao = require('./newFriend.dao');

// sendRequest
const sendRequest = async (senderId, receiverUsername) => {
  try {
    // Retrieve receiverId using the username
    const receiverId = await friendsDao.getUserIdByUsername(receiverUsername);

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
  } catch (error) {
    throw new Error('Failed to send friend request');
  }
};

//getAllFriendRequests status:0 pending
const getAllFriendRequests = async (userId) => {
  try {
    const requests = await friendsDao.getAllPendingRequests(userId);
    return requests;
  } catch (error) {
    throw new Error('Failed to get friend requests');
  }
};

// getFriendList
const getFriendList = async (userId) => {
  const friends = await friendsDao.getAllFriendships(userId);
  return friends;
};

// acceptRequest
const acceptRequest = async (requestId, user_id, friend_id) => {
  const updatedFriendship = await friendsDao.acceptFriendRequest(requestId, user_id, friend_id);
  return updatedFriendship;
};

// declineRequest
const declineRequest = async (requestId) => {
  await friendsDao.declineFriendRequest(requestId);
};

//remove/delete a friends
const removeFriendMessage = async (currentUserId, friendIdToRemove) => {
  const removeFriend = await friendsDao.removeFriendFromDao(currentUserId, friendIdToRemove);
};

module.exports = {
  sendRequest,
  getAllFriendRequests,
  getFriendList,
  acceptRequest,
  declineRequest,
  removeFriendMessage,
};
