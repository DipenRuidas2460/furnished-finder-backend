const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const UserType = sequelize.define(
  "UserType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userRole: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "UserType",
    updatedAt: false,
  }
);

(async () => {
  await UserType.sync({ force: false });
})();

module.exports = UserType;