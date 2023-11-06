const express = require("express");
const { login, register, logout } = require("./auth.controller");
const schemaValidator = require("../../middleware/schemaValidator");
const { authLogin } = require("./auth.schema");
const router = express.Router();

router.post("/login", schemaValidator, login);
router.post("/register", schemaValidator, register);
router.post("/logout", logout);

module.exports = router;
