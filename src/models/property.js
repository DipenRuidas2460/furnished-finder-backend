const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");
const Review = require("./review");

const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
    },
    propertyType: {
      type: DataTypes.STRING,
    },
    propertyDescription: {
      type: DataTypes.STRING,
    },
    features: {
      type: DataTypes.JSON,
    },
    availablity: {
        type: DataTypes.STRING,
    },
    contactId: {
      type: DataTypes.INTEGER,
    },
    reviewId: {
      type: DataTypes.INTEGER,
    },
    loggedInUserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Property",
    updatedAt: false,
  }
);

(async () => {
  await Property.sync({ force: false });
})();

Property.belongsTo(User, { foreignKey: "loggedInUserId" });
Property.belongsTo(Review, { foreignKey: "reviewId" });

module.exports = Property;
