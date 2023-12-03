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
  //console.log("message", req.body)
  try {
    const { from, message_text, sent, chat_id } = req.body;
    const newMessage = await messageService.createMessage(from, message_text, sent, chat_id);
    res.status(201).json(newMessage);
  } catch (error) {
    //console.log(error)
    next(error);
  }
};

// Get all historical messages
const getChatMessages = async (req, res) => {
  // TODO APPLY SCHEMA VALIDATION HERE
  const chat_id = parseInt(req.params.chat_id);
  try {
    const messages = await messageService.getChatMessages(chat_id);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// Update messages
const updateMessage = async (req, res) => {
  //const messageId = req.params.id;
  //const updatedText = req.body.updatedText;
  const messageId = parseInt(req.params.id);
  const updatedText = req.body.updatedText;
  try {
    const updatedMessage = await messageService.updateMessage(messageId, updatedText);
    res.status(200).json(updatedMessage);
  } catch (error) {
    next(error);
  }
};

// Delete messages
const deleteMessage = async (req, res) => {
  const messageId = parseInt(req.params.id);
  try {
    await messageService.deleteMessage(messageId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Delete multiple messages
const deleteMultipleMessages = async (req, res) => {
  // Assuming messageIds is an array of Ids
  const messageIds = req.body.messageIds;
  try {
    await messageService.deleteMultipleMessages(messageIds);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getChatMessages,
  updateMessage,
  deleteMessage,
  deleteMultipleMessages,
};