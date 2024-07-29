const User = require('../models/User');
const bcrypt = require('bcryptjs');
const NotFoundError = require('../utils/NotFoundError');
const AuthenticationError = require('../utils/AuthenticationError');
const { sign } = require('jsonwebtoken');
const { info } = require('winston');
const crypto = require('crypto');
const sendEmail = require('../utils/Emailer');
const fs = require('fs');

const createUser = async ({ email, password, firstName, lastName }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  // check if user exits
  const existing = await User.findOne({ where: { email } });

  if (existing) {
    throw new Error('User already exits');
  }
  console.log(email, hashedPassword, firstName, lastName);
  const user = await User.create({
    email,
    password: hashedPassword,
    first_name: firstName,
    last_name: lastName,
  });
  info('User created', user);
  const payload = {
    sub: user.id, // The "sub" (subject) claim identifies the principal that is the subject of the JWT
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    iat: Math.floor(Date.now() / 1000), // The "iat" (issued at) claim identifies the time at which the JWT was issued
  };
  const key = fs.readFileSync('./jwtRS256.key', 'utf8');
  return sign(payload, key, {
    algorithm: 'RS256',
    expiresIn: '7d', // Token expires in 1 hour
  });
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AuthenticationError('Email and password are required');
  }
  const user = await User.findOne({
    where: { email: email },
  });
  info('User found', user);
  if (!user) {
    throw new NotFoundError(`${email} not found`);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AuthenticationError(`${email} Invalid credentials`);
  }

  // Additional login logic like generating JWTs could be here
  const payload = {
    sub: user.id, // The "sub" (subject) claim identifies the principal that is the subject of the JWT
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    iat: Math.floor(Date.now() / 1000), // The "iat" (issued at) claim identifies the time at which the JWT was issued
  };
  const key = fs.readFileSync('./jwtRS256.key', 'utf8');
  return sign(payload, key, {
    algorithm: 'RS256',
    expiresIn: '7d', // Token expires in 7 days
  });
};
const forgotPassword = async ({ email }) => {
  if (!email) {
    throw new AuthenticationError('Email is required');
  }
  // Find user by email
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new NotFoundError(`${email} not found`);
  }

  // Generate a reset token
  const resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetPasswordToken;
  // Set expiration (1 hour)
  user.resetPasswordExpire = Date.now() + 3600000; // 1 hour in milliseconds

  await user.save();

  // Create reset URL
  const resetUrl = `http://localhost:3000/users/reset-password/?resetToken=${resetPasswordToken}`;

  // Send email
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the following link to reset your password: \n\n ${resetUrl}`;

  try {
    const response = await sendEmail({
      from: 'onboarding@resend.dev',
      to: 'tsipis.evangelos@gmail.com',
      subject: 'Password reset token',
      text: message,
    });
    if (response.error) {
      //response.error is not an instance of Error, so we can't throw it directly
      // eslint-disable-next-line no-throw-literal
      throw new Error(response.error.message);
    }
    return response;
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    throw error;
  }
};

const resetPassword = async (resetToken, newPassword) => {
  if (!resetToken || !newPassword) {
    throw new AuthenticationError('Reset token and new password are required');
  }
  const user = await User.findOne({
    where: { resetPasswordToken: resetToken },
  });

  // Set new password
  user.password = await bcrypt.hash('pasok', 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();
  return user;
};
const getAllUsers = async () => {
  return await User.findAll({
    where: { role: 'user' },
    attributes: {
      exclude: [
        'password',
        'resetPasswordToken',
        'resetPasswordExpire',
        'role',
      ],
    },
  });
};
const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteUser,
  // Export other functions
};
