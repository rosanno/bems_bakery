import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

export const userAuth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const accessToken = authHeader.split(" ")[1];

    const decoded = jwt.verify(accessToken, secretKey);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid access token" });
  }
};

export const adminAuth = (req, res, next) => {
  try {
    userAuth(req, res, () => {
      if (!req.user.isAdmin) {
        return res.status(403).json({ error: "Forbidden - Admin access required" });
      }

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid access token" });
  }
};
