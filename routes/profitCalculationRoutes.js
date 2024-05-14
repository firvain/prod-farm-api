const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const {
  saveProfitCalculation,
  getProfitCalculation,
  getAllProfitCalculationsByUser,
  updateProfitCalculation,
  deleteProfitCalculation,
  deleteMultipleProfitCalculations,
} = require('../controllers/profitCalculationControler');
const { checkUserOwnership } = require('../middleware/checkUserOwnership');

const router = express.Router();
/**
 * @swagger
 * /:
 *  post:
 *    tags:
 *      - profit-calculation
 *    summary: Save a profit calculation
 *    description: Save a profit calculation
 *    security:
 *    - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProfitCalculation'
 */
router.post('/', authenticateJWT, saveProfitCalculation);

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *      - profit-calculation
 *    summary: Get all profit calculations by user
 *    description: Get all profit calculations by user
 *    security:
 *    - bearerAuth: []
 *    responses:
 *      200:
 *        description: An array of profit calculations
 *        content:
 *          application/json:
 *            schema:
 *              type: 'array'
 *              items:
 *                $ref: '#/components/schemas/ProfitCalculation'
 *      400:
 *          description: Bad request, ids are required
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *      403:
 *          description: Access denied
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *      404:
 *          description: Resource not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', authenticateJWT, getAllProfitCalculationsByUser);

router.get('/:id', authenticateJWT, checkUserOwnership, getProfitCalculation);
router.put(
  '/:id',
  authenticateJWT,
  checkUserOwnership,
  updateProfitCalculation
);
router.delete('/', authenticateJWT, deleteMultipleProfitCalculations);
router.delete(
  '/:id',
  authenticateJWT,
  checkUserOwnership,
  deleteProfitCalculation
);

module.exports = router;
