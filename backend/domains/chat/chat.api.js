const express = require("express");
const router = express.Router();

// creating chat
router.post("/");

//add user to existing group chat
router.post("/add");

// getting all chats
router.get("/");

// delete
router.delete("/");

//removing user from group chat
router.post("/remove");
