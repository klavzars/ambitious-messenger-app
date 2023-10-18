const Message = require('./message.model');
const messageDao = require('./message.dao');

// Message Handling:
// Create new message
// Delete message.
// Query historical messages.
// Get all historical messages.
// Modify message.

// 创建新消息
const createMessage = async (text, messageType, conversationType, status) => {
  const newMessage = await messageDao.createMessage(text, messageType, conversationType, status);
  return new Message(newMessage.id, newMessage.text, newMessage.messageType, newMessage.conversationType, newMessage.status, newMessage.createdAt);
};

// 获取所有历史消息
const getAllMessages = async () => {
  const messages = await messageDao.getAllMessages();
  return messages.map((message) => new Message(message.id, message.text, message.messageType, message.conversationType, message.status, message.createdAt));
};

// 更新消息
const updateMessage = async (id, text, messageType, conversationType, status) => {
  const updatedMessage = await messageDao.updateMessage(id, text, messageType, conversationType, status);
  return new Message(updatedMessage.id, updatedMessage.text, updatedMessage.messageType, updatedMessage.conversationType, updatedMessage.status, updatedMessage.createdAt);
};

// 删除消息
const deleteMessage = async (id) => {
  await messageDao.deleteMessage(id);
};

module.exports = {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
};