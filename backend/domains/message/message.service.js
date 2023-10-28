//const Message = require('./message.model');
const messageDao = require('./message.dao');

// Message Handling:
// Create new message
// Delete message.
// Query historical messages.
// Get all historical messages.
// Update message.

// Create new message
const createMessage = async (from, message_text, sent, chat_id) => {
  try {
    const newMessage = await messageDao.createMessage(from, message_text, sent, chat_id);
    return newMessage;
    //return message(newMessage.id, newMessage.from, newMessage.message_text, newMessage.sent, newMessage.chat_id);
  } catch (error) {
    console.log(error)
  }

};

// Get all historical messages
const getAllMessages = async () => {
  const messages = await messageDao.getAllMessages();
  return messages;
  //return messages.map(messages);
  //messages.map((messages)=> new Message(message.id, message.from,message.message_text, message.sent, message.chat_id));
};

// Update message
const updateMessage = async (messageId, updatedText) => {
  const updatedMessage = await messageDao.updateMessage(messageId, updatedText);
  return updatedMessage;
  //return new Message(updatedMessage.id, updatedMessage.message_text);
};

// Delete message
const deleteMessage = async (messageId) => {
  try {
    await messageDao.deleteMessage(messageId);
  } catch (error) {
    throw new Error('Failed to delete the message');
  }
};

// Delete multiple messages
const deleteMultipleMessages = async (messageIds) => {
  try {
      await messageDao.deleteMultipleMessages(messageIds);
  } catch (error) {
      throw new Error('Failed to delete messages');
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
  deleteMultipleMessages
};