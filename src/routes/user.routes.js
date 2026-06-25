import express from "express";
import { Router } from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../controllers/user.controller.js";
import {
  authMiddleware,
  authorizeRole,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 charecters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 charecters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 charecters long"),
  ],
  loginUser
);

router.get("/profile", authMiddleware, authorizeRole("user"), getUserProfile);

router.get("/logout", authMiddleware, authorizeRole("user"), logoutUser);

export { router };
