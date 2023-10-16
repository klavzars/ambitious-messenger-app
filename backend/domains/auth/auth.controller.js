const { generateToken } = require("./auth");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  let { username, password } = req.body;

  //get the user from database
  const user = "some function here";

  //check if the password is the same
  if (user.password != password) {
    res.send("invalid password");
  }

  //then generateToken
  const token = generateToken();
  res.type("json").send({ token: token, message: "login success" });
};

const register = async (req, res, next) => {
  let { email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  //check somethings then add the user
  const createdUser = createUser(email, password, username);

  // could add a verification step here for later
  const token = generateToken(createdUser.username, createdUser.password);
  res.type("json").send({ token: token });

  res.send("auth - register");
};

//change Password method
const changePassword = async (req, res, next) => {};

module.exports = { login, register, changePassword };
