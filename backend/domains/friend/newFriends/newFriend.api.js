const express = require('express');
const router = express.Router();
const friendsController = require('./newFriend.controller');

router.post('/request', friendsController.sendRequest);
router.get('/:user_id', friendsController.getFriendList);
router.put('/accept/:request_id', friendsController.acceptRequest);
router.put('/decline/:request_id', friendsController.declineRequest);

//remove/delete a friends
//API: remove?userId=?&friendId=?
router.put('/remove', friendsController.removeFriend);

module.exports = router;
