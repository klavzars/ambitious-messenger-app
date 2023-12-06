const { sign, verify } = require("jsonwebtoken");
const config = require("../../config");

// Expiration duration in seconds
const expiresInSeconds = 3600; // 1 hour
const {
  jwt: { secret, issuer, audience },
} = config;
const generateToken = (user) => {
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

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(
      token,
      secret,
      {
        complete: true,
        audience: audience,
        issuer: issuer,
        algorithms: ["HS256"],
        clockTolerance: 0,
        ignoreExpiration: false,
        ignoreNotBefore: false,
      },

      (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      }
    );
  });
};

module.exports = { generateToken, verifyToken };
