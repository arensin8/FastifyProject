import { productsList } from "../product.js";

export const getOneProductHandler = (req, reply) => {
  const { id } = req.params;
  const product = productsList.find((p) => p.id == id);
  if (!product) reply.code(404).send("not found!");
  reply.send(product);
};

export const gerAllProductsHandler = (req, reply) => {
  reply.send(productsList);
};
