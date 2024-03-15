const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');
const { error } = require('./logger');
//eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  // Log the error
  error(err);
  let { statusCode, message } = err;

  // If the error doesn't specify a status code, set it to Internal Server Error
  if (!statusCode) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  // Check if the error is an instance of ApiError or a generic error
  // This allows for customization of API error responses
  if (err instanceof ApiError) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
    });
  } else {
    // For generic errors or unhandled errors, you might not want to expose internal details
    // Instead, log the error for internal tracking and return a generic error message to the client

    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message:
        statusCode === StatusCodes.INTERNAL_SERVER_ERROR
          ? 'An unexpected error occurred'
          : message,
    });
  }
};

module.exports = errorHandler;
