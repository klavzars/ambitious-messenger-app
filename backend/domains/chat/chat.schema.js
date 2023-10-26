const joi = require("joi");

const createChatSchema = joi.object().keys({
  isPrivate: joi.boolean().strict().required(),
  members: joi.array().min(1).items(joi.string()),
});

const addMemberSchema = joi.object().keys({});

const removeMemberSchema = joi.object().keys({});

const getChats = joi.object().keys({});

module.exports = { "/chat/create": createChatSchema };
