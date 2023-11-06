const { getUser } = require("../user/user.service");
const { create, add, get, getSingle, remove, findMemberId } = require("./chat.dao");

const createChat = async (isPrivate, members, user) => {
  //will first check if room its private
  // TODO implement your own personal chat room for you only

  // since this is a new chat, would want the user to be added as a member in both cases
  const userWithMembers = [user, ...members];

  //then create the chat, get the id
  const newChat = await create(isPrivate);

  const newMembers = await addMember(userWithMembers, newChat.chat_id);

  return { newChat, members: newMembers };
};

const addMember = async (members, chatId) => {
  // take the members and add it to a chat
  const newMembers = await add(members, chatId);

  return newMembers;
};

const deleteMember = async (memberId) => {
  // TODO: Add role-level access control for group chats if necessary
  // TODO: Implement handling for 1:1 chats
  // TODO: Decide whether to update the leave time or completely delete the member

  // Remove the member directly using the provided memberId
  const deletedMember = await remove(memberId);

  if (!deletedMember) {
    throw new Error("Member not found or unable to remove.");
  }

  return deletedMember;
};

//get all chats based off username
const getChats = async (username) => {
  const chats = await get(username);

  // process the chatroom data that returns
  const formattedChats = chats.map((chat) => {
    // just get the usernames of the people in the room
    const formattedMembers = chat.member.map((member) => member.username);
    let chat_name;

    // modify the name based on if...

    // the chat is private..
    if (chat.is_private) {
      // just get the name of the user other than the user that requested
      chat_name = formattedMembers.find((member) => member != username);

      // for group chats if there is a name already use that
    } else if (chat.chat_name?.trim()) {
      chat_name = chat.chat_name;

      // or make the name a list of the users

      // TODO make sure to format the string if there is more 4 or more members other than user
    } else {
      chat_name = formattedMembers.filter((member) => member != username).join(",");
    }

    // return processed data
    return {
      chat_id: chat.chat_id,
      chat_name: chat_name,
      is_private: chat.is_private,
      members: formattedMembers,
    };
  });

  return formattedChats;
};

module.exports = {
  createChat,
  addMember,
  getChats,
  deleteMember,
};
