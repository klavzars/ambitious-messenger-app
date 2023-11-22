const express = require('express');
const router = express.Router();
const friendsController = require('./newFriend.controller');

router.post('/friends/request', friendsController.sendRequest);
router.get('/friends', friendsController.getFriendList);
router.put('/friends/accept/:id', friendsController.acceptRequest);
router.put('/friends/decline/:id', friendsController.declineRequest);

//move/delete a friends
router.put('/friends/move/:id', friendsController.moveFriend);

module.exports = router;
