//import userData
const userDao = require('./user.dao');

//get userProfile by ID
const getUserProfileById = (userId) => {
  return userDao.getUserProfileById(userId);
};


const getUser = (email) => {
  try {
    const user = userDao.get(email);
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
  getUserProfileById,
  createUser,
  getUser,
};
