import {
  gerAllProductsHandler,
  getOneProductHandler,
} from "../handler/product.handler.js";
import { getUserMiddleware } from "../utils/getUser.js";

const productSchema = {
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

const userSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    username: { type: "string" },
    accessToken: { type: "string" },
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
      200: {
        type: "object",
        properties: {
          product: productSchema,
          user: userSchema,
        },
      },
    },
  },
  handler: getOneProductHandler,
  preHandler: [getUserMiddleware],
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
        type: "object",
        properties: {
          products: {
            type: "array",
            items: productSchema,
          },
          user: userSchema,
        },
      },
    },
  },
  handler: gerAllProductsHandler,
  preHandler: [getUserMiddleware],
};

export default function productRoutes(fastify, options, done) {
  fastify.get("/products", getProductItems);
  fastify.get("/products/:id", getOneProductItem);
  done();
}
