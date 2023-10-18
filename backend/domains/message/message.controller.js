const Message = require('./message.model');
const messageService = require('./message.service');

// Message Handling:
// Create new message
// Delete message.
// Query historical messages.
// Get all historical messages.
// Modify message.

// 创建新消息
const createMessage = async (req, res) => {
  const { text, messageType, conversationType, status } = req.body;
  try {
    const newMessage = await messageService.createMessage(text, messageType, conversationType, status);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};

// 获取所有历史消息
const getHistoryMessages = async (req, res) => {
  try {
    const messages = await messageService.getAllMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history messages' });
  }
};

// 更新消息
const updateMessage = async (req, res) => {
  const messageId = parseInt(req.params.id);
  const { text, messageType, conversationType, status } = req.body;
  try {
    const updatedMessage = await messageService.updateMessage(messageId, text, messageType, conversationType, status);
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message' });
  }
};

// 删除消息
const deleteMessage = async (req, res) => {
  const messageId = parseInt(req.params.id);
  try {
    await messageService.deleteMessage(messageId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

module.exports = {
  createMessage,
  getHistoryMessages,
  updateMessage,
  deleteMessage,
};