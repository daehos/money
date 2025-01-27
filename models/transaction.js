"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Transaction.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      });
    }
  }
  Transaction.init(
    {
      date: DataTypes.DATE,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
