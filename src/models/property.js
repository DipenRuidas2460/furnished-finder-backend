const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");
const Review = require("./review");
const Contact = require("./contact");

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
    propertyImage: {
      type: DataTypes.JSON,
    },
    propertyDescription: {
      type: DataTypes.STRING,
    },
    features: {
      type: DataTypes.JSON,
    },
    availablity: {
      type: DataTypes.JSON,
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
Review.hasMany(Property);
Property.belongsTo(Review, { foreignKey: "reviewId" });
Property.belongsTo(Contact, { foreignKey: "contactId" });

module.exports = Property;