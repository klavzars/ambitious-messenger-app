const { sign, verify } = require("jsonwebtoken");
const config = require("../../config");

// Expiration duration in seconds
const expiresInSeconds = 3600; // 1 hour

const generateToken = (user) => {
  const {
    jwt: { secret, issuer, audience },
  } = config;

  // Calculate the expiration time
  const expires = Date.now() + expiresInSeconds * 1000;

  const token = sign(
    {
      userId: user.user_id,
      username: user.username,
    },
    secret,
    {
      expiresIn: expiresInSeconds,
      notBefore: "0",
      algorithm: "HS256",
      audience: audience,
      issuer: issuer,
    }
  );

  return { token, expires };
};

module.exports = { generateToken };
