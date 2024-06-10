import { Sequelize } from "sequelize";

//fisrt method for connecting to db
// export const sequelize = new Sequelize(
//   "postgres://postgres:arensin2002@localhost:5433/fastify"
// );

//second method for connecting to db
export const sequelize = new Sequelize("fastify", "postgres", "arensin2002", {
  host: "localhost",
  port: 5433,
  dialect: "postgres",
});

const DBconnection = async () => {
  await sequelize.authenticate();
  console.log("Connected to postgres!");
};

DBconnection();
