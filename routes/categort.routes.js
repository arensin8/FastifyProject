import { getUserMiddleware } from "../utils/getUser.js";

const addCategoryRoute = {
  schema: {
    tags: ["category"],
    security: [{ apiKey: [] }],
    summary: "Add category ",
    body: {
      type: "object",
      properties: {
        name: {
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
  // handler: changeProfileHandler,
  // preHandler: [getUserMiddleware],
};

const updateCategoryRoute = {
  schema: {
    tags: ["category"],
    summary: "Update category",
    security: [{ apiKey: [] }],
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
    body: {
      type: "object",
      properties: {
        name: {
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
  // handler: getProfileHandler,
  // preHandler: [getUserMiddleware],
};

const getAllCategoriesRoute = {
  schema: {
    tags: ["category"],
    summary: "Get all categories",
    security: [{ apiKey: [] }],
    response: {
      201: {
        type: "object",
      },
    },
  },
  // handler: getProfileHandler,
  // preHandler: [getUserMiddleware],
};

const getOneCategoryRoute = {
  schema: {
    tags: ["category"],
    summary: "Get one category",
    security: [{ apiKey: [] }],
    params: {
      type: "object",
      properties: {
        id: {
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
  // handler: getProfileHandler,
  // preHandler: [getUserMiddleware],
};

const removeCategoryRoute = {
  schema: {
    tags: ["category"],
    summary: "Remove category",
    security: [{ apiKey: [] }],
    params: {
      type: "object",
      properties: {
        id: {
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
  // handler: getProfileHandler,
  // preHandler: [getUserMiddleware],
};

export default function categoryRoutes(fastify, options, done) {
  fastify.post("/add", addCategoryRoute);
  fastify.patch("/update/:id", updateCategoryRoute);
  fastify.get("/all", getAllCategoriesRoute);
  fastify.get("/:id", getOneCategoryRoute);
  fastify.delete("/remove/:id", removeCategoryRoute);
  done();
}
