//const Message = require('./message.model');
const messageService = require('./message.service');

// Message Handling:
// Create new message
// Delete messages.
// Query historical messages.
// Get all historical messages: 
//Cached in the Server when Users Initiate the APP to get the Historical Messeges.
// Modify messages.

// Create new message
const createMessage = async (req, res) => {
    console.log("message", req.body)
    const { from, message_text, sent, chat_id } = req.body;
    try {
        const newMessage = await messageService.createMessage(from, message_text, sent, chat_id);
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create message' });
    }
};

// Get all historical messages
const getHistoryMessages = async (req, res) => {
    try {
        console.log(messages)
        const messages = await messageService.getAllMessages();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch121 history messages' });
    }
};

// Update messages
const updateMessage = async (req, res) => {
    const id = parseInt(req.params.id);
    const { message_text} = req.body;
    try {
        const updatedMessage = await messageService.updateMessage(id, message_text);
        res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update1121 message' });
    }
};

// Delete messages
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