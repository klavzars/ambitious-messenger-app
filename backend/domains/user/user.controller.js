//import userService
const userService = require('./user.service');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const userProfile = await userService.getUserProfile(userId);
    res.json(userProfile);
  } catch (error) {
    next(error);
  }
};

const getAllUserProfiles = async (req, res) => {
  try {
    const allUsers = await userService.getAllUserProfiles();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  getAllUserProfiles,
};