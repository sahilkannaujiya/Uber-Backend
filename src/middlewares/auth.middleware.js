import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import BlacklistToken from "../models/blacklistToken.models.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const isBlacklisted = await BlacklistToken.findOne({token});
  if(isBlacklisted){
    return res.status(401).json({message: "Token is blacklisted"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

export { authMiddleware, authorizeRole };