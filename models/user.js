"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Department, {
        foreignKey: "DepartmentId",
      });
      User.hasOne(models.Profile, {
        foreignKey: "UserId",
      });
      User.hasMany(models.Transaction, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      DepartmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        async afterCreate(user, option) {
          const { Profile } = sequelize.models;
          await Profile.create({
            UserId: user.id,
            fullName: user.username,
            profilePictures:
              "https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg",
          });
        },
      },
    }
  );
  User.beforeCreate(async (user, option) => {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
  });
  return User;
};
