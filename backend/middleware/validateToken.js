const { verify } = require("jsonwebtoken");
const config = require("../config");

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

  next();
};
