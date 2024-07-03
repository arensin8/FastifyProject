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
  parentId: {
    type: DataTypes.INTEGER,
  },
});

Category.hasMany(Category, { as: "children", foreignKey: "parentId" });
Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });

Category.sync({ alter: true }).then(() => {
  console.log("Category sync completed");
});
