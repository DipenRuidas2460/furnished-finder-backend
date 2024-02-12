const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const MySearches = sequelize.define(
  "MySearches",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
    },
    budget: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bathroom: {
      type: DataTypes.STRING,
    },
    bedroom: {
      type: DataTypes.STRING,
    },
    propertyType: {
      type: DataTypes.STRING,
    },
    petAllowed: {
      type: DataTypes.BOOLEAN,
    },
    loggedInUserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "MySearches",
    updatedAt: false,
  }
);

(async () => {
  await MySearches.sync({ force: false });
})();

MySearches.belongsTo(User, { foreignKey: "loggedInUserId" });

module.exports = MySearches;