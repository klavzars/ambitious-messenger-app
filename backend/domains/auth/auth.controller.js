const { registerUser, loginUser } = require("./auth.service");
const { generateToken } = require("./jwt");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  let { username, password } = req.body;

  //check if the password is the same
  const user = await loginUser(username);

  //then generateToken
  const { token, expires } = generateToken(user);

  // include cookie in response
  // TODO: should we add a maxAge on the cookie, the same as the token expiration?
  res
    .type("json")
    .cookie("token", token, { httpOnly: true }) // NOTE: in production, set secure: true
    .send({ expires, isAuthSuccessful: true, msg: "login success" });
};

const register = async (req, res, next) => {
  let { email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  //check somethings then add the user
  const registeredUser = await registerUser(email, hashedPassword, username);

  // could add a verification step here for later
  const { token, expires } = generateToken(registeredUser.username, registeredUser.user_id);

  res
    .type("json")
    .cookie("token", token, { httpOnly: true }) // NOTE: in production, set secure: true
    .send({
      user: {
        username: registeredUser.username,
        user_id: registeredUser.user_id,
      },
      expires,
      isAuthSuccessful: true,
      msg: "register success",
    });
};


const logout = async (req, res, next) => {
  res.clearCookie("token");

  res.status(200).send({ message: "logout successful" });
};

//change Password method
const changePassword = async (req, res, next) => {};

module.exports = { login, logout, register, changePassword };
