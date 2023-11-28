const express = require('express');
const router = express.Router();
const friendsController = require('./newFriend.controller');

router.post('/request', friendsController.sendRequest);
router.get('/:user_id', friendsController.getFriendList);
router.put('/accept/:request_id', friendsController.acceptRequest);
router.put('/decline/:request_id', friendsController.declineRequest);

//move/delete a friends
router.put('/move/:friend_id', friendsController.moveFriend);

module.exports = router;
