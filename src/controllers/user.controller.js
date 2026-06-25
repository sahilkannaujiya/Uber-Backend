import User from "../models/user.models.js";
import createUser from "../services/user.services.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistToken.models.js";

// REGISTER =================
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { fullname, email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  // IMPORTANT: password is raw (schema should hash it via pre-save hook)
  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password,
  });

  const token = user.generateAuthToken();

  const safeUser = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
  };

  return res.status(201).json({ token, user: safeUser });
};

// LOGIN =================
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  const safeUser = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
  };

  return res.status(200).json({ token, user,safeUser });
};

// PROFILE =================
const getUserProfile = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

//  LOGOUT =================
const logoutUser = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token found" });
  }

  await BlacklistToken.create({ token });

  res.clearCookie("token");

  return res.status(200).json({
    message: "Logged out successfully",
  });
};

export { registerUser, loginUser, getUserProfile, logoutUser };
