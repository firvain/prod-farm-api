const ApiError = require('./ApiError');
const { StatusCodes } = require('http-status-codes');
class InternalServerError extends ApiError {
  constructor(message = 'Internal server error') {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

module.exports = InternalServerError;
