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
import "./config/sequelize.config.js";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyJwt from "@fastify/jwt";
import cors from "cors";
import fastifyMiddie from "@fastify/middie";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";

export const fastify = Fastify({
  logger: true,
});

const PORT = 5001;

const main = async () => {
  try {
    // Register CORS
    fastify.register(fastifyCors, {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    });

    fastify.register(fastifyBcrypt, {
      saltWorkFactor: 12,
    });

    fastify.register(fastifyJwt, {
      secret: "dshsjnehsdyfyvrjnsuicgwuryte",
    });

    //for using middlewares in fastify
    await fastify.register(fastifyMiddie);

    // Register Swagger
    fastify.register(fastifySwagger, fastifySwaggerConfig);
    fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig);
    fastify.use(cors());
    fastify.use((req, res, next) => {
      console.log("Hello middleware in fastify");
      next();
    });
    // Register Routes
    fastify.register(indexRoutes);
    fastify.register(authRoutes, { prefix: "auth" });
    fastify.register(userRoutes, { prefix: "users" });
    fastify.register(categoryRoutes, { prefix: "category" });
    fastify.register(productRoutes, { prefix: "products" });

    fastify.get("/test", async (request, reply) => {
      return { hello: "world" };
    });

    await fastify.listen(PORT);
    console.log(`Server running at: http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
