const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const limiter = require('../middleware/rateLimiter');

// Sign up a new user
/**
 * @swagger
 * /signup:
 *  post:
 *    tags:
 *      - users
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
 *              firstName:
 *                type: string
 *                description: The user's first name
 *              lastName:
 *                type: string
 *              description: The user's last name
 *    responses:
 *      200:
 *        description: The user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message indicating the user was successfully logged in
 *                token:
 *                  type: string
 *                  description: The JWT for the authenticated user
 *      400:
 *        description: There was a problem with the request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      409:
 *        description: The user already exists
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      429:
 *        description: Too many requests - the user has been rate limited
 */

router.post('/signup', limiter, userController.signUp);

// Login a user
/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *      - users
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
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message indicating the user was successfully logged in
 *                token:
 *                  type: string
 *                  description: The JWT for the authenticated user
 *      400:
 *        description: There was a problem with the request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      401:
 *        description: Unauthorized - the user's credentials are invalid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      429:
 *        description: Too many requests - the user has been rate limited
 */
router.post('/login', limiter, userController.login);

// Logout a user
/**
 * @swagger
 * /logout:
 *  post:
 *    tags:
 *      - users
 *    summary: Log out a user
 *    description: Log out a user. This endpoint is used to invalidate the user's session, effectively logging them out.
 *    responses:
 *      200:
 *        description: The user was successfully logged out
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                 type: string
 *                 description: A message indicating the user was successfully logged out
 *      400:
 *        description: There was a problem with the request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/logout', userController.logout);

// Forgot password
/**
 * @swagger
 * /forgot-password:
 *  post:
 *    tags:
 *      - users
 *    summary: Request a password reset
 *    description: This endpoint is used when a user has forgotten their password and needs to request a password reset. An email will be sent to the user with instructions on how to reset their password.
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
 *    responses:
 *      200:
 *        description: The password reset email was successfully sent
 *      400:
 *        description: There was a problem with the request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      429:
 *        description: Too many requests - the user has been rate limited
 */
router.post('/forgot-password', limiter, userController.forgotPassword);

// Reset password
/**
 * @swagger
 * /reset-password:
 *  get:
 *    tags:
 *      - user
 *    summary: Reset a user's password
 *    description: This endpoint is used when a user wants to reset their password. The user must be authenticated and provide a new password.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              newPassword:
 *                type: string
 *                description: The user's new password
 *    responses:
 *      200:
 *        description: The password was successfully reset
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message indicating the password was successfully reset
 *      400:
 *        description: There was a problem with the request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/reset-password', userController.resetPassword);

// get all users
/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - users
 *    summary: Get all users
 *    description: Get all users
 *    responses:
 *      200:
 *        description: The users were successfully retrieved
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *      500:
 *        description: There was a problem with the request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', userController.getAllUsers);

// delete a user
/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags:
 *      - users
 *    summary: Delete a user
 *    description: Delete a user
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The user ID
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: The user was successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message indicating the user was successfully deleted
 *      500:
 *        description: There was a problem with the request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', userController.deleteUser);

router.put('/:id', userController.updateUser);
module.exports = router;
