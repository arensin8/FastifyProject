// user.route.js
import {
  changeProfileHandler,
  getProfileHandler,
} from "../handler/user.handler.js";
import { getUserMiddleware } from "../utils/getUser.js";

const userDetailsSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    address: { type: "string" },
    latitude: { type: "string" },
    longitude: { type: "string" },
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
    details: userDetailsSchema,
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
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
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
      200: {
        type: "object",
        properties: {
          statusCode: { type: "integer" },
          user: userSchema,
        },
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
