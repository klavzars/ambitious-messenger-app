const Message = require('./message.model');
const messageDao = require('./message.dao');

// Message Handling:
// Create new message
// Delete message.
// Query historical messages.
// Get all historical messages.
// Update message.

// Create new message
const createMessage = async (from, message_text, sent, chat_id) => {
  const newMessage = await messageDao.createMessage(from, message_text, sent, chat_id);
  return new Message(newMessage.id, newMessage.from, newMessage.message_text, newMessage.sent, newMessage.chat_id);
};

// Get all historical messages
const getAllMessages = async () => {
  const messages = await messageDao.getAllMessages();
  return messages.map((message) => new Message(message.id, message.from,message.message_text, message.sent, message.chat_id));
};

// Update message
const updateMessage = async (id,newMessage_text) => {
  const updatedMessage = await messageDao.updateMessage(id, newMessage_text);
  return new Message(updatedMessage.id, updatedMessage.message_text);
};

// Delete message
const deleteMessage = async (id) => {
  await messageDao.deleteMessage(id);
};

module.exports = {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
};