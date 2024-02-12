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
    displayName: {
      type: DataTypes.STRING,
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
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeTown: {
      type: DataTypes.STRING,
    },
    petInfo: {
      type: DataTypes.STRING,
    },
    moreInfo: {
      type: DataTypes.STRING,
    },
    petImage: {
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
  }
);

(async () => {
  await User.sync({ force: false });
})();

User.belongsTo(UserType, { foreignKey: "userTypeId"});

module.exports = User;