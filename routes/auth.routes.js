import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";

export default function authRoutes(fastify, options, done) {
  fastify.post(
    "/register",
    {
      schema: {
        tags: ["Authentication"],
        summary: "Register account",
        body: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
            first_name: {
              type: "string",
            },
            last_name: {
              type: "string",
            },
          },
          required: ["username", "password", "first_name", "last_name"],
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              username: { type: "string" },
              first_name: { type: "string" },
              last_name: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { username, password, first_name, last_name } = req.body;

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          first_name,
          last_name,
          username,
          password: hashedPassword,
        });

        console.log(newUser);
        reply.code(201).send({
          id: newUser.id,
          username: newUser.username,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
        });
      } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
          reply.code(400).send({ error: 'Username already exists' });
        } else {
          reply.code(500).send({ error: 'Internal Server Error' });
        }
      }
    }
  );
  done();
}
