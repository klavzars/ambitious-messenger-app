const prisma = require('./prisma');

// Message Handling:
// Create new message
// Delete message.
// Query historical messages.
// Get all historical messages.
// Modify message.

// 创建新消息
const createMessage = async (text, messageType, conversationType, status) => {
  try {
    const message = await prisma.message.create({
      data: {
        text,
        messageType,
        conversationType,
        status,
      },
    });
    return message;
  } catch (error) {
    throw new Error('Failed to create message');
  }
};

// 获取所有历史消息
const getAllMessages = async () => {
  try {
    const messages = await prisma.message.findMany();
    return messages;
  } catch (error) {
    throw an Error('Failed to fetch messages');
  }
};

// 更新消息
const updateMessage = async (id, text, messageType, conversationType, status) => {
  try {
    const updatedMessage = await prisma.message.update({
      where: { id },
      data: { text, messageType, conversationType, status },
    });
    return updatedMessage;
  } catch (error) {
    throw new Error('Failed to update message');
  }
};

// 删除消息
const deleteMessage = async (id) => {
  try {
    await prisma.message.delete({ where: { id } });
  } catch (error) {
    throw new Error('Failed to delete message');
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
};