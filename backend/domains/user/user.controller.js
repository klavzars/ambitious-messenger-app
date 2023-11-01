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

module.exports = {
  getUserProfile
};