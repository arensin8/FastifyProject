import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

//User table
export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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

//userDetails table
export const UserDetails = sequelize.define("UserDetails", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  address: {
    type: DataTypes.STRING,
  },
  latitudes: {
    type: DataTypes.DOUBLE,
  },
  longitudes: {
    type: DataTypes.DOUBLE,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
});

User.hasOne(UserDetails);
UserDetails.belongsTo(User);

// For managing that , when we change sth in db it updates automaticlly
// User.sync({ alter: true }).then(() => {
//   console.log("user sync completed");
// });
// UserDetails.sync({ alter: true }).then(() => {
//   console.log("userDetails sync completed");
// });
