const joi = require("joi");
const { ObjectSchema } = joi;

const PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})");

// validation schemas for auth domain

// one of the reasons for using this is because we aren't using typescript,
// if we were we could still use it though but we're not so even more of a reason xD

const authRegister = joi.object().keys({
  email: joi.string().trim().email().required(),
  password: joi.string().trim().pattern(PASSWORD_REGEX).min(8).required(),
  username: joi.string().trim().required(),
});

const authLogin = joi.object().keys({
  email: joi.string().trim().required(),
  password: joi.string().trim().required(),
});

module.exports = { "/register": authRegister, "/login": authLogin };
