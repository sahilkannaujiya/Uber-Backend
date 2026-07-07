import captain from "../models/captain.models.js";
import { createCaptain } from "../services/captain.services.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistToken.models.js";

// REGISTER CAPTAIN =================
const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  

  const { email, fullname, password, vehicle } = req.body;

  const isCaptainExist = await captain.findOne({ email });

  if (isCaptainExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  // IMPORTANT: password is raw (handled by schema pre-save hook)
  const newCaptain = await createCaptain({
  firstname: fullname.firstname,
  lastname: fullname.lastname,
  email,
  password,
  color: vehicle.color,
  plate: vehicle.plate,
  capacity: vehicle.capacity,
  vehicleType: vehicle.vehicleType,
});

  const token = newCaptain.generateAuthToken();

  const safeCaptain = {
    _id: newCaptain._id,
    fullname: newCaptain.fullname,
    email: newCaptain.email,
    vehicle: newCaptain.vehicle,
    status: newCaptain.status,
  };

  return res.status(201).json({
    message: "Captain registered successfully",
    token,
    captain: safeCaptain,
  });
};

//LOGIN CAPTAIN =================
const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captainData = await captain.findOne({ email }).select("+password");

  if (!captainData) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captainData.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captainData.generateAuthToken();

  const safeCaptain = {
    _id: captainData._id,
    fullname: captainData.fullname,
    email: captainData.email,
    vehicle: captainData.vehicle,
    status: captainData.status,
    role: captainData.role,
  };

  return res.status(200).json({
    token,
    captain: safeCaptain,
  });
};

//PROFILE =================
const getCaptainProfile = async (req, res) => {
  return res.status(200).json({
    captain: req.captain,
  });
};

// LOGOUT =================
const logoutCaptain = async (req, res) => {
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

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
