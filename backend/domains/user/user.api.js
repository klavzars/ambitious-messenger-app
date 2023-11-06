const express = require('express');
const router = express.Router();
//import user_controller
const userController = require('./user.controller');

//define Router for getting userProfile with ID
router.get('/:user_id', userController.getUserProfile);

// Get all user profiles
router.get('/', userController.getAllUserProfiles); // New route

module.exports = router;