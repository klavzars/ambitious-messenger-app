//import userData
<<<<<<< HEAD
const { HTTP404Error } = require("../../lib/error/customErrors");
=======
>>>>>>> origin/main
const userDao = require("./user.dao");

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
    if (!user) throw new HTTP404Error("user not found");

    return user;
  } catch (error) {
    throw error;
  }
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
    const isExistingUser = await userDao.getByEmail(email);
    const hasSameUsername = await userDao.get(username);

    //console.log(isExistingUser, hasSameUsername);
    if (isExistingUser) {
      throw new Error("user already exists");
    }

    if (hasSameUsername) {
      throw new Error("username taken");
    }

    //if not create the user and return
    const newUser = await userDao.create(email, password, username);
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserProfile,
  getAllUserProfiles,
  createUser,
  getUser,
  getUserByEmail,
};
