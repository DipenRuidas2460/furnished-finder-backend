const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./user");

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    loggedInUserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Contact",
    updatedAt: false,
  }
);

(async () => {
  await Contact.sync({ force: false });
})();

Contact.belongsTo(User, { foreignKey: "loggedInUserId" });

module.exports = Contact;