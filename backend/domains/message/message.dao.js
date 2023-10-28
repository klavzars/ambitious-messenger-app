const {PrismaClient} = require('@prisma/client');

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
                chat_id
            },
        });
        return message;
    } catch (error) {
        console.error(error)
        throw new Error('Faile234d to create message');
    }
};

// Get all historical messages.
const getAllMessages = async () => {
    try {
        const messages = await prisma.message.findMany();
        return messages;
    } catch (error) {
        throw new Error('Failed to fetch messages');
    }
};

// Update
const updateMessage = async (id, message_text) => {
    try {
        const updatedMessage = await prisma.message.update({
            where: { id },
            data: { message_text },
        });
        return updatedMessage;
    } catch (error) {
        throw new Error('Failed to updat33e message');
    }
};

// Delete message
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