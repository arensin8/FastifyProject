import { products } from "./product.js";

import Fastify from "fastify";
import { getOneProductItem, getProductItems } from "./schemas.js";

const fastify = Fastify({
  logger: true,
});

const PORT = 5000;

fastify.get("/", (req, reply) => {
  reply.send({
    message: "Hello world",
  });
});

fastify.get("/products", getProductItems);

fastify.get("/products/:id", getOneProductItem, (req, reply) => {
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
