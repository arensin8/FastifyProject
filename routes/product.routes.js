import {
  gerAllProductsHandler,
  getOneProductHandler,
} from "../handler/product.handler.js";

const product = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
    name: {
      type: "string",
    },
  },
};

const getOneProductItem = {
  schema: {
    tags: ["Products"],
    params : {
      type : 'object',
      properties : {
        id : {
          type : 'string',
          description : 'Id for the product'
        }
      }
    },
    response: {
      200: product,
    },
  },
  handler: getOneProductHandler,
};

const getProductItems = {
  schema: {
    tags: ["Products"],
    response: {
      200: {
        type: "array",
        items: product,
      },
    },
  },
  handler: gerAllProductsHandler,
};

export default function productRoutes(fastify, options, done) {
  fastify.get("/products", getProductItems);
  fastify.get("/products/:id", getOneProductItem);
  done();
}
