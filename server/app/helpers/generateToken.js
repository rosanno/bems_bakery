import jwt from "jsonwebtoken";

export const generateToken = (user, expire) => {
  const token = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: expire,
  });

  return token;
};
