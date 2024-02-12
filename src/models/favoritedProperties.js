const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const FavoritedProperties = sequelize.define(
  "FavoritedProperties",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    myCities: {
      type: DataTypes.JSON,
    },
    hobbies: {
      type: DataTypes.JSON,
    },
    myLandlords: {
      type: DataTypes.JSON,
    },
    myAssignments: {
        type: DataTypes.JSON,
    },
    loggedInUserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "FavoritedProperties",
    updatedAt: false,
  }
);

(async () => {
  await FavoritedProperties.sync({ force: false });
})();

FavoritedProperties.belongsTo(User, { foreignKey: "loggedInUserId" });

module.exports = FavoritedProperties;