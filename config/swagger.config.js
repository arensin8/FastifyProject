
const PORT = 5001;

export const fastifySwaggerConfig = {
  swagger: {
    info: {
      title: "Fastify Swagger",
      description: "Swagger documentation for my app",
      version: "0.1.0",
    },
    tags: [{ name: "Products", description: "Write for admin, read for user" }],
    host: `http://localhost${PORT}`,
    schemes: ["http"],
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "authorization",
        in: "header",
      },
    },
    //config authorization for all routes
    security: [{ apiKey: [] }],
  },
};

export const fastifySwaggerUiConfig = {
  routePrefix: "/swagger",
  swagger: {
    info: {
      title: "Fastify Swagger",
    },
  },
  exposeRoute: true,
};
