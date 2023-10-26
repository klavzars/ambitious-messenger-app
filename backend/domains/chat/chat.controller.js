const createChat = (req, res) => {
  // TODO will decide weather to create private or group chats based on
  // TODO add make this a protected route to get the user requesting this
  const { isPrivate, members } = req.body;

  //run the room creation service function
};
const addMember = (req, res) => {};
const getUserChats = (req, res) => {};
const removeMember = (req, res) => {};

module.exports = {
  createChat,
  addMember,
  getUserChats,
  removeMember,
};
