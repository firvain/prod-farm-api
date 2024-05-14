const { DataTypes } = require('sequelize');
const db = require('../config/database'); // Adjust the path as needed

const ProfitCalculation = db.define(
  'profitCalculation',
  {
    // Define attributes
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    animals: {
      type: DataTypes.INTEGER,
      defaultValue: 200,
      allowNull: false,
    },
    milk: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 450.0,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('milk');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    conc_milk: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 300.0,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('conc_milk');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    conc_nonmilk: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 2.5,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('conc_nonmilk');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    conc_males: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 4.0,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('conc_males');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    conc_lambs: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 25.0,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('conc_lambs');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    hay: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 330.0,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('hay');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    straw: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 90.0,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('straw');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    silage: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('silage');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    other: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('other');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    milk_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 1.6,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('milk_price');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    conc_milk_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.53,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('conc_milk_price');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    conc_nonmilk_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.3,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('conc_nonmilk_price');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    conc_males_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.3,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('conc_males_price');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    conc_lambs_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.53,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('conc_lambs_price');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    hay_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.25,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('hay_price');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    straw_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.1,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('straw_price');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    silage_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.08,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('silage_price');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    other_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.2,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('other_price');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    milk_income: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('milk_income');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    feed_costs: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('feed_costs');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    profit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('profit');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    profit_animal: {
      type: DataTypes.DECIMAL(14, 4),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('profit_animal');
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
  },
  {
    // Define the table name
    tableName: 'profit_calculation',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
module.exports = ProfitCalculation;
