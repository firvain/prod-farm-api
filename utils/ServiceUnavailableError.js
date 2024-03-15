const ApiError = require('./ApiError');
const { StatusCodes } = require('http-status-codes');

class ServiceUnavailableError extends ApiError {
  constructor(message = 'Service unavailable') {
    super(StatusCodes.SERVICE_UNAVAILABLE, message);
  }
}

module.exports = ServiceUnavailableError;
