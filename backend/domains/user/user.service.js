//import userData
const userDao = require('./user.dao');

// Fetch user profile by userId
const getUserProfile = async (userId) => {
  return await userDao.getUserProfile(userId);
};

// Get all user profiles
const getAllUserProfiles = async () => {
  return await userDao.getAllUserProfiles();
};


const getUserByEmail = async (email) => {
  try {
    const user = userDao.getByEmail(email);
    if (!user) throw error("user not found");

    return user;
  } catch (error) {}
};

const getUser = async (username) => {
  try {
    const user = await userDao.get(username);
    if (!user) throw error("user not found");

    return user;
  } catch (error) {}
};

const createUser = async (email, password, username) => {
  // check if the user has already been created
  try {
    const isExistingUser = await userDao.get(email);

    if (isExistingUser) {
      throw error("user already exists");
    }

    //if not create the user and return
    const newUser = await userDao.create(email, password, username);
    return newUser;
  } catch (error) {}
};

module.exports = {
  getUserProfile,
  getAllUserProfiles,
  createUser,
  getUser,
  getUserByEmail,
};
