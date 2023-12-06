const express = require('express');
const router = express.Router();
const messagesController = require('./message.controller');

// Message Handling:
// Create new message
// Delete message.
// Query historical messages.
// Get all historical messages: 
    //to get the Historical Messeges Cached in the Server when Users Initiate the APP.
// update message.

// Create new message (HTTP POST)
router.post('/', messagesController.createMessage);

// getChatMessages (HTTP GET)
router.get("/:chat_id", messagesController.getChatMessages);

// updateMessage (HTTP PUT)
router.put('/:id', messagesController.updateMessage);

// deleteMessage (HTTP DELETE)
router.delete('/:id', messagesController.deleteMessage);

// Delete multiple messages (HTTP DELETE)
router.delete('/', messagesController.deleteMultipleMessages);

module.exports = router;