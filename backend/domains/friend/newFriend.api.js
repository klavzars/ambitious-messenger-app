const express = require('express');
const router = express.Router();
const friendsController = require('./newFriend.controller');
const validateToken = require("../../middleware/validateToken");

// TODO add verify middleware to these endpoints

router.post('/request',validateToken, friendsController.sendRequest);
router.get('/:user_id', validateToken,friendsController.getFriendList);

router.put('/accept/:request_id',validateToken, friendsController.acceptRequest);
router.put('/decline/:request_id', friendsController.declineRequest);

//remove/delete a friends
router.put('/remove', friendsController.removeFriend);

module.exports = router;
