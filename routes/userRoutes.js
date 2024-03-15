const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');
const limiter = require('../middleware/rateLimiter');

// Sign up a new user
/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Sign up a new user
 *    description: Sign up a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: The user's email
 *              password:
 *                type: string
 *                description: The user's password
 *    responses:
 *      200:
 *        description: The user was successfully created
 *      400:
 *        description: There was a problem with the request
 *      409:
 *        description: The user already exists
 *      429:
 *        description: Too many requests - the user has been rate limited
 */

router.post('/signup', limiter, userController.signUp);

// Login a user
/**
 * @swagger
 * /login:
 *  post:
 *    summary: Log in an existing user
 *    description: Log in an existing user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: The user's email
 *              password:
 *                type: string
 *                description: The user's password
 *    responses:
 *      200:
 *        description: The user was successfully logged in
 *      400:
 *        description: There was a problem with the request
 *      429:
 *        description: Too many requests - the user has been rate limited
 */
router.post('/login', limiter, userController.login);

// Logout a user
router.post('/logout', userController.logout);

// Forgot password
router.post('/forgot-password', limiter, userController.forgotPassword);

// Reset password
router.post('/reset-password', authenticateJWT, userController.resetPassword);

module.exports = router;
