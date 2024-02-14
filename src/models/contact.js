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
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    otherContact: {
      type: DataTypes.JSON,
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