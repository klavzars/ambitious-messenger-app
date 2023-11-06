const { logError } = require("../../lib/error/errorHandler");
const chatService = require("./chat.service");

const createChat = async (req, res, next) => {
  try {
    // TODO will decide weather to create private or group chats based on
    // TODO add make this a protected route to get the user requesting this
    const { isPrivate, members } = req.body;

    //run the room creation service function

    const chat = await chatService.createChat(isPrivate, members);

    res.status(200).send(chat);
  } catch (error) {
    next(error);
  }
};

const addMember = (req, res) => {};

const getUserChats = async (req, res, next) => {
  try {
    const { username } = req.params;

    const chats = await chatService.getChats(username);

    console.log("chats-controller", chats);

    res.status(200).send(chats);
  } catch (error) {
    next(error);
  }
};

const removeMember = async (req, res, next) => {
  let { memberId } = req.params;

  try {
    memberId = parseInt(memberId, 10);

    const deletedMember = await chatService.deleteMember(memberId);

    if (!deletedMember) {
      res.status(400).send({ error: "error - member not deleted" });
    }

    res.status(200).send({ message: "member deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChat,
  addMember,
  getUserChats,
  removeMember,
};
