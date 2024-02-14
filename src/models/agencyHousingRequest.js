const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const AgencyHousingRequest = sequelize.define(
  "AgencyHousingRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    propertyState: {
      type: DataTypes.STRING,
    },
    propertyCity: {
      type: DataTypes.STRING,
    },
    travelerInfo: {
      type: DataTypes.JSON,
    },
    agencyName: {
        type: DataTypes.STRING,
    },
    contactNo: {
        type: DataTypes.STRING,
    },
    agencyEmail: {
        type: DataTypes.STRING,
    },
    loggedInUserId: {
        type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "AgencyHousingRequest",
    updatedAt: false,
  }
);

(async () => {
  await AgencyHousingRequest.sync({ force: false });
})();

AgencyHousingRequest.belongsTo(User, { foreignKey: "loggedInUserId" });

module.exports = AgencyHousingRequest;