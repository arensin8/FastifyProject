import { fastify } from "./../server.js";
import { User } from "../model/user.model.js";

export const registerHandler = async (req, reply) => {
  try {
    const { username, password, first_name, last_name } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user) return reply.send("username is already exist");

    const hashedPassword = await fastify.bcrypt.hash(password);

    const newUser = await User.create({
      first_name,
      last_name,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    reply.send(newUser);
  } catch (error) {
    console.log(error.message);
  }
};

export const loginHandler = async (req, reply) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return reply.code(404).send({ message: "User not found" });
  const comapreResult = await fastify.bcrypt.compare(password, user.password);
  if (comapreResult) {
    reply.code(200).send({
      message: "login successfully",
      user,
    });
  } else {
    reply.code(401).send({
      message: "username or password is incorrect",
    });
  }
};
