import { validationResult } from "express-validator";
import { createRide, getFare } from "../services/ride.services.js";
import {getCaptainInRadius, getAddressCoordinate} from "../services/maps.services.js"
import { query } from "express-validator";
import { sendMessageToSocketId } from "../socket.js";

const userRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType
    });

    
    const pickupCoordinate = await getAddressCoordinate(pickup);
    const nearbyCaptains = await getCaptainInRadius(
      pickupCoordinate.lat,
      pickupCoordinate.lng,
       3// radius in kilometers
    );

    ride.otp = "";
    nearbyCaptains.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ride
      })
    })

    return res.status(201).json(ride);
    
  } catch (error) {
     console.error(error);

    if (!res.headersSent) {
        return res.status(500).json({
            message: error.message
        });
    }
  }
};

const totalFare = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const {pickup, destination} = req.query;
  try {
    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare)
    
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export { userRide, totalFare };