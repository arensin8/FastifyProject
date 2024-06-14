import { fastify } from "./../server.js";
import { User } from "../model/user.model.js";

export const registerHandler = async (req, reply) => {
  const { username, password, first_name, last_name } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user) return reply.send("username is already exist");
  const newUser = await User.create({
    first_name,
    last_name,
    username,
    password,
  });
  await newUser.save();
  reply.send(newUser);
};
