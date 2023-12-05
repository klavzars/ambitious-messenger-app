const { verify } = require("jsonwebtoken");
const config = require("../config");

// token validation middleware
const validateToken = (req, res, next) => {
  const { jwt } = config;
  //get the token out of the auth header
  const token = req.signedCookies.token;
  console.log("token", token);
  verify(
    token,
    jwt.secret,
    {
      complete: true,
      audience: jwt.audience,
      issuer: jwt.issuer,
      algorithms: ["HS256"],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    },
    (error, decoded) => {
      if (error) {
        res.clearCookie("token");
        return res.status(401).json({ message: "Invalid Token, Please Login" });
      } else {
        // move on to the controller
        console.log("decoded", decoded);
        req.user = decoded.payload;
        next();
      }
    }
  );

};

module.exports = validateToken;
