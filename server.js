import Fastify from "fastify";
import productRoutes from "./routes/product.routes.js";
import indexRoutes from "./routes/index.routes.js";
import fastifyCors from "@fastify/cors";

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

const fastify = Fastify({
  logger: true,
});

const PORT = 5001;

// Register CORS
fastify.register(fastifyCors, {
  origin: "*",
});

fastify.register(fastifySwagger, fastifySwaggerConfig);
fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig);
fastify.register(indexRoutes);
fastify.register(productRoutes);

fastify.get("/test", async (request, reply) => {
  return { hello: "world" };
});

const main = async () => {
  fastify.listen({ port: PORT }, (err) => {
    if (err) console.log(err);
    console.log(`Server run on port: ${fastify.server.address().port}`);
  });
};

main();
