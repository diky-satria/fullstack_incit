"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      active: DataTypes.INTEGER,
      count_login: DataTypes.INTEGER,
      time_logout: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
