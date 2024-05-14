const ProfitCalculation = require('../models/ProfitCalculation');

const createProfitCalculation = async (profitCalculation, user_id) => {
  try {
    profitCalculation.user_id = user_id;
    return await ProfitCalculation.create(profitCalculation);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProfitCalculation = async ({ id }) => {
  try {
    // console.log(id);
    return await ProfitCalculation.findOne({
      where: { id: parseInt(id, 10) },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllProfitCalculationsByUser = async (user_id) => {
  try {
    return await ProfitCalculation.findAll({
      where: { user_id: parseInt(user_id, 10) },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
//
const updateProfitCalculation = async ({ id, profitCalculation }) => {
  try {
    const [rows] = await ProfitCalculation.update(profitCalculation, {
      where: { id },
      returning: true,
    });
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProfitCalculation = async ({ id }) => {
  try {
    return await ProfitCalculation.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteMultipleProfitCalculations = async (user_id, ids) => {
  try {
    return await ProfitCalculation.destroy({ where: { user_id, id: ids } });
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createProfitCalculation,
  getProfitCalculation,
  getAllProfitCalculationsByUser,
  updateProfitCalculation,
  deleteProfitCalculation,
  deleteMultipleProfitCalculations,
};
