import {
  gerAllProductsHandler,
  getOneProductHandler,
} from "../handler/product.handler.js";
import {
  changeProfileHandler,
  getProfileHandler,
} from "../handler/user.handler.js";
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

const changeProfileRoute = {
  schema: {
    tags: ["user"],
    security: [
      {
        apiKey: [],
      },
    ],
    summary: "Change user profile",
    body: {
      type: "object",
      properties: {
        address: {
          type: "string",
        },
        latitude: {
          type: "string",
        },
        longitude: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    response: {
      200: {
        type: "object",
      },
    },
  },
  handler: changeProfileHandler,
  preHandler: [getUserMiddleware],
};

const getProfileRoute = {
  schema: {
    tags: ["user"],
    summary: "Get user Profile",
    security: [
      {
        apiKey: [],
      },
    ],
    response: {
      199: {
        type: "object",
      },
    },
  },
  handler: getProfileHandler,
  preHandler: [getUserMiddleware],
};

export default function userRoutes(fastify, options, done) {
  fastify.patch("/change", changeProfileRoute);
  fastify.get("/get", getProfileRoute);
  done();
}
