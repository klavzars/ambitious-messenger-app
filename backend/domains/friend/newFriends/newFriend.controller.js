const friendsService = require('./newFriend.service');

// sendRequest
const sendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const result = await friendsService.sendRequest(senderId, receiverId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send friend request' });
  }
};

// getFriendList
const getFriendList = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const friends = await friendsService.getFriendList(userId);
    res.json(friends);
    console.log(friends);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friend list' });
  }
};

// acceptRequest
const acceptRequest = async (req, res) => {
  try {
    const requestId = parseInt(req.params.request_id);
    const { user_id, friend_id } = req.body;
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

//move/delete a friends
const moveFriend = async (req, res) => {
  try {
    const { userId } = parseInt(req.params.id);
    await friendsService.moveFriend(userId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendRequest,
  getFriendList,
  acceptRequest,
  declineRequest,
  moveFriend,
};
