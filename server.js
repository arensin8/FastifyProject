import Fastify from "fastify";
import productRoutes from "./routes/product.routes.js";
import indexRoutes from "./routes/index.routes.js";
import fastifyCors from "@fastify/cors"; // Note: Use @fastify/cors instead of fastify-cors

// For using require module
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import "./config/sequelize.config.js";

// Import Swagger and Swagger UI plugins
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  fastifySwaggerConfig,
  fastifySwaggerUiConfig,
} from "./config/swagger.config.js";
import authRoutes from "./routes/auth.routes.js";

const fastify = Fastify({
  logger: true,
});

const PORT = 5001;

// Register CORS
fastify.register(fastifyCors, {
  origin: "*", // Adjust this according to your security requirements
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify the methods you need
});

fastify.register(fastifySwagger, fastifySwaggerConfig);
fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig);
fastify.register(indexRoutes);
fastify.register(productRoutes);
fastify.register(authRoutes, {
  prefix: "auth",
});

fastify.get("/test", async (request, reply) => {
  return { hello: "world" };
});

const main = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log(`Server running at: http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit the process with a failure code
  }
};

main();
