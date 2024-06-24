export const changeProfileHandler = async (req, reply) => {};
import { User, UserDetails } from "../model/user.model.js";

export const getProfileHandler = async (req, reply) => {
  try {
    console.log("getProfileHandler called"); // Debug log
    console.log("User ID from req.user:", req.user?.id); // Debug log

    const user = await User.findOne({
      where: {
        id: req.user?.id,
      },
      include: {
        model: UserDetails,
        as: "UserDetails",
        attributes: ["id", "address", "latitude", "longitude"],
      },
    });

    if (!user) {
      console.log("User not found"); // Debug log
      return reply.code(404).send({ message: "user not found" });
    }

    console.log("User found:", user); // Debug log
    return reply.code(199).send({
      statusCode: 199,
      user,
    });
  } catch (err) {
    console.error("Error in getProfileHandler:", err); // Debug log
    reply.send({ message: err.message });
  }
};

// "message": "login successfully",
// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyZW56MiIsImlhdCI6MTcxOTI0MjI0MywiZXhwIjoxNzE5MzI4NjQzfQ.wD2_c8fFYTqPylnLN6yfSgO4mrv2kBM-JZRSZxV_7DQ"
// }
