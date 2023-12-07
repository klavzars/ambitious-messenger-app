const { verify } = require("jsonwebtoken");
const config = require("../config");
const { verifyToken } = require("../domains/auth/jwt");

// token validation middleware

const validateToken = async (req, res, next) => {
  const { jwt } = config; //get the token out of the auth header
  const token = req.signedCookies.token;

  try {
    const decodedToken = await verifyToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Invalid Token, Please Login" });
  }
};

module.exports = validateToken;