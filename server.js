import { products } from "./product.js";

import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

const PORT = 5000;

fastify.get("/", (req, reply) => {
  reply.send({
    message: "Hello world",
  });
});

fastify.get("/products", (req, reply) => {
  reply.send(products);
});

fastify.get("/products/:id", (req, reply) => {
  const { id } = req.params;
  const product = products.find((p) => p.id == id);
  if (!product) reply.code(404).send("not found!");
  reply.send(product);
});

const main = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

main();
