import { getAddressCoordinate, getAutoCompleteSuggestion, getDistanceTime } from "../services/maps.services.js";
import { validationResult } from "express-validator";
import axios from "axios";

const getCoordinates = async (req, res, next) => {
  
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

  const {address} = req.query;

  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);

  } catch (error) {
    console.log(error);
    console.log(error.res?.data);
    
    
    res.status(404).json({message: 'Address not found '});
  }
};

const getDistance = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {origin, destination} = req.query;
    try{
    const distanceTime = await getDistanceTime(origin, destination);
    res.status(200).json(distanceTime)
    
  } catch (error) {
    res.status(500).json({message: 'Internal server error'})
  }
}

const getSuggetions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {input} = req.query;
    const suggestions = await getAutoCompleteSuggestion(input);
    res.status(200).json(suggestions)
    
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  
  }
}



export{getCoordinates, getDistance, getSuggetions}