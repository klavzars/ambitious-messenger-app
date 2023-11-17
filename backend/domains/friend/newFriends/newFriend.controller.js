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
    const { userId } = req.params;
    const friends = await friendsService.getFriendList(userId);
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friend list' });
  }
};

// acceptRequest
const acceptRequest = async (req, res) => {
  try {
    const { userId, requestId } = req.params;
    const result = await friendsService.acceptRequest(userId, requestId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept friend request' });
  }
};

// declineRequest
const declineRequest = async (req, res) => {
  try {
    const { userId, requestId } = req.params;
    await friendsService.declineRequest(userId, requestId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to decline friend request' });
  }
};

module.exports = {
  sendRequest,
  getFriendList,
  acceptRequest,
  declineRequest,
};
