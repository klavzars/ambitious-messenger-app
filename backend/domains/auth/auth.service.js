const { createUser } = require("../user/user.service");

const registerUser = async (email, password, username) => {
  // call create user service
  try {
    //check if the email already exists
    const newUser = await createUser(email, password, username);
    return newUser;
  } catch (error) {}
};

module.exports = {
  registerUser,
};
