const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const PropertyRental = sequelize.define(
  "PropertyRental",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    workExperience: {
      type: DataTypes.JSON,
    },
    travelingPreferences: {
      type: DataTypes.JSON,
    },
    reviewsAndReferences: {
      type: DataTypes.JSON,
    },
    loggedInUserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "PropertyRental",
    updatedAt: false,
  }
);

(async () => {
  await PropertyRental.sync({ force: false });
})();

PropertyRental.belongsTo(User, { foreignKey: "loggedInUserId" });

module.exports = PropertyRental;