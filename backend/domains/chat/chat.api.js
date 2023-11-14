const express = require("express");
const router = express.Router();
const chatController = require("./chat.controller");
const validateToken = require("../../middleware/validateToken");

// TODO add verify middleware to these endpoints
// creating chat
router.post("/", validateToken, chatController.createChat);

//add user to existing group chat
router.post("/:chat_id/members", chatController.addMember);

// getting all chats
router.get("/:username", validateToken, chatController.getUserChats);

// TODO need to figure how out how this can be implemented, might involve schema mods
// delete
router.delete("/:chat_id");

//removing user from group chat
router.delete("/members/:memberId", chatController.removeMember);

module.exports = router;
