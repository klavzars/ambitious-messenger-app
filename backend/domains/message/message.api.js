const express = require('express');
const router = express.Router();
const messagesController = require('./messages.controller');

// Message Handling:
// Create new message
// Delete message.
// Query historical messages.
// Get all historical messages: 
    //to get the Historical Messeges Cached in the Server when Users Initiate the APP.
// update message.

// Create new message (HTTP POST)
router.post('/messages', messagesController.createMessage);

// getHistoryMessages (HTTP GET)
router.get('/messages', messagesController.getHistoryMessages);

// updateMessage (HTTP PUT)
router.put('/messages/:id', messagesController.updateMessage);

// deleteMessage (HTTP DELETE)
router.delete('/messages/:id', messagesController.deleteMessage);

module.exports = router;