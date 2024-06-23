export const changeProfileHandler = async (req, reply) => {};

export const getProfileHandler = async (req, reply) => {
  try {
    const user = req.user;
    if (!user) return reply.code(404).send({ message: "user not found" });
    return reply.code(200).send({
      statusCode: 200,
      user,
    });
  } catch (err) {
    reply.send({ message: err.message });
  }
};
