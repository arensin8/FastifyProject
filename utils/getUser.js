import { User } from "../model/user.model.js";
import { fastify } from "../server.js";

export const getUserMiddleware = async (req, reply) => {
  const authorization = req?.headers?.authorization;
  if (!authorization) {
    return reply
      .code(401)
      .send({ statusCode: 401, message: "You need to login" });
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer && bearer.toLowerCase() === "bearer") {
    try {
      const result = fastify.jwt.verify(token);
      if (typeof result === "string") {
        return reply.code(400).send({ statusCode: 400, message: result });
      }

      const { username } = result;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return reply
          .code(401)
          .send({ statusCode: 401, message: "User doesn't exist" });
      }

      req.user = user;
    } catch (err) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: "Your token is not valid" });
    }
  } else {
    return reply
      .code(401)
      .send({ statusCode: 401, message: "Your token is not valid" });
  }
};
