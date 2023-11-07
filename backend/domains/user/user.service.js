//import userData
const { HTTP404Error } = require("../../lib/error/customErrors");
const userDao = require("./user.dao");

// Fetch user profile by userId
const getUserProfile = async (userId) => {
  try {
    const userProfile = await userDao.getUserProfile(userId);
    if (!userProfile) throw new HTTP404Error("User Profile not found");
    return userProfile;
  } catch (error) {
    throw error;
  }
};

// Get all user profiles
const getAllUserProfiles = async () => {
  try {
    const userProfiles = await userDao.getAllUserProfiles();
    if (!userProfiles) throw new HTTP404Error("User Profiles not found");
    return userProfiles;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = userDao.getByEmail(email);
    if (!user) throw new HTTP404Error("User not found");

    return user;
  } catch (error) {
    throw error;
  }
};

const getUser = async (username) => {
  try {
    const user = await userDao.get(username);
    if (!user) throw new HTTP404Error("User not found");

    return user;
  } catch (error) {}
};

const createUser = async (email, password, username) => {
  // check if the user has already been created
  try {
    const isExistingUser = await userDao.getByEmail(email);
    const hasSameUsername = await userDao.get(username);

    if (isExistingUser) {
      throw new Error("User already exists");
    }

    if (hasSameUsername) {
      throw new Error("Username taken");
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
