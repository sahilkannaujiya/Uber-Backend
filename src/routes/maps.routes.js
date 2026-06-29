import express from "express";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {getDistance, getCoordinates, getSuggetions } from "../controllers/map.controller.js";
import { query } from "express-validator";

const router = Router();

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware,
  getCoordinates
);

router.get("/get-distance",
  query("origin").isString().isLength({min: 3}),
  query("destination").isString().isLength({min: 3}),
  authMiddleware, getDistance
);

router.get('/get-suggestions', 
  query("input").isString().isLength({ min: 3 }),
  authMiddleware, getSuggetions
)



export { router };
