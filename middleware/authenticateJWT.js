const jwt = require('jsonwebtoken');

// Replace this with your own AuthenticationError implementation if not using Passport
const AuthenticationError = require('../utils/AuthenticationError');
const { readFileSync } = require('fs');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Authorization: Bearer TOKEN
    const key = readFileSync('./jwtRS256.key', 'utf8');
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return next(new AuthenticationError('Token expired'));
        }
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
