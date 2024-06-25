// user.handler.js
import { User, UserDetails } from "../model/user.model.js";

export const changeProfileHandler = async (req, reply) => {
  const body = { ...req.body };
  const userDetails = await UserDetails.findOne({
    where: {
      UserId: req.user.id,
    },
  });
  if (userDetails) {
    for (const key in body) {
      if (body[key]) {
        userDetails.setDataValue(key, body[key]);
      }
    }
  } else {
    Object.assign(body, { UserId: req.user.id });
    const newUserDetails = await UserDetails.create(body);
    await newUserDetails.save();
  }
  return reply.code(200).send({
    statusCode: 200,
    message: "User updated successfully",
  });
};

export const getProfileHandler = async (req, reply) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user?.id,
      },
      include: [
        {
          model: UserDetails,
          as: "details", //alias name
          attributes: ["id", "address", "latitude", "longitude"],
        },
      ],
    });

    if (!user) {
      return reply.code(404).send({ message: "user not found" });
    }
    return reply.code(200).send({
      statusCode: 200,
      user,
    });
  } catch (err) {
    console.error("Error in getProfileHandler:", err); // Debug log
    reply.send({ message: err.message });
  }
};

// {
//   "message": "login successfully",
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyZW56MiIsImlhdCI6MTcxOTMwNzgwMiwiZXhwIjoxNzE5Mzk0MjAyfQ.LXuAdPseZ7W1toKKxJnYVSyy1KFnuCr50Dv5CM2TJsw"
// }
