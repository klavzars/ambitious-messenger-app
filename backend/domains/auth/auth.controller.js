const { generateToken } = require("./auth");

const login = async (req, res, next) => {
  let { username, password } = req.body;
  if (!(username && password)) console.log("Error no credentials");

  //get the user from database
  const user = "some function here";

  //then generateToken
  const token = generateToken();
  res.type("json").send({ token: token });
};

const register = async (req, res, next) => {
  let { username, password } = req.body;

  //check somethings then add the user

  // could add a verification step here
};

//change Password method
const changePassword = async (req, res, next) => {};

module.exports = { login, changePassword };
