import { createCaptain } from "../services/captain.services.js";
import captain from "../models/captain.models.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistToken.models.js";

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
  const hashedPassword = await captain.hashPassword(password);
  const newCaptain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = await newCaptain.generateAuthToken();
  res.status(201).json({ message: "Captain registered successfully", token });
};

const loginCaptain = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const captainData = await captain.findOne({ email });
  if (!captainData) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await captainData.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = await captainData.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain: captainData });
};

const getCaptainProfile = async (req, res) => {
  const captain = req.captain;
  res.status(200).json({ captain });
};

const logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlacklistToken.create({ token });

  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
