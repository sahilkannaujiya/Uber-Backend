import express from "express";
import { Router } from "express";
import {body} from "express-validator"
import { userRide } from "../controllers/ride.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/create', authMiddleware,
  body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address'),
  body('destination').isString().isLength({min: 3}).withMessage('Invalid destination added'),
  body('vehicleType').isIn(["car", "motorcycle", "bicycle", "auto-rickshaw"]).withMessage('Invalid vehicleType added'), userRide
)

export {router}