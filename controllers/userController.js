const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');
const ApiError = require('../utils/ApiError');
const ConflictError = require('../utils/ConflictError');
const AuthenticationError = require('../utils/AuthenticationError');
const BadRequestError = require('../utils/BadRequestError');
const InternalServerError = require('../utils/InternalServerError');

exports.signUp = async (req, res, next) => {
  try {
    const token = await userService.createUser(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'User signed up successfully', token });
  } catch (error) {
    next(
      error.message === 'User already exits'
        ? new ConflictError(error.message)
        : new ApiError(StatusCodes.BAD_REQUEST, error.message)
    );
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await userService.loginUser(req.body);
    res
      .status(StatusCodes.OK)
      .json({ message: 'User logged in successfully', token });
  } catch (error) {
    next(new AuthenticationError(error.message));
  }
};

exports.logout = (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'User logged out successfully' });
};

exports.forgotPassword = async (req, res, next) => {
  try {
    await userService.forgotPassword(req.body);
    res.status(StatusCodes.OK).json({
      message:
        'Forgot password request processed. Instructions sent if email exists.',
    });
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  try {
    await userService.resetPassword(req.body);
    res.status(StatusCodes.OK).json({ message: 'Password reset successfully' });
  } catch (error) {
    next(new BadRequestError(error.message));
  }
};
