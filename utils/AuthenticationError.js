// utils/AuthenticationError.js

const ApiError = require('./ApiError');
const { StatusCodes } = require('http-status-codes');

class AuthenticationError extends ApiError {
  constructor(message = 'Authentication failed') {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

module.exports = AuthenticationError;
