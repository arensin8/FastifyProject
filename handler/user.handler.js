// user.handler.js
import { User, UserDetails } from "../model/user.model.js";

export const changeProfileHandler = async (req, reply) => {
  const { address, latitude, longitude } = req.body;

  try {
    // Update UserDetails table
    const userDetails = await UserDetails.findOne({
      where: { UserId: req.user.id },
    });

    if (userDetails) {
      await UserDetails.update(
        { address, latitude, longitude },
        {
          where: { UserId: req.user.id },
        }
      );
    } else {
      await UserDetails.create({
        address,
        latitude,
        longitude,
        UserId: req.user.id,
      });
    }
    return reply.code(200).send({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error in changeProfileHandler:", err);
    return reply.code(500).send({ message: err.message });
  }
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
