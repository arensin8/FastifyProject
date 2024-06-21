import { productsList } from "../product.js";

export const getOneProductHandler = (req, reply) => {
  const { id } = req.params;
  const product = productsList.find((p) => p.id == id);
  if (!product) {
    return reply.code(404).send({ statusCode: 404, message: "Not found!" });
  }
  reply.send({ product, user: req.user });
};

export const gerAllProductsHandler = (req, reply) => {
  reply.send({ products: productsList, user: req.user });
};
