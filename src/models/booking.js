const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    moveIn: {
      type: DataTypes.STRING,
    },
    moveOut: {
      type: DataTypes.STRING,
    },
    numberOfPeopleStay: {
      type: DataTypes.STRING,
    },
    bestWayToContact: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    reasonForTravelling: {
      type: DataTypes.STRING,
    },
    withPet: {
      type: DataTypes.BOOLEAN,
    },
    moreDetails: {
      type: DataTypes.STRING,
    },
    loggedInUserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Booking",
    updatedAt: false,
  }
);

(async () => {
  await Booking.sync({ force: false });
})();

Booking.belongsTo(User, { foreignKey: "loggedInUserId" });

module.exports = Booking;
