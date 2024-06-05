const products = {
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

export const getOneProductItem = {
  schema: {
    response: {
      200: products,
    },
  },
};

export const getProductItems = {
  schema: {
    response: {
      200: {
        type: "array",
        items: products,
      },
    },
  },
  handler : (req, reply) => {
    reply.send(products);
  }
};
