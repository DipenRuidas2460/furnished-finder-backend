const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const TravelerHousingRequest = sequelize.define(
  "TravelerHousingRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    moveInDate: {
      type: DataTypes.STRING,
    },
    moveOutDate: {
      type: DataTypes.STRING,
    },
    reasonForTravel: {
      type: DataTypes.STRING,
    },
    workingSpaceName: {
      type: DataTypes.STRING,
    },
    propertyState: {
      type: DataTypes.STRING,
    },
    propertyCity: {
      type: DataTypes.STRING,
    },
    numberOfOccupants: {
      type: DataTypes.STRING,
    },
    bedRoomNeeded: {
      type: DataTypes.STRING,
    },
    propertyType: {
      type: DataTypes.STRING,
    },
    budget: {
      type: DataTypes.STRING,
    },
    petAlloweded: {
      type: DataTypes.BOOLEAN,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    connectedMode: {
      type: DataTypes.STRING,
    },
    moreDetails: {
      type: DataTypes.STRING,
    },
    loggedInUserId: {
        type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "TravelerHousingRequest",
    updatedAt: false,
  }
);

(async () => {
  await TravelerHousingRequest.sync({ force: false });
})();

TravelerHousingRequest.belongsTo(User, { foreignKey: "loggedInUserId" });

module.exports = TravelerHousingRequest;