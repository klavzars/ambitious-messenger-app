const friendsService = require('./newFriend.service');

// sendRequest
const sendRequest = async (req, res) => {
  try {
    const username = req.body;
    //{ senderId, receiverId } = req.body;
    const senderId =req.user.id; // Extract sender ID from decoded JWT
    const result = await friendsService.sendRequest(senderId, username);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send friend request' });
  }
};

// getFriendList
const getFriendList = async (req, res) => {
  try {
    const userId = req.user.id; // Extract sender ID from decoded JWT
    const friends = await friendsService.getFriendList(userId);
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friend list' });
  }
};

// acceptRequest
const acceptRequest = async (req, res) => {
  try {
    const requestId = parseInt(req.params.request_id);
    const user_id = req.user.id; // Extract sender ID from decoded JWT
    const {friend_id } = req.body; // ? maybe it is a friendName, need convert it to friendID from DAO?
    const result = await friendsService.acceptRequest(requestId, user_id, friend_id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept friend request' });
  }
};

// declineRequest
const declineRequest = async (req, res) => {
  try {
    const requestId = parseInt(req.params.request_id);
    await friendsService.declineRequest(requestId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to decline friend request' });
  }
};

//remove/delete a friends
const removeFriend = async (req, res) => {
  try {
    const currentUserId = req.user.id; // Extract sender ID from decoded JWT
    const friendIdToRemove = req.body; // ? maybe it is a friendName, need convert it to friendID from DAO?
    await friendsService.removeFriendMessage(currentUserId, friendIdToRemove);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed123 to remove friend' });
  }
};

module.exports = {
  sendRequest,
  getFriendList,
  acceptRequest,
  declineRequest,
  removeFriend,
};
