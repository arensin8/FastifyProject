import Fastify from "fastify";
import productRoutes from "./routes/product.routes.js";
import indexRoutes from "./routes/index.routes.js";

//for using require module
import { createRequire } from "module";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
const require = createRequire(import.meta.url);

const fastify = Fastify({
  logger: true,
});

const PORT = 5000;
fastify.register(fastifySwagger);
fastify.register(fastifySwaggerUi, {
  prefix: "swagger",
  exposeRoute: true,
  seagger: {
    info: {
      title: "Fastify Swagger",
    },
    schemes: ["http"],
  },
});

fastify.register(indexRoutes);
fastify.register(productRoutes);

const main = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

main();
