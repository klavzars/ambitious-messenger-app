const { compare } = require("bcryptjs");

const { createUser, getUser, getUserByEmail } = require("../user/user.service");

const registerUser = async (email, password, username) => {
  // call create user service
  try {
    //check if the email already exists
    const newUser = await createUser(email, password, username);
    return newUser;
  } catch (error) {}
};

const loginUser = async (email, password) => {
  try {
    const user = await getUserByEmail(email);

    // check if password is correct
    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw error("invalid user");
    }

    return user;
  } catch (error) {}
};

module.exports = {
  registerUser,
  loginUser,
};
