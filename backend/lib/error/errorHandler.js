"use strict";

const logger = require("../../logger");
const BaseError = require("./BaseError");

// Error logging function - for stuff outside of express handler
const logError = (err) => {
  logger.error(err);
};

// Error Logging Middleware
const logErrorMiddleware = (err, req, res, next) => {
  logError(err);
  next(err);
};

// Function for sending response back to client
const returnResponse = (err, req, res, next) => {
  let msg;
  let code;


  if (err.statusCode) {
    code = err.statusCode;
    msg = err.name;
  } else {
    code = 500;
    msg = "Internal Server Error";
  }

  res.status(code).send({ message: msg });
};

// function for checking if the error is an operational
const isOperationalError = (error) => {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
};

module.exports = {
  logError,
  logErrorMiddleware,
  returnResponse,
  isOperationalError,
};
