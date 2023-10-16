const express = require("express");
const { login, register } = require("./auth.controller");
const schemaValidator = require("../../middleware/schemaValidator");
const { authLogin } = require("./auth.schema");
const router = express.Router();

router.post("/login", schemaValidator, login);
router.post("/register", schemaValidator, register);

module.exports = router;
