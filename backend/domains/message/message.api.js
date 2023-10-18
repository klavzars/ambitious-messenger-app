const express = require('express');
const router = express.Router();
const messagesController = require('./messages.controller');

// Message Handling:
// Create new message
// Delete message.
// Query historical messages.
// Get all historical messages.
// Modify message.

// Create new message (HTTP POST)
router.post('/messages', messagesController.createMessage);

// 获取所有历史消息（HTTP GET请求）
router.get('/messages', messagesController.getHistoryMessages);

// 更新消息（HTTP PUT请求）
router.put('/messages/:id', messagesController.updateMessage);

// 删除消息（HTTP DELETE请求）
router.delete('/messages/:id', messagesController.deleteMessage);

module.exports = router;