//import userService
const userService = require('./user.service');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const userProfile = await userService.getUserProfile(userId);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed 222 to fetch user profile' });
  }
};

const getAllUserProfiles = async (req, res) => {
  try {
    const allUsers = await userService.getAllUserProfiles();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all user profiles' });
  }
};

module.exports = {
  getUserProfile,
  getAllUserProfiles,
};