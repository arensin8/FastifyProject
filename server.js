import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  fastifySwaggerConfig,
  fastifySwaggerUiConfig,
} from "./config/swagger.config.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import indexRoutes from "./routes/index.routes.js";
import "./config/sequelize.config.js"; // Ensure the Sequelize connection is established
import fastifyBcrypt from "fastify-bcrypt";

export const fastify = Fastify({
  logger: true,
});

const PORT = 5001;

// Register CORS
fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.register(fastifyBcrypt, {
  saltWorkFactor: 12,
});

// Register Swagger
fastify.register(fastifySwagger, fastifySwaggerConfig);
fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig);

// Register Routes
fastify.register(indexRoutes);
fastify.register(productRoutes);
fastify.register(authRoutes, { prefix: "auth" });

fastify.get("/test", async (request, reply) => {
  return { hello: "world" };
});

const main = async () => {
  try {
    await fastify.listen(PORT);
    console.log(`Server running at: http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
