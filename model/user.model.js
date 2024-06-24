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
  latitudes: {
    type: DataTypes.STRING,
  },
  longitudes: {
    type: DataTypes.STRING,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
});
User.hasOne(UserDetails);
UserDetails.belongsTo(User);

// User.sync({ alter: true }).then(() => {
//   console.log("User Sync completed");
// });
// UserDetails.sync({ alter: true }).then(() => {
//   console.log("UserDetail Sync completed");
// });

// For managing that , when we change sth in db it updates automaticlly
// User.sync({ alter: true }).then(() => {
//   console.log("user sync completed");
// });
// UserDetails.sync({ alter: true }).then(() => {
//   console.log("userDetails sync completed");
// });
