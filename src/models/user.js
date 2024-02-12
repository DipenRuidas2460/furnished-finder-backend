const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/dbConfig");
const UserType = require("./userType");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    displayName: {
      type: DataTypes.STRING,
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastLogInTime: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    fpToken: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "User",
    updatedAt: false,
  }
);

(async () => {
  await User.sync({ force: false });
})();

User.belongsTo(UserType, { foreignKey: "userTypeId" });

module.exports = User;
