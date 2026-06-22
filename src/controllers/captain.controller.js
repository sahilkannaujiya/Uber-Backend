import { createCaptain } from "../services/captain.services.js";
import captain from "../models/captain.models.js";
import { validationResult } from "express-validator";


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
    vehicleType: vehicle.vehicleType
  });

  const token = await newCaptain.generateAuthToken();
  res.status(201).json({ message: "Captain registered successfully", token });
}

export { registerCaptain }