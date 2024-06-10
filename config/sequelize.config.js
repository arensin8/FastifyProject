import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://postgres:arensin2002@localhost:5433/fastify"
);

const DBconnection = async () => {
  await sequelize.authenticate();
  console.log("Connected to postgres!");
};

DBconnection();
