const ApiError = require('./ApiError');
const { StatusCodes } = require('http-status-codes');

class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(StatusCodes.CONFLICT, message);
  }
}

module.exports = ConflictError;
