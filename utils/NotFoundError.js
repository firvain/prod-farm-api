// utils/NotFoundError.js

const ApiError = require('./ApiError');
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends ApiError {
  constructor(message = 'Not found') {
    super(StatusCodes.NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
