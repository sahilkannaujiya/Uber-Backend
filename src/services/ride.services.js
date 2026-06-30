import Ride from "../models/ride.model.js";
import { getDistanceTime } from "./maps.services.js";
import crypto from 'crypto'

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }
  console.log("Pickup:", pickup);
  console.log("Destination:", destination);
  const { distance, duration } = await getDistanceTime(pickup, destination);

  const distanceInKm = distance / 1000;
  const durationInMinutes = duration / 60;

  return {
    motorcycle: Math.round(25 + distanceInKm * 8 + durationInMinutes * 1),
    auto: Math.round(40 + distanceInKm * 12 + durationInMinutes * 2),
    car: Math.round(80 + distanceInKm * 18 + durationInMinutes * 3),
    bicycle: Math.round(15 + distanceInKm * 5 + durationInMinutes * 0.5),
  };
};

const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const createRide = async ({user, pickup, destination, vehicleType} ) => {
  if(!user || !pickup || !destination || !vehicleType){
    throw new Error("All fields are required")
  }
  
  const fare = await getFare(pickup, destination);
  const ride = await Ride.create({
    user,
    pickup,
    destination,
    otp: generateOtp(),
    fare: fare[vehicleType]
  })

  return ride;
}

export {getFare, createRide}