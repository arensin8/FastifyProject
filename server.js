import Fastify from "fastify";
import productRoutes from "./routes/product.routes.js";
import indexRoutes from "./routes/index.routes.js";
import fastifyCors from "@fastify/cors";

// For using require module
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Import Swagger and Swagger UI plugins
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const fastify = Fastify({
  logger: true,
});

const PORT = 5001;

// Register CORS
fastify.register(fastifyCors, {
  origin: "*",
});

// Register Swagger
fastify.register(fastifySwagger, {
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
});

// Register Swagger UI
fastify.register(fastifySwaggerUi, {
  routePrefix: "/swagger",
  swagger: {
    info: {
      title: "Fastify Swagger",
    },
  },
  exposeRoute: true,
});

// Register routes
fastify.register(indexRoutes);
fastify.register(productRoutes);

// Test route to ensure server is working
fastify.get("/test", async (request, reply) => {
  return { hello: "world" };
});

// Start the server
const main = async () => {
  try {
    await fastify.listen({ port: PORT });
    fastify.swagger(); // Ensure Swagger documentation is generated
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

main();
