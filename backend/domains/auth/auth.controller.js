const { registerUser, loginUser } = require("./auth.service");
const { generateToken } = require("./jwt");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  let { username, password } = req.body;

  //check if the password is the same
  const user = loginUser(username);

  //then generateToken
  const token = generateToken(user);

  res.type("json").send({ token: token, msg: "login success" });
};

const register = async (req, res, next) => {
  let { email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  //check somethings then add the user
  const registeredUser = await registerUser(email, hashedPassword, username);
  console.log("registered", registeredUser);
  // could add a verification step here for later
  const token = generateToken(registeredUser.username, registeredUser.user_id);
  res.type("json").send({
    token: token,
    user: {
      username: registeredUser.username,
      user_id: registeredUser.user_id,
    },
    msg: "register success",
  });
};

//change Password method
const changePassword = async (req, res, next) => {};

module.exports = { login, register, changePassword };
