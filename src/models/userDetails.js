const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const UserDetails = sequelize.define(
  "UserDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    homeTown: {
      type: DataTypes.STRING,
    },
    propertyTypes: {
      type: DataTypes.STRING,
    },
    isSublet: {
      type: DataTypes.BOOLEAN,
    },
    units: {
      type: DataTypes.STRING,
    },
    petInfo: {
      type: DataTypes.STRING,
    },
    moreInfo: {
      type: DataTypes.STRING,
    },
    unKnownDetails: {
      type: DataTypes.STRING,
    },
    isRentedBefore: {
      type: DataTypes.BOOLEAN,
    },
    loggedInUserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "UserDetails",
    updatedAt: false,
  }
);

(async () => {
  await UserDetails.sync({ force: false });
})();

UserDetails.belongsTo(User, { foreignKey: "loggedInUserId" });

module.exports = UserDetails;