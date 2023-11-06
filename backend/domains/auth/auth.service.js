const { compare } = require("bcryptjs");

const { createUser, getUser, getUserByEmail } = require("../user/user.service");
const { HTTP401Error } = require("../../lib/error/customErrors");

const registerUser = async (email, password, username) => {
  // call create user service
  try {
    //check if the email already exists
    const newUser = await createUser(email, password, username);
    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    // TODO change the prisma schema so enforce unique rule on emails
    const user = await getUserByEmail(email);

    // check if password is correct
    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new HTTP401Error("Invalid User");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};
