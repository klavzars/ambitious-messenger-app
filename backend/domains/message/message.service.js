//const Message = require('./message.model');
const { HTTP400Error } = require("../../lib/error/customErrors");
const messageDao = require("./message.dao");

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
    if (!newMessage) {
      throw new HTTP400Error("Failed to create message");
    }
    return newMessage;
    //return message(newMessage.id, newMessage.from, newMessage.message_text, newMessage.sent, newMessage.chat_id);
  } catch (error) {
    throw error;
  }
};

// Get all messages for specific chat
const getChatMessages = async (chat_id) => {
  try {
    const messages = await messageDao.getAllMessages(chat_id);

    if (!messages) {
      throw new HTTP400Error("Failed to get messages");
    }
    return messages;
    //return messages.map(messages);
    //messages.map((messages)=> new Message(message.id, message.from,message.message_text, message.sent, message.chat_id));
  } catch (error) {
    throw error;
  }
};

// Update message
const updateMessage = async (messageId, updatedText) => {
  try {
    const updatedMessage = await messageDao.updateMessage(messageId, updatedText);
    if (!updatedMessage) {
      throw new HTTP400Error("Failed to update message");
    }
    return updatedMessage;
    //return new Message(updatedMessage.id, updatedMessage.message_text);
  } catch (error) {
    throw error;
  }
};

// Delete message
const deleteMessage = async (messageId) => {
  try {
    const deletedMessage = await messageDao.deleteMessage(messageId);
    if (!deletedMessage) {
      throw new HTTP400Error("Failed to delete message");
    }
    return deletedMessage;
  } catch (error) {
    throw error;
  }
};

// Delete multiple messages
const deleteMultipleMessages = async (messageIds) => {
  try {
    const deletedMessages = await messageDao.deleteMultipleMessages(messageIds);
    if (!deletedMessages) {
      throw new HTTP400Error("Failed to delete messages");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMessage,
  getChatMessages,
  updateMessage,
  deleteMessage,
  deleteMultipleMessages
};