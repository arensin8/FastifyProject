const indexRoute = {
  schema: {
    tags: ["Home"],
    response: {
      200: {
        type: "object",
        properties: {
          header: {
            type: "object",
            properties: {
              authorization: { type: "string" },
            },
          },
          message: { type: "string" },
        },
      },
    },
  },
  handler: (req, reply) => {
    reply.send({
      header: req.headers,
      message: "Hello fastify",
    });
  },
};

const middleware1 = (req, res, next) => {
  console.log("Hello from middleware1");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("Hello from middleware2");
  next();
};

export default function indexRoutes(fastify, options, done) {
  fastify.get("/", {
    schema: indexRoute.schema,
    preHandler: [middleware1, middleware2],
    handler: indexRoute.handler,
  });
  done();
}
