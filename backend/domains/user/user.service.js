//import userData
const userDao = require('./user.dao');

//get userProfile by ID
const getUserProfileById = (userId) => {
  return userDao.getUserProfileById(userId);
};

const createUser = async (email, password, username) => {
  // check if the user has already been created
  try {
    const isExistingUser = await userDao.getUserByEmail(email);

    if (isExistingUser) {
      throw error("user already exists");
    }

    //if not create the user and return
    const newUser = await userDao.createUser(email, password, username);
    return newUser;
  } catch (error) {}
};

module.exports = {
  getUserProfileById,
  createUser,
};
