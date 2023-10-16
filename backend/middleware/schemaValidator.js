const authSchemas = require("../domains/auth/auth.schema");
const joi = require("joi");

// the idea: https://www.digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation

// instead of putting all schemas in one place will spread them here
const schemas = {
  ...authSchemas,
};

// schema validator middleware
const schemaValidator = (req, res, next) => {
  const useJoiError = false;
  const supportedMethods = ["post", "put", "get"];

  // Joi validation options
  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: false,
  };

  const route = req.route.path;
  const method = req.method.toLowerCase();

  if (supportedMethods.includes(method) && route in schemas) {
    // get schema for the current route
    const schema = schemas[route];

    if (schema) {
      console.log(res.body);
      // Validate req.body using the schema and validation options
      const { value, error } = schema.validate(req.body, validationOptions);
      console.log(error);
      if (error) {
        // Joi Error
        const JoiError = {
          status: "failed",
          error: {
            original: error._original,
            // fetch only message and type from each error
            details: error.details.map(({ message, type }) => ({
              message: message.replace(/['"]/g, ""),
              type,
            })),
          },
        };

        // Custom Error - for making
        const CustomError = {
          status: "failed",
          error: "Invalid request data. Please review request and try again.",
        };

        // Send back the JSON error response
        res.status(422).json(useJoiError ? JoiError : CustomError);
      } else {
        // Replace req.body with the data after Joi validation
        req.body = value;
        next();
      }
    }
  } else {
    next();
  }
};

module.exports = schemaValidator;
