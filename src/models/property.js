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
    unit: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    propertyType: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    bathType: {
      type: DataTypes.STRING,
    },
    entranceType: {
      type: DataTypes.STRING,
    },
    propertyImage: {
      type: DataTypes.JSON,
    },
    propertyDescription: {
      type: DataTypes.STRING,
    },
    squreFootage: {
      type: DataTypes.STRING,
    },
    bedRooms: {
      type: DataTypes.STRING,
    },
    bathRooms: {
      type: DataTypes.STRING,
    },
    isFurnished:{
      type: DataTypes.BOOLEAN,
    },
    features: {
      type: DataTypes.JSON,
    },
    accommodations: {
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
Review.hasMany(Property);
Property.belongsTo(Review, { foreignKey: "reviewId" });
Review.hasMany(Contact);
Property.belongsTo(Contact, { foreignKey: "contactId" });

module.exports = Property;