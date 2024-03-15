const jwt = require('jsonwebtoken');

// Replace this with your own AuthenticationError implementation if not using Passport
const AuthenticationError = require('../utils/AuthenticationError');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Authorization: Bearer TOKEN

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Use next to pass the error to your error handling middleware
        return next(new AuthenticationError('Authentication failed'));
      }

      req.user = decoded; // Add the decoded user to the request object
      next();
    });
  } else {
    // If no auth header is present, use next to pass an AuthenticationError
    next(new AuthenticationError('No authentication token provided'));
  }
};

module.exports = authenticateJWT;
