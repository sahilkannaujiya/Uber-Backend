import Captain from "../models/captain.models.js";
import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklistToken.models.js";

const authCaptain = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await Captain.findById(decoded.id);

    if (!captain) {
      return res.status(401).json({ message: "Captain not found" });
    }

    req.captain = captain;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { authCaptain };