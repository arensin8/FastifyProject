import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

Category.sync({ alter: true }).then(() => {
  console.log("Category sync completed");
});
