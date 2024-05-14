const { StatusCodes } = require('http-status-codes');
const profitCalculationService = require('../services/profitCalculationService');
const ApiError = require('../utils/ApiError');

exports.saveProfitCalculation = async (req, res, next) => {
  try {
    await profitCalculationService.createProfitCalculation(
      req.body,
      req.user.sub
    );
    res.status(StatusCodes.CREATED).json({
      message: 'Profit Calculation saved successfully',
    });
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message));
  }
};

exports.getProfitCalculation = async (req, res, next) => {
  try {
    const profitCalculation =
      await profitCalculationService.getProfitCalculation({
        id: req.params.id,
      });
    if (!profitCalculation) {
      return next(
        new ApiError(StatusCodes.NOT_FOUND, 'Profit Calculation not found')
      );
    }
    res.status(StatusCodes.OK).json({
      message: 'Profit Calculation retrieved successfully',
      payload: profitCalculation,
    });
  } catch (error) {
    next(
      new ApiError(
        StatusCodes.BAD_REQUEST,
        error.message || 'Something went wrong'
      )
    );
  }
};
exports.getAllProfitCalculationsByUser = async (req, res, next) => {
  try {
    const profitCalculations =
      await profitCalculationService.getAllProfitCalculationsByUser(
        req.user.sub
      );
    if (!profitCalculations || (await profitCalculations).length === 0) {
      return next(
        new ApiError(
          StatusCodes.NOT_FOUND,
          'No Profit Calculations found for this user'
        )
      );
    }
    res.status(StatusCodes.OK).json({
      message: 'Profit Calculations retrieved successfully',
      payload: profitCalculations,
    });
  } catch (error) {
    next(
      new ApiError(
        StatusCodes.BAD_REQUEST,
        error.message || 'Something went wrong'
      )
    );
  }
};
//
exports.updateProfitCalculation = async (req, res, next) => {
  try {
    const affectedRows = await profitCalculationService.updateProfitCalculation(
      {
        user_id: req.user.sub,
        id: req.params.id,
        profitCalculation: req.body,
      }
    );
    res.status(StatusCodes.OK).json({
      message: 'Profit Calculation updated successfully',
      affectedRows,
    });
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message));
  }
};
//
exports.deleteProfitCalculation = async (req, res, next) => {
  try {
    const deletedRows = await profitCalculationService.deleteProfitCalculation({
      user_id: req.user.sub,
      id: req.params.id,
    });
    if (deletedRows === 0) {
      next(new ApiError(StatusCodes.NOT_FOUND, 'Profit Calculation not found'));
      return;
    }
    res.status(StatusCodes.OK).json({
      message: 'Profit Calculation deleted successfully',
      deletedRows,
    });
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message));
  }
};
exports.deleteMultipleProfitCalculations = async (req, res, next) => {
  const { ids } = req.body;
  const user_id = req.user.sub;
  if (!Array.isArray(ids) || ids.length === 0 || !ids.every(Number.isInteger)) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, 'Invalid ids provided'));
  }

  const deletedRows =
    await profitCalculationService.deleteMultipleProfitCalculations(
      user_id,
      ids
    );
  if (deletedRows === 0) {
    return next(
      new ApiError(StatusCodes.NOT_FOUND, 'Profit Calculations not found')
    );
  }
  res.status(StatusCodes.OK).json({
    message: 'Profit Calculations deleted successfully',
    deletedRows,
  });
};
