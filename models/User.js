const { DataTypes } = require('sequelize');
const db = require('../config/database'); // Adjust the path as needed

const User = db.define(
  'user',
  {
    // Define attributes
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
    },
    resetPasswordExpire: {
      type: DataTypes.DATE,
    },

    // Additional attributes as needed
  },
  {
    // Define the table name
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = User;
