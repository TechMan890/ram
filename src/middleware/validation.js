/**
 * Request validation middleware
 * @param {Joi.Schema} schema - Joi validation schema
 */
function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationError = new Error("Validation error");
      validationError.name = "ValidationError";
      validationError.details = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));
      return next(validationError);
    }

    // Replace request body with validated value
    req.body = value;
    next();
  };
}

module.exports = {
  validateRequest,
};
