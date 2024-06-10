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

export default function indexRoutes(fastify, options, done) {
  fastify.get("/", indexRoute);
  done();
}