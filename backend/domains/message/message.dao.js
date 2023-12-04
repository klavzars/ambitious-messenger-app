const { PrismaClient } = require('@prisma/client');
const { logError } = require("../../lib/error/errorHandler");

const prisma = new PrismaClient();

// Message Handling:
// Create new message
// Delete message.
// Query messages.
// Get all historical messages.
// Update message.

// Create new message
const createMessage = async (from, message_text, sent, chat_id) => {

    try {
        const message = await prisma.message.create({
            data: {
                from,
                message_text,
                sent,
                chat_id,
            },
        });
        return message;
    } catch (error) {
        logError(error);
    }

};

// Get all historical messages.
const getAllMessages = async (chat_id) => {
  try {
    const messages = await prisma.message.findMany({
      where: { chat_id },
      orderBy: { sent: "asc" },
    });
    return messages;
  } catch (error) {
    logError(error);
  }
};

// Update
const updateMessage = async (id, message_text) => {
    try {
        const updatedMessage = await prisma.message.update({
            where: { id },
            data: {
                message_text,
                isEdited: true, // Set isEdited to true when updating the message
            },
        });
        return updatedMessage;
    } catch (error) {
        logError(error);
    }
};

// Delete message
const deleteMessage = async (id) => {
    try {
        await prisma.message.delete({ where: { id } });
    } catch (error) {
        logError(error);
    }
};

// Delete multiple messages
const deleteMultipleMessages = async (messageIds) => {
    try {
        await prisma.message.deleteMany({ where: { id: { in: messageIds } } });
    } catch (error) {
        logError(error);
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    updateMessage,
    deleteMessage,
    deleteMultipleMessages
};