import express from 'express';
import { Router } from 'express';
import {body} from "express-validator";
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from '../controllers/captain.controller.js';
import { authMiddleware, authorizeRole } from '../middlewares/auth.middleware.js';
import { authCaptain } from '../middlewares/captain.auth.js';


const router = Router();
router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 charecters long'),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 charecters long'),
  body('vehicle.color').isLength({min: 3}).withMessage('Vehicle color must be at least 3 charecters long'),
  body('vehicle.plate').isLength({min: 3}).withMessage('Vehicle plate must be at least 3 charecters long'),
  body('vehicle.capacity').isInt({min: 1}).withMessage('Vehicle capacity must be at least 1'),
  body('vehicle.vehicleType').isIn(["car", "motorcycle", "bicycle", "auto-rickshaw"]).withMessage('Invalid vehicle type')
], registerCaptain);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 charecters long')
], loginCaptain);

router.get('/profile', authCaptain, getCaptainProfile);

router.get('/logout', authCaptain, logoutCaptain);
export {
  router
}