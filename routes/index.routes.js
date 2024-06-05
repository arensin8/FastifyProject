export default function indexRoutes(fastify, oprions, done) {
  fastify.get("/", (req, reply) => {
    reply.send({
      message: "Hello world",
    });
  });
  done();
}
