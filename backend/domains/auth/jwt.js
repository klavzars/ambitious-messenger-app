const { sign, verify } = require("jsonwebtoken");
const { config } = require("../../config");

const generateToken = (user) => {
  const {
    jwt: { secret, issuer, audience },
  } = config;

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

module.exports = { generateToken };
