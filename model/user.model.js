// user.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  birthday: {
    type: DataTypes.DATE,
  },
  accessToken: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
});

export const UserDetails = sequelize.define("UserDetails", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.STRING,
  },
  longitude: {
    type: DataTypes.STRING,
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

// Define associations with alias
User.hasOne(UserDetails, { as: "details", foreignKey: "UserId" });
UserDetails.belongsTo(User, { as: "user", foreignKey: "UserId" });

User.sync({ alter: true }).then(() => {
  console.log("User Sync completed");
});
UserDetails.sync({ alter: true }).then(() => {
  console.log("UserDetails Sync completed");
});
