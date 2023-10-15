const { sign, verify } = require("jsonwebtoken");
const config = require("../../config");

const generateToken = (user) => {
  const { jwt, issuer, audience, secret } = config;
  const token = sign(
    {
      userId: user.user_id,
      username: user.username,
    },
    secret,
    {
      expiresIn: "1h",
      notBefore: "0",
      algorithm: "HS256",
      audience: audience,
      issuer: issuer,
    }
  );

  return token;
};

// token validation middleware
const validateToken = (req, res, next) => {
  const { jwt } = config;
  //get the token out of the auth header
  const token = req.headers["authorization"];

  //then verify the token
  try {
    tokenPayload = verify(token?.split(" ")[1], jwt.secret, {
      complete: true,
      audience: jwt.audience,
      issuer: jwt.issuer,
      algorithms: ["HS256"],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    });

    req.token = tokenPayload;
  } catch (error) {
    console.error(error);
    return;
  }

  //validate the token

  next();
};

module.exports = { generateToken, validateToken };
