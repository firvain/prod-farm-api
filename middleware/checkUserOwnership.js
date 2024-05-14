const ProfitCalculation = require('../models/ProfitCalculation');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const checkUserOwnership = async (req, res, next) => {
  const { id } = req.params;
  const { sub: user_id } = req.user;
  try {
    const profitCalculation = await ProfitCalculation.findOne({
      where: { id },
    });
    if (!profitCalculation) {
      return next(
        new ApiError(StatusCodes.NOT_FOUND, 'Profit Calculation not found')
      );
    }
    if (profitCalculation.user_id !== user_id) {
      return next(new ApiError(StatusCodes.FORBIDDEN, 'Access denied'));
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUserOwnership };
