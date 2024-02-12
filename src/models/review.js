const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");
const Property = require("./property");

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    propertyId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    isStay:{
      type:DataTypes.BOOLEAN,
    },
    details: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,  
    },
    stayDates: {
        type: DataTypes.STRING,
    },
    ratings: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Review",
    updatedAt: false,
  }
);

(async () => {
  await Review.sync({ force: false });
})();

Review.belongsTo(User, { foreignKey: "userId" } )
Review.belongsTo(Property, { foreignKey: "propertyId" } )

module.exports = Review;
