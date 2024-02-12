const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const UserDetails = sequelize.define(
  "UserDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    nationalId: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.STRING,
    },
    profession: {
      type: DataTypes.STRING,
    },
    photoTypeId: {
      type: DataTypes.STRING,
    },
    photoId: {
      type: DataTypes.STRING,
    },
    photoFront: {
      type: DataTypes.STRING,
    },
    photoBack: {
      type: DataTypes.STRING,
    },
    photoGuest: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    passportNo: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
    },
    bookingNo: {
      type: DataTypes.STRING,
    },
    visaNo: {
      type: DataTypes.STRING,
    },
    purpose: {
      type: DataTypes.STRING,
    },
    loggedInUserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "UserDetails",
  }
);

(async () => {
  await UserDetails.sync({ force: false });
})();

UserDetails.belongsTo(User, { foreignKey: "loggedInUserId" });

module.exports = UserDetails;