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
    security: [
      {
        apiKey: [],
      },
    ],
    summary: "Get one product by id",
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Id for the product",
        },
      },
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
    security: [
      {
        apiKey: [],
      },
    ],
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
  //Its for adding authorization for product routes
  fastify.addHook("onRequest", (request) => request.jwtVerify());
  fastify.get("/products", getProductItems);
  fastify.get("/products/:id", getOneProductItem);
  done();
}
